import React from "react";
import { searchLauncher, type LauncherItem } from "~/utils/launcher";

interface KRunnerProps {
  close: () => void;
  runItem: (item: LauncherItem) => void;
}

// KRunner: the Alt+Space search bar that drops from the top of the screen
export default function KRunner({ close, runItem }: KRunnerProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  const results = searchLauncher(query);

  useClickOutside(boxRef, close);

  const launch = (item: LauncherItem) => {
    runItem(item);
    close();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected(Math.min(selected + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected(Math.max(selected - 1, 0));
    } else if (e.key === "Enter" && results[selected]) launch(results[selected]);
  };

  return (
    <div
      ref={boxRef}
      className="fixed z-50 top-0 left-1/2 -translate-x-1/2 w-[600px] max-w-full rounded-b-lg overflow-hidden bg-kali-card/95 border border-t-0 border-white/10 shadow-2xl shadow-black/60 backdrop-blur-xl font-kali text-kali-text animate-[krunner-in_150ms_ease-out]"
      role="dialog"
      aria-label="KRunner"
      onKeyDown={onKeyDown}
    >
      <div className="hstack gap-3 h-12 px-4">
        <span className="i-mdi:magnify text-xl text-kali-muted" />
        <input
          className="flex-1 min-w-0 bg-transparent no-outline text-base placeholder-kali-muted"
          placeholder="Search apps, projects, links…"
          value={query}
          autoFocus
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="krunner-results"
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(0);
          }}
        />
        <button
          type="button"
          className="tray-icon-btn"
          aria-label="Close"
          onClick={close}
        >
          <span className="i-mdi:close" />
        </button>
      </div>

      {query.trim() !== "" && (
        <ul
          id="krunner-results"
          role="listbox"
          className="max-h-96 overflow-y-auto border-t border-white/8 py-1"
        >
          {results.length === 0 && (
            <li className="px-4 py-4 text-sm text-kali-muted">No results</li>
          )}
          {results.map((item, index) => (
            <li key={item.id} role="option" aria-selected={index === selected}>
              <button
                type="button"
                className={`w-full hstack gap-3 px-4 h-12 text-left ${
                  index === selected ? "bg-kali-blue/30" : "hover:bg-white/6"
                }`}
                onMouseEnter={() => setSelected(index)}
                onClick={() => launch(item)}
              >
                <LauncherIcon item={item} size="size-7" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm truncate">{item.title}</span>
                  <span className="block text-xs text-kali-muted truncate">
                    {item.subtitle}
                  </span>
                </span>
                <span className="text-[11px] text-kali-muted">
                  {item.kind === "app" ? "Application" : "Link"}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
