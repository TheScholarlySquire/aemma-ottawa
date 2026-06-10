import Stripe from "https://esm.sh/stripe@14?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const {
      name,
      email,
      hasExperience,
      experienceDetails,
      hearAboutUs,
      startDate,
      endDate,
      language,
    } = await req.json();

    const siteUrl = Deno.env.get("SITE_URL")!;

    // Create the Stripe Checkout Session
    // To update the price in future: create a new Price in Stripe dashboard
    // and update the STRIPE_PRICE_ID environment variable — no code changes needed
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: Deno.env.get("STRIPE_PRICE_ID")!,
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      // session_id is passed back so the success page can display a confirmation
      success_url: `${siteUrl}/#/signup-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#/`,
      metadata: { name, language, startDate, endDate },
    });

    // Insert a pending signup row immediately so drop-offs are tracked
    const { error: dbError } = await supabase.from("signups").insert({
      name,
      email,
      has_experience: hasExperience,
      experience_details: hasExperience ? experienceDetails : null,
      hear_about_us: hearAboutUs || null,
      cohort_start_date: startDate,
      cohort_end_date: endDate,
      language,
      payment_status: "pending",
      stripe_session_id: session.id,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      // Don't block the redirect if DB write fails — log and continue
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
