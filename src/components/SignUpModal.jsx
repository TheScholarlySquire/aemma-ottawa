import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog } from "@headlessui/react";
import { X, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function SignUpModal({
  isOpen,
  onClose,
  selectedCourseIndex,
  startDate,
  endDate,
}) {
  const { t, i18n } = useTranslation("classes");
  const locale = i18n.language === "fr" ? "fr-CA" : "en-CA";

  const courses = t("courseList", { returnObjects: true });
  const modals = t("modal", { returnObjects: true });

  const selectedCourse =
    selectedCourseIndex != null ? courses[selectedCourseIndex] : null;
  const modalTitle =
    selectedCourse?.modalTitle || t("courseList.modalTitle", "Class sign-up");

  const hearAboutUsOptions = t("modal.hearAboutUsOptions", {
    returnObjects: true,
    defaultValue: [],
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hasExperience: false,
    experienceDetails: "",
    hearAboutUs: "",
  });

  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      hasExperience: false,
      experienceDetails: "",
      hearAboutUs: "",
    });
    setStatus("idle");
    setErrorMessage("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      // Call the Edge Function — it creates the Stripe session and inserts
      // a pending signup row in Supabase before returning the redirect URL
      const { data, error } = await supabase.functions.invoke(
        "create-checkout-session",
        {
          body: {
            name: formData.name,
            email: formData.email,
            hasExperience: formData.hasExperience,
            experienceDetails: formData.hasExperience
              ? formData.experienceDetails
              : null,
            hearAboutUs: formData.hearAboutUs || null,
            startDate,
            endDate,
            language: i18n.language,
          },
        },
      );

      if (error || !data?.url) {
        throw new Error(error?.message || "No checkout URL returned");
      }

      // Hand off to Stripe's hosted checkout page
      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      setErrorMessage(
        modals.errorMessage || "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  };

  const formattedStartDate = startDate
    ? new Date(startDate + "T00:00:00").toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const formattedEndDate = endDate
    ? new Date(endDate + "T00:00:00").toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const formattedDateRange =
    formattedStartDate && formattedEndDate
      ? `${formattedStartDate} & ${formattedEndDate}`
      : (formattedStartDate ?? null);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition transition-discrete duration-300"
          aria-hidden="true"
          onClick={handleClose}
        />

        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-auto z-50 p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-bold">
              {modalTitle}
            </Dialog.Title>
            <button onClick={handleClose} aria-label="Close">
              <X className="w-5 h-5 text-gray-500 hover:text-gray-700 hover:cursor-pointer" />
            </button>
          </div>

          {/* Cohort date range display */}
          {formattedDateRange && (
            <p className="text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded px-3 py-2 mb-4">
              {modals.cohortDateLabel || "Cohort dates:"}{" "}
              <strong>{formattedDateRange}</strong>
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">{modals.nameTitle}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={status === "loading"}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block font-medium">{modals.emailTitle}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status === "loading"}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">
                {modals.textTitle}
              </label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="hasExperience"
                    value="yes"
                    checked={formData.hasExperience === true}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, hasExperience: true }))
                    }
                    disabled={status === "loading"}
                  />
                  <span className="ml-2">{modals.textYes}</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="hasExperience"
                    value="no"
                    checked={formData.hasExperience === false}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        hasExperience: false,
                        experienceDetails: "",
                      }))
                    }
                    disabled={status === "loading"}
                  />
                  <span className="ml-2">{modals.textNo}</span>
                </label>
              </div>
            </div>

            {formData.hasExperience && (
              <div>
                <label className="block font-medium">{modals.textField}</label>
                <textarea
                  name="experienceDetails"
                  value={formData.experienceDetails}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 disabled:opacity-50"
                  rows={3}
                />
              </div>
            )}

            <div>
              <label className="block font-medium mb-1">
                {modals.hearAboutUsTitle}
                <span className="ml-1 text-sm font-normal text-gray-400">
                  ({modals.optionalLabel || t("modal.optionalLabel")})
                </span>
              </label>
              <select
                name="hearAboutUs"
                value={formData.hearAboutUs}
                onChange={handleChange}
                disabled={status === "loading"}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 bg-white disabled:opacity-50"
              >
                <option value="">
                  {modals.hearAboutUsOptionsPlaceholder ||
                    t("modal.optionSelect")}
                </option>
                {Array.isArray(hearAboutUsOptions) &&
                  hearAboutUsOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Remind the user a payment step is coming */}
            <p className="text-xs text-gray-400 text-center">
              {modals.paymentNotice || t("modal.stripeRedirect")}
            </p>

            <div className="text-right">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                {modals.submitBtn}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
