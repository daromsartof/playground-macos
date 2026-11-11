import React from "react";
import { format } from "date-fns";
import { wallpapers, user } from "~/configs";
import type { MacActions } from "~/types";

interface PowerMenuProps {
  actions: MacActions;
}

const PowerMenu = ({ actions }: PowerMenuProps) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapRef, () => setOpen(false));

  const items = [
    { label: "Suspend", icon: "i-mdi:power-sleep", run: actions.sleepMac },
    { label: "Restart", icon: "i-mdi:restart", run: actions.restartMac },
    { label: "Shut Down", icon: "i-mdi:power", run: actions.shutMac }
  ];

  return (
    <div
      ref={wrapRef}
      className="relative"
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
    >
      <button
        type="button"
        className="hstack h-6 px-1.5 rounded hover:bg-white/10 aria-expanded:bg-white/10"
        aria-label="Power options"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className="i-mdi:power text-base" />
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute right-0 top-7 w-44 py-1 rounded-md bg-kali-panel/95 border border-kali-line shadow-xl shadow-black/50 backdrop-blur-md"
        >
          {items.map((item) => (
            <li key={item.label} role="none">
              <button
                type="button"
                role="menuitem"
                className="w-full hstack gap-2.5 px-3 py-1.5 text-left hover:bg-kali-blue hover:text-white"
                onClick={(e) => item.run(e)}
              >
                <span className={`${item.icon} text-base`} />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function Login(props: MacActions) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [now, setNow] = useState(new Date());
  const dark = useStore((state) => state.dark);

  useInterval(() => setNow(new Date()), 1000);

  const loginHandle = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.password === "" || user.password === password) {
      // no password set, or password correct
      props.setLogin(true);
    } else {
      setError("Incorrect password, please try again");
      setPassword("");
    }
  };

  return (
    <div
      className="login size-full relative overflow-hidden font-kali text-kali-text select-none"
      style={{
        background: `url(${
          dark ? wallpapers.night : wallpapers.day
        }) center/cover no-repeat`
      }}
    >
      {/* Tint to give the wallpaper Kali's dark-blue mood */}
      <div className="absolute inset-0 bg-gradient-to-b from-kali-base/50 via-kali-base/20 to-kali-base/70" />

      {/* Top panel (LightDM greeter style) */}
      <header className="absolute top-0 inset-x-0 z-10 h-8 px-3 hstack justify-between text-[13px] bg-kali-panel/85 border-b border-white/5 backdrop-blur-md">
        <div className="hstack gap-2">
          <span className="i-simple-icons:kalilinux text-lg text-kali-blue" />
          <span className="font-bold">{user.hostname}</span>
        </div>

        <time
          className="absolute left-1/2 -translate-x-1/2 font-bold tabular-nums"
          dateTime={now.toISOString()}
        >
          {format(now, "EEE d MMM, HH:mm")}
        </time>

        <div className="hstack gap-1">
          <span
            className="hstack gap-1 h-6 px-1.5 text-kali-muted"
            title="Keyboard layout"
          >
            <span className="i-mdi:keyboard-outline text-base" />
            en
          </span>
          <span className="hstack h-6 px-1.5 text-kali-muted" title="Accessibility">
            <span className="i-mdi:human text-base" />
          </span>
          <PowerMenu actions={props} />
        </div>
      </header>

      {/* Login box */}
      <main className="absolute inset-0 flex-center px-4">
        <form
          onSubmit={loginHandle}
          className="w-full max-w-[360px] px-8 pt-8 pb-6 rounded-lg bg-kali-card/90 border border-white/10 shadow-2xl shadow-black/60 backdrop-blur-xl"
        >
          <div className="vstack text-center">
            <span className="i-simple-icons:kalilinux size-20 text-kali-blue" />
            <h1 className="mt-3 text-xl font-bold">{user.name}</h1>
            <p className="mt-0.5 font-kali-mono text-xs text-kali-muted">
              {user.username}@{user.hostname}
            </p>
          </div>

          <label
            htmlFor="login-username"
            className="block mt-6 mb-1.5 text-xs text-kali-muted"
          >
            Username
          </label>
          <div className="hstack gap-2.5 h-10 px-3 rounded-md bg-kali-field border border-kali-line">
            <img className="size-5 rounded-full object-cover" src={user.avatar} alt="" />
            <input
              id="login-username"
              className="flex-1 min-w-0 bg-transparent text-sm no-outline"
              value={user.username}
              readOnly
            />
          </div>

          <label
            htmlFor="login-password"
            className="block mt-4 mb-1.5 text-xs text-kali-muted"
          >
            Password
          </label>
          <div
            className={`hstack gap-2.5 h-10 pl-3 pr-1.5 rounded-md bg-kali-field border transition-colors focus-within:border-kali-blue focus-within:ring-2 focus-within:ring-kali-blue/30 ${
              error ? "border-red-500/70" : "border-kali-line"
            }`}
          >
            <span className="i-mdi:lock-outline text-lg text-kali-muted" />
            <input
              id="login-password"
              className="flex-1 min-w-0 bg-transparent text-sm no-outline"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoFocus
              autoComplete="current-password"
              value={password}
              aria-invalid={error !== ""}
              aria-describedby="login-hint"
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <button
              type="button"
              className="flex-center size-7 rounded text-kali-muted hover:text-kali-text hover:bg-white/5"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
            >
              <span
                className={`${
                  showPassword ? "i-mdi:eye-off-outline" : "i-mdi:eye-outline"
                } text-base`}
              />
            </button>
          </div>

          <button
            type="submit"
            className="w-full h-10 mt-6 rounded-md bg-kali-blue hover:bg-kali-blue-light active:bg-kali-blue text-white text-sm font-bold transition-colors no-outline focus-visible:ring-2 focus-visible:ring-kali-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-kali-card"
          >
            Log In
          </button>

          <p
            id="login-hint"
            role={error ? "alert" : undefined}
            className={`mt-3 text-center text-xs ${error ? "text-red-400" : "text-kali-muted"}`}
          >
            {error || (
              <>
                No password needed, just press{" "}
                <kbd className="px-1.5 py-0.5 rounded border border-kali-line bg-kali-field font-kali-mono text-[11px]">
                  Enter
                </kbd>
              </>
            )}
          </p>
        </form>
      </main>

      <footer className="absolute bottom-4 inset-x-0 vstack gap-1 text-center font-kali-mono text-[11px] text-white/50">
        <p>Kali GNU/Linux Rolling · {user.hostname} tty7</p>
        <p>
          Web, mobile &amp; AI development:{" "}
          <a
            href="https://daromsart.xyz/"
            className="select-text underline underline-offset-2 hover:text-white"
          >
            Daroms'Art
          </a>
        </p>
      </footer>
    </div>
  );
}
