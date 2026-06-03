import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function SignupSuccess() {
  const { t } = useTranslation("classes");
  const modals = t("modal", { returnObjects: true });

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 py-16">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-2xl font-bold text-white mb-2">
        {modals.successTitle || "You're signed up!"}
      </h1>
      <p className="text-gray-200 mb-6 max-w-md">
        {modals.successMessage ||
          "Your payment was received and your spot is confirmed. We'll be in touch with details soon."}
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        {modals.backHomeBtn || "Back to home"}
      </Link>
    </div>
  );
}
