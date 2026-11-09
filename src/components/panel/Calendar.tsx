import {
  addDays,
  addMonths,
  format,
  getISOWeek,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek
} from "date-fns";

// Plasma digital clock popup: big date + month grid with week numbers
export default function Calendar({ now }: { now: Date }) {
  const [month, setMonth] = useState(startOfMonth(now));

  const gridStart = startOfWeek(month, { weekStartsOn: 1 });
  const weeks = Array.from({ length: 6 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => addDays(gridStart, w * 7 + d))
  );

  return (
    <div className="w-80">
      <div className="px-1 pb-3 border-b border-white/8">
        <div className="text-2xl font-bold">{format(now, "EEEE")}</div>
        <div className="text-sm text-kali-muted">{format(now, "d MMMM yyyy")}</div>
      </div>

      <div className="hstack justify-between pt-3 pb-2">
        <span className="font-bold text-sm">{format(month, "MMMM yyyy")}</span>
        <div className="hstack gap-1">
          <button
            type="button"
            className="tray-icon-btn"
            aria-label="Previous month"
            onClick={() => setMonth(addMonths(month, -1))}
          >
            <span className="i-mdi:chevron-left text-lg" />
          </button>
          <button
            type="button"
            className="h-7 px-2 rounded text-xs hover:bg-white/8"
            onClick={() => setMonth(startOfMonth(now))}
          >
            Today
          </button>
          <button
            type="button"
            className="tray-icon-btn"
            aria-label="Next month"
            onClick={() => setMonth(addMonths(month, 1))}
          >
            <span className="i-mdi:chevron-right text-lg" />
          </button>
        </div>
      </div>

      <table className="w-full text-center text-xs tabular-nums">
        <thead>
          <tr className="text-kali-muted">
            <th className="w-7 font-normal opacity-60">#</th>
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
              <th key={d} className="h-7 font-normal">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={week[0].toISOString()}>
              <td className="text-kali-muted opacity-60">{getISOWeek(week[0])}</td>
              {week.map((day) => (
                <td key={day.toISOString()} className="p-0.5">
                  <span
                    className={`flex-center size-8 mx-auto rounded-full ${
                      isSameDay(day, now)
                        ? "bg-kali-blue text-white font-bold"
                        : isSameMonth(day, month)
                          ? "text-kali-text"
                          : "text-kali-muted/50"
                    }`}
                  >
                    {format(day, "d")}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
