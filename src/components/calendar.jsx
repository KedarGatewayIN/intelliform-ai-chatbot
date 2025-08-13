import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <>
      <style>{`
        .calendar-container {
          padding: 0.75rem;
        }
        .calendar-months {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .calendar-months {
            flex-direction: row;
            gap: 1rem;
          }
        }
        .calendar-month {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .calendar-caption {
          display: flex;
          justify-content: center;
          padding-top: 0.25rem;
          position: relative;
          align-items: center;
        }
        .calendar-caption-label {
          font-size: 0.875rem;
          font-weight: 500;
        }
        .calendar-nav {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .calendar-nav-button {
          height: 1.75rem;
          width: 1.75rem;
          padding: 0;
          border-radius: 0.375rem;
          background-color: transparent;
          border: 1px solid rgb(209, 213, 219);
          opacity: 0.5;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.15s, background-color 0.15s;
        }
        .calendar-nav-button:hover {
          opacity: 1;
          background-color: rgb(243, 244, 246);
        }
        .calendar-nav-button-previous {
          position: absolute;
          left: 0.25rem;
        }
        .calendar-nav-button-next {
          position: absolute;
          right: 0.25rem;
        }
        .calendar-table {
          width: 100%;
          border-collapse: collapse;
        }
        .calendar-head-row {
          display: flex;
        }
        .calendar-head-cell {
          width: 2.25rem;
          text-align: center;
          border-radius: 0.375rem;
          font-size: 0.8rem;
          color: rgb(107, 114, 128);
          font-weight: normal;
        }
        .calendar-row {
          display: flex;
          width: 100%;
          margin-top: 0.5rem;
        }
        .calendar-cell {
          height: 2.25rem;
          width: 2.25rem;
          text-align: center;
          font-size: 0.875rem;
          padding: 0;
          position: relative;
        }
        .calendar-day {
          height: 2.25rem;
          width: 2.25rem;
          padding: 0;
          border-radius: 0.375rem;
          background-color: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          color: black;
          cursor: pointer;
        }
        .calendar-day:hover {
          background-color: rgb(243, 244, 246);
        }
        .calendar-day-selected {
          background-color: rgb(59, 130, 246);
          color: white;
        }
        .calendar-day-today {
          background-color: rgb(243, 244, 246);
          color: black;
        }
        .calendar-day-disabled {
          color: rgb(156, 163, 175);
          opacity: 0.5;
        }
        .calendar-day-outside {
          color: rgb(156, 163, 175);
        }
      `}</style>

      <DayPicker
        showOutsideDays={showOutsideDays}
        className={`calendar-container ${className || ""}`}
        classNames={{
          months: "calendar-months",
          month: "calendar-month",
          caption: "calendar-caption",
          caption_label: "calendar-caption-label",
          nav: "calendar-nav",
          nav_button: "calendar-nav-button",
          nav_button_previous: "calendar-nav-button-previous",
          nav_button_next: "calendar-nav-button-next",
          table: "calendar-table",
          head_row: "calendar-head-row",
          head_cell: "calendar-head-cell",
          row: "calendar-row",
          cell: "calendar-cell",
          day: "calendar-day",
          day_selected: "calendar-day calendar-day-selected",
          day_today: "calendar-day calendar-day-today",
          day_disabled: "calendar-day calendar-day-disabled",
          day_outside: "calendar-day calendar-day-outside",
          ...classNames,
        }}
        components={{
          IconLeft: (props) => <ChevronLeft className="h-4 w-4" {...props} />,
          IconRight: (props) => <ChevronRight className="h-4 w-4" {...props} />,
        }}
        {...props}
      />
    </>
  );
}
