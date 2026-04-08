import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameDay,
  isToday,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const monthImages = [
  "https://images.unsplash.com/photo-1511497584788-876760111969",
  "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef",
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0",
  "https://images.unsplash.com/photo-1512389142860-9c449e58a543",
];

export default function CalendarSheet() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [direction, setDirection] = useState(1);
  const [notes, setNotes] = useState("");

  const monthIndex = currentMonth.getMonth();
  const heroImage = monthImages[monthIndex];

  const firstDay = startOfMonth(currentMonth);
  const lastDay = endOfMonth(currentMonth);

  const days = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  });

  const emptySlots = (firstDay.getDay() + 6) % 7;

  const totalCells = emptySlots + days.length;

  // force 6 full rows every month = stable height
  const fillerCells = 42 - totalCells;

  const handleDateClick = (day) => {
    if (!startDate || endDate) {
      setStartDate(day);
      setEndDate(null);
    } else {
      if (day < startDate) {
        setEndDate(startDate);
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    }
  };

  const isInRange = (day) => {
    if (!startDate || !endDate) return false;
    return day >= startDate && day <= endDate;
  };

  const isStart = (day) =>
    startDate && isSameDay(day, startDate);

  const isEnd = (day) =>
    endDate && isSameDay(day, endDate);

  return (
    <div className="relative w-full max-w-lg bg-white shadow-2xl rounded-xl overflow-hidden">
      {/* Hanging pin */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20">
        <div className="w-3 h-3 bg-gray-600 rounded-full" />
      </div>

      {/* Spiral */}
      <div className="h-6 flex items-center justify-center border-b">
        <div className="w-full h-1 border-t-2 border-dashed border-gray-500" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={format(currentMonth, "yyyy-MM")}
          initial={{
            opacity: 0,
            x: direction > 0 ? 40 : -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: direction > 0 ? -40 : 40,
          }}
          transition={{
            duration: 0.35,
            ease: "easeInOut",
          }}
        >
          {/* Hero image */}
          <div className="relative h-72">
            <img
              src={heroImage}
              className="w-full h-full object-cover"
              alt={format(currentMonth, "MMMM")}
            />

            {/* Navigation */}
            <button
              onClick={() => {
                setDirection(-1);
                setCurrentMonth(subMonths(currentMonth, 1));
              }}
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-lg hover:bg-sky-600 transition"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => {
                setDirection(1);
                setCurrentMonth(addMonths(currentMonth, 1));
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-lg hover:bg-sky-600 transition"
            >
              <ChevronRight size={20} />
            </button>

            {/* Blue shapes */}
            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[140px] border-l-sky-500 border-t-[100px] border-t-transparent" />
            <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[160px] border-r-sky-500 border-t-[110px] border-t-transparent" />

            <div className="absolute bottom-8 right-6 text-right text-white">
                <p
                    className="text-lg font-semibold"
                    style={{
                    WebkitTextStroke: "0.6px rgba(255,255,255,0.9)",
                    textShadow: "0 2px 8px rgba(0,0,0,0.35)",
                    }}
                >
                    {format(currentMonth, "yyyy")}
                </p>

                <h2
                    className="text-4xl font-bold tracking-wide"
                    style={{
                    WebkitTextStroke: "1px rgba(255,255,255,0.95)",
                    textShadow: "0 3px 12px rgba(0,0,0,0.4)",
                    }}
                >
                    {format(currentMonth, "MMMM").toUpperCase()}
                </h2>
                </div>
          </div>

          {/* Fixed-height bottom section */}
          <div className="grid grid-cols-2 p-6 gap-8 min-h-[360px]">
            {/* Notes */}
            <div>
              <h3 className="text-sm font-semibold mb-4 text-gray-600">
                Notes
              </h3>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-48 resize-none outline-none text-sm border-none"
                placeholder="Write notes..."
              />
            </div>

            {/* Calendar */}
            <div>
              <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-blue-500 mb-3">
                {weekDays.map((day) => (
                  <div key={day} className="text-center">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {/* leading blanks */}
                {Array.from({ length: emptySlots }).map((_, index) => (
                  <div key={`empty-${index}`} />
                ))}

                {/* dates */}
                {days.map((day) => (
                  <button
                    key={day.toString()}
                    onClick={() => handleDateClick(day)}
                    className={`
                      text-sm h-10 w-10 rounded-full font-semibold
                      transition-all duration-300
                      flex items-center justify-center
                      ${
                        isStart(day) || isEnd(day)
                          ? "bg-sky-600 text-white shadow-md"
                          : isInRange(day)
                          ? "bg-sky-300 text-white"
                          : isToday(day)
                          ? "border-2 border-sky-500 text-sky-600"
                          : "hover:bg-gray-100"
                      }
                    `}
                  >
                    {format(day, "d")}
                  </button>
                ))}

                {/* trailing blanks to keep 6 rows */}
                {Array.from({ length: fillerCells }).map((_, index) => (
                  <div key={`filler-${index}`} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}