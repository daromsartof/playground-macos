import React from "react";
import { user } from "~/configs";
import { launcherCategories, searchLauncher, type LauncherItem } from "~/utils/launcher";

interface PowerAction {
  label: string;
  icon: string;
  run: (e: React.MouseEvent) => void;
}

interface KickoffProps {
  runItem: (item: LauncherItem) => void;
  close: () => void;
  power: PowerAction[];
}

// Plasma "Kickoff" application launcher
export default function Kickoff({ runItem, close, power }: KickoffProps) {
  const [category, setCategory] = useState(launcherCategories[0].id);
  const [query, setQuery] = useState("");

  const searching = query.trim() !== "";
  const current = launcherCategories.find((c) => c.id === category)!;
  const items = searching ? searchLauncher(query) : current.items;

  const launch = (item: LauncherItem) => {
    runItem(item);
    close();
  };

  return (
    <div
      className="fixed left-1 bottom-[52px] z-40 w-[640px] max-w-[calc(100vw-8px)] h-[520px] max-h-[calc(100vh-64px)] flex flex-col rounded-lg overflow-hidden bg-kali-card/95 border border-white/10 shadow-2xl shadow-black/60 backdrop-blur-xl text-kali-text font-kali animate-[kickoff-in_120ms_ease-out]"
      role="dialog"
      aria-label="Application launcher"
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
        if (e.key === "Enter" && items[0]) launch(items[0]);
      }}
    >
      {/* Header: user + search */}
      <div className="hstack gap-3 px-3 h-14 border-b border-white/8 bg-black/15">
        <img className="size-9 rounded-full object-cover" src={user.avatar} alt="" />
        <div className="leading-tight mr-auto min-w-0">
          <div className="text-sm font-bold truncate">{user.name}</div>
          <div className="text-[11px] font-kali-mono text-kali-muted">
            {user.username}@{user.hostname}
          </div>
        </div>
        <label className="hstack gap-2 h-8 w-64 max-w-[50%] px-2.5 rounded-md bg-kali-field border border-kali-line focus-within:border-kali-blue">
          <span className="i-mdi:magnify text-kali-muted" />
          <input
            className="flex-1 min-w-0 bg-transparent text-sm no-outline placeholder-kali-muted"
            placeholder="Search…"
            value={query}
            autoFocus
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Categories */}
        {!searching && (
          <ul className="w-52 shrink-0 py-2 overflow-y-auto border-r border-white/8">
            {launcherCategories.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  className={`w-full hstack gap-2.5 px-3 h-9 text-sm text-left ${
                    c.id === category ? "bg-kali-blue/25 text-white" : "hover:bg-white/6"
                  }`}
                  onMouseEnter={() => setCategory(c.id)}
                  onClick={() => setCategory(c.id)}
                >
                  <span className={`${c.icon} text-lg text-kali-muted`} />
                  {c.title}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Items */}
        <div className="flex-1 min-w-0 overflow-y-auto py-2">
          <div className="px-4 pb-1 text-xs text-kali-muted">
            {searching ? `Results for “${query.trim()}”` : current.title}
          </div>
          {items.length === 0 && (
            <div className="px-4 py-6 text-sm text-kali-muted">No results</div>
          )}
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="w-full hstack gap-3 px-4 h-12 text-left hover:bg-white/6 focus-visible:bg-kali-blue/25 no-outline"
                  onClick={() => launch(item)}
                >
                  <LauncherIcon item={item} size="size-8" />
                  <span className="min-w-0">
                    <span className="block text-sm truncate">{item.title}</span>
                    <span className="block text-xs text-kali-muted truncate">
                      {item.subtitle}
                    </span>
                  </span>
                  {item.kind === "link" && (
                    <span className="i-mdi:open-in-new ml-auto text-sm text-kali-muted" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer: power actions */}
      <div className="hstack justify-end gap-1 px-2 h-11 border-t border-white/8 bg-black/15">
        {power.map((action) => (
          <button
            key={action.label}
            type="button"
            className="hstack gap-1.5 h-8 px-2.5 rounded-md text-[13px] hover:bg-white/8"
            onClick={(e) => {
              close();
              action.run(e);
            }}
          >
            <span className={`${action.icon} text-base`} />
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
