import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { formatToGoogleDate } from "../utils/calendar";

function generateGoogleCalendarURL({
  name,
  datetime,
  endDatetime,
  location,
  description,
}) {
  const start = formatToGoogleDate(datetime);
  const end = formatToGoogleDate(
    endDatetime ?? new Date(new Date(datetime).getTime() + 60 * 60 * 1000)
  );
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    name
  )}&dates=${start}/${end}&location=${encodeURIComponent(
    location
  )}&details=${encodeURIComponent(description)}`;
}

function generateICS({ name, datetime, endDatetime, location, description }) {
  const start = new Date(datetime);
  const end = endDatetime
    ? new Date(endDatetime)
    : new Date(start.getTime() + 60 * 60 * 1000);
  const dtStamp = new Date().toISOString().replace(/[-:]|\.\d{3}/g, "");
  const uid = `${Date.now()}@aemma-ottawa`;

  const formatDate = (date) => date.toISOString().replace(/[-:]|\.\d{3}/g, "");

  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AEMMA Ottawa//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${formatDate(start)}`,
    `DTEND:${formatDate(end)}`,
    `SUMMARY:${name}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "TRANSP:OPAQUE",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return icsLines.join("\r\n");
}

function downloadICSFile(event) {
  const icsContent = generateICS(event);
  const filename = `${event.name.replace(/\s+/g, "_")}.ics`;
  const dataUri = `data:text/calendar;charset=utf-8,${encodeURIComponent(
    icsContent
  )}`;

  const a = document.createElement("a");
  a.href = dataUri;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Forward the ref to the actual DOM element inside the component
const EventCard = forwardRef(
  ({ event, isUpcoming, highlight = false }, ref) => {
    const { t, i18n } = useTranslation("events");
    const { name, datetime, endDatetime, location, description } = event;

    const locale = i18n.language === "fr" ? "fr-CA" : "en-CA";

    function formatDateRange(datetime, endDatetime, locale) {
      const start = new Date(datetime);

      if (!endDatetime) {
        // Original behaviour — single point in time
        return start.toLocaleString(locale, {
          dateStyle: "medium",
          timeStyle: "short",
        });
      }

      const end = new Date(endDatetime);
      const sameDay = start.toDateString() === end.toDateString();

      if (sameDay) {
        // e.g. "Jun 13, 2026, 11:00 AM – 3:00 PM"
        const datePart = start.toLocaleDateString(locale, {
          dateStyle: "medium",
        });
        const startTime = start.toLocaleTimeString(locale, {
          timeStyle: "short",
        });
        const endTime = end.toLocaleTimeString(locale, { timeStyle: "short" });
        return `${datePart}, ${startTime} – ${endTime}`;
      } else {
        // e.g. "Jun 3 – Jun 29, 2026"
        const startStr = start.toLocaleDateString(locale, {
          month: "short",
          day: "numeric",
        });
        const endStr = end.toLocaleDateString(locale, {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        return `${startStr} – ${endStr}`;
      }
    }

    const localDatetime = formatDateRange(datetime, endDatetime, locale);

    return (
      <div
        ref={ref}
        className={`p-4 my-2 my-5 rounded shadow ${
          highlight ? "bg-yellow-100 border-l-4 border-yellow-500" : "bg-white"
        }`}
      >
        <h3
          className={`text-2xl ${
            highlight ? "text-yellow-800" : "text-gray-900"
          }`}
        >
          {name}
        </h3>
        <p className="text-sm text-gray-600">{localDatetime}</p>
        <p className="text-gray-700">{location}</p>
        {Array.isArray(description) ? (
          description.map((para, index) => (
            <p key={index} className="mb-2 whitespace-pre-line">
              {para}
            </p>
          ))
        ) : (
          <p className="whitespace-pre-line">{description}</p>
        )}

        {isUpcoming && (
          <div className="mt-4 space-x-2">
            <a
              href={generateGoogleCalendarURL({
                name,
                datetime,
                endDatetime,
                location,
                description,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="gc-btn text-sm text-blue-600 underline"
            >
              {t("googleCalendar")}
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                downloadICSFile({
                  name,
                  datetime,
                  endDatetime,
                  location,
                  description,
                });
              }}
              className="ics-btn text-sm text-blue-600 underline"
            >
              ICS
            </a>
          </div>
        )}
      </div>
    );
  }
);

export default EventCard;
