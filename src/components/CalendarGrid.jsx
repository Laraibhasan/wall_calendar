import { format, eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";

export default function CalendarGrid() {
  const firstDay = startOfMonth(new Date());
  const lastDay = endOfMonth(new Date());

  const days = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  });

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        April 2026
      </h1>

      <p className="text-gray-500 mb-8">Plan beautifully</p>

      <div className="grid grid-cols-7 gap-3">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
          <div
            key={day}
            className="text-sm font-semibold text-gray-400 text-center"
          >
            {day}
          </div>
        ))}

        {days.map((day) => (
          <button
            key={day.toString()}
            className="h-14 rounded-xl bg-gray-100 hover:bg-gray-900 hover:text-white transition-all duration-300 font-semibold"
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    </div>
  );
}