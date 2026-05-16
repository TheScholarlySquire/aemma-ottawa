import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { differenceInCalendarDays } from "date-fns";
import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import AboutSection from "../components/AboutSection";
import ImageCarousel from "../components/ImageCarousel";
import InfoCards from "../components/InfoCards";
import SignUpModal from "../components/SignUpModal";
import EventBanner from "../components/EventBanner";
import EmbeddedMap from "../components/EmbeddedMap";
import { intakeConfig } from "../config/intakeConfig";

import "../styles/home.css";

export default function Home() {
  const { t: tHome, i18n } = useTranslation("home");
  const { t: tEvents } = useTranslation("events");
  const { t: tClasses } = useTranslation("classes");

  const intakeCourse = tClasses("courseList", { returnObjects: true })[0];
  const allEvents = tEvents("eventList", { returnObjects: true }) || [];
  const [modalOpen, setModalOpen] = useState(false);

  const hasRelevantEvents = allEvents.some((event) => {
    const eventDate = new Date(event.datetime);
    const today = new Date();
    const diffInDays = differenceInCalendarDays(eventDate, today);
    return diffInDays >= 0 && diffInDays <= 3;
  });

  // ── Date range formatting ──────────────────────────────────────────────────
  const locale = i18n.language === "fr" ? "fr-CA" : "en-CA";

  const start = new Date(intakeConfig.startDate + "T00:00:00");
  const end = new Date(intakeConfig.endDate + "T00:00:00");

  const sameMonthAndYear =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth();

  let formattedDateRange;
  if (locale === "fr-CA") {
    if (sameMonthAndYear) {
      const day1 = start.getDate();
      const day2 = end.getDate();
      const month = end.toLocaleDateString(locale, { month: "long" });
      const year = end.getFullYear();
      formattedDateRange = `${day1} & ${day2} ${month} ${year}`;
    } else {
      const startStr = start.toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
      });
      const endStr = end.toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      formattedDateRange = `${startStr} & ${endStr}`;
    }
  } else {
    if (sameMonthAndYear) {
      const month = start.toLocaleDateString(locale, { month: "long" });
      const day1 = start.getDate();
      const day2 = end.getDate();
      const year = end.getFullYear();
      formattedDateRange = `${month} ${day1} & ${day2}, ${year}`;
    } else {
      const startStr = start.toLocaleDateString(locale, {
        month: "long",
        day: "numeric",
      });
      const endStr = end.toLocaleDateString(locale, {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      formattedDateRange = `${startStr} & ${endStr}`;
    }
  }
  // ── End date range formatting ──────────────────────────────────────────────

  return (
    <div id="homeContainer">
      <HeroBanner />
      {hasRelevantEvents && <EventBanner events={allEvents} />}
      <AboutSection />
      <div id="intakeInfo">
        <section id="intakeBanner" className="relative w-full">
          <img
            src="./img/group3.jpg"
            className="absolute inset-0 w-full h-full object-cover object-top"
            alt=""
          />

          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

          <div className="relative z-20 flex flex-col items-center justify-center w-full text-center text-white px-6 py-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              {tHome("classSections.intakeHeader")}
            </h1>
            <h3 className="text-base sm:text-lg md:text-xl mb-4 w-full sm:w-[85%] md:w-[75%]">
              <Trans
                i18nKey="classSections.intakeSubHeader"
                ns="home"
                components={{
                  3: (
                    <a
                      href="#/classes"
                      className="text-blue-200 underline hover:text-blue-100 hover:cursor-pointer transition duration-300 ease-in-out"
                    />
                  ),
                }}
              />
            </h3>
            <button
              onClick={() => setModalOpen(true)}
              className="siteBtn inline-block px-6 py-2 rounded hover:bg-blue-800 transition hover:cursor-pointer"
            >
              {intakeCourse.signupBtn}
            </button>
            <p className="text-base md:text-lg mt-4">
              {tHome("classSections.nextIntake")} {formattedDateRange}
            </p>
          </div>
        </section>

        <SignUpModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          selectedCourseIndex={0}
          startDate={intakeConfig.startDate}
          endDate={intakeConfig.endDate}
        />

        <InfoCards />
        <div className="bottomChevron"></div>
      </div>
      <EmbeddedMap />
    </div>
  );
}
