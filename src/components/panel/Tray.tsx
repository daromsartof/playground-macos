import React from "react";
import { format } from "date-fns";
import { music, user } from "~/configs";
import type { HTMLAudioState } from "~/hooks";

type TrayId =
  | "clipboard"
  | "notifications"
  | "audio"
  | "network"
  | "battery"
  | "calendar";

interface TrayProps {
  audioState: HTMLAudioState;
  toggleAudio: () => void;
  setAudioVolume: (value: number) => void;
}

const clipboardItems = [
  { id: "email", label: "romeoerika.razaka@gmail.com", icon: "i-mdi:email-outline" },
  { id: "github", label: "https://github.com/daromsartof", icon: "i-mdi:github" },
  {
    id: "linkedin",
    label: "https://www.linkedin.com/in/daroms/",
    icon: "i-mdi:linkedin"
  },
  { id: "website", label: "https://daromsart.xyz/", icon: "i-mdi:web" }
];

const Switch = ({
  checked,
  onChange,
  label
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    className={`relative w-9 h-5 rounded-full transition-colors ${
      checked ? "bg-kali-blue" : "bg-white/20"
    }`}
    onClick={onChange}
  >
    <span
      className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-white transition-transform ${
        checked ? "translate-x-4" : ""
      }`}
    />
  </button>
);

const PopupTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="pb-2 mb-2 border-b border-white/8 font-bold text-sm">{children}</div>
);

const Range = ({
  icon,
  value,
  onChange,
  label
}: {
  icon: string;
  value: number;
  onChange: (v: number) => void;
  label: string;
}) => (
  <label className="hstack gap-3">
    <span className={`${icon} text-lg text-kali-muted`} />
    <input
      type="range"
      min={0}
      max={100}
      value={value}
      aria-label={label}
      className="flex-1 accent-[#367bf0] cursor-pointer"
      onChange={(e) => onChange(Number(e.target.value))}
    />
    <span className="w-9 text-right text-xs tabular-nums text-kali-muted">{value}%</span>
  </label>
);

const ClipboardPopup = () => {
  const [copied, setCopied] = useState("");

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(""), 1500);
    } catch {
      setCopied("");
    }
  };

  return (
    <div className="w-80">
      <PopupTitle>Clipboard</PopupTitle>
      <ul className="space-y-0.5">
        {clipboardItems.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="w-full hstack gap-2.5 px-2 h-9 rounded-md text-left text-[13px] hover:bg-white/8"
              onClick={() => copy(item.id, item.label)}
            >
              <span className={`${item.icon} text-base text-kali-muted`} />
              <span className="flex-1 truncate">{item.label}</span>
              <span
                className={`${
                  copied === item.id ? "i-mdi:check text-green-400" : "i-mdi:content-copy"
                } text-sm text-kali-muted`}
              />
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-2 px-2 text-[11px] text-kali-muted">Click an entry to copy it.</p>
    </div>
  );
};

const NotificationsPopup = ({
  dnd,
  toggleDnd
}: {
  dnd: boolean;
  toggleDnd: () => void;
}) => (
  <div className="w-80">
    <PopupTitle>
      <div className="hstack justify-between">
        Notifications
        <span className="hstack gap-2 text-xs font-normal text-kali-muted">
          Do not disturb
          <Switch checked={dnd} onChange={toggleDnd} label="Do not disturb" />
        </span>
      </div>
    </PopupTitle>
    <WelcomeNotification />
  </div>
);

const WelcomeNotification = () => (
  <div className="hstack items-start gap-3 p-2.5 rounded-md bg-white/5">
    <span className="i-simple-icons:kalilinux text-2xl text-kali-blue shrink-0" />
    <div className="min-w-0 text-[13px]">
      <div className="font-bold">Welcome to {user.hostname}, Romeo here 👋</div>
      <div className="mt-0.5 text-kali-muted">
        Open the launcher with the dragon icon, or press{" "}
        <kbd className="font-kali-mono text-[11px] text-kali-text">Alt+Space</kbd> to
        search. My profile & projects are in Dolphin.
      </div>
    </div>
  </div>
);

const AudioPopup = ({ audioState, toggleAudio, setAudioVolume }: TrayProps) => {
  const volume = useStore((state) => state.volume);

  return (
    <div className="w-80">
      <PopupTitle>Audio Volume</PopupTitle>
      <Range
        icon="i-mdi:volume-high"
        label="Volume"
        value={volume}
        onChange={setAudioVolume}
      />
      <div className="mt-3 pt-3 border-t border-white/8 hstack gap-3">
        <img className="size-12 rounded-md object-cover" src={music.cover} alt="" />
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-bold truncate">{music.title}</div>
          <div className="text-xs text-kali-muted truncate">{music.artist}</div>
        </div>
        <button
          type="button"
          className="flex-center size-9 rounded-full bg-kali-blue hover:bg-kali-blue-light text-white"
          aria-label={audioState.playing ? "Pause" : "Play"}
          onClick={toggleAudio}
        >
          <span
            className={`${audioState.playing ? "i-mdi:pause" : "i-mdi:play"} text-xl`}
          />
        </button>
      </div>
    </div>
  );
};

const NetworkPopup = () => {
  const { wifi, toggleWIFI } = useStore((state) => ({
    wifi: state.wifi,
    toggleWIFI: state.toggleWIFI
  }));

  return (
    <div className="w-80">
      <PopupTitle>
        <div className="hstack justify-between">
          Networks
          <span className="hstack gap-2 text-xs font-normal text-kali-muted">
            Wi-Fi
            <Switch checked={wifi} onChange={toggleWIFI} label="Wi-Fi" />
          </span>
        </div>
      </PopupTitle>
      {wifi ? (
        <ul className="space-y-0.5 text-[13px]">
          <li className="hstack gap-2.5 px-2 h-11 rounded-md bg-kali-blue/20">
            <span className="i-mdi:wifi-strength-4 text-lg" />
            <span className="flex-1">
              <span className="block">DaromsArt-5G</span>
              <span className="block text-[11px] text-kali-muted">Connected</span>
            </span>
            <span className="i-mdi:lock text-xs text-kali-muted" />
          </li>
          <li className="hstack gap-2.5 px-2 h-9 rounded-md hover:bg-white/6 text-kali-muted">
            <span className="i-mdi:wifi-strength-2 text-lg" />
            <span className="flex-1">Tana-Coworking</span>
            <span className="i-mdi:lock text-xs" />
          </li>
          <li className="hstack gap-2.5 px-2 h-9 rounded-md hover:bg-white/6 text-kali-muted">
            <span className="i-mdi:wifi-strength-1 text-lg" />
            <span className="flex-1">Baobab-Guest</span>
          </li>
        </ul>
      ) : (
        <div className="py-6 text-center text-[13px] text-kali-muted">
          Wi-Fi is disabled
        </div>
      )}
    </div>
  );
};

const batteryIcon = (level: number, charging: boolean) => {
  if (charging) return "i-mdi:battery-charging";
  if (level >= 0.9) return "i-mdi:battery";
  if (level >= 0.6) return "i-mdi:battery-70";
  if (level >= 0.35) return "i-mdi:battery-50";
  if (level >= 0.15) return "i-mdi:battery-20";
  return "i-mdi:battery-alert-variant-outline";
};

const BatteryPopup = () => {
  const battery = useBattery();
  const { brightness, setBrightness, fullscreen, toggleFullScreen } = useStore(
    (state) => ({
      brightness: state.brightness,
      setBrightness: state.setBrightness,
      fullscreen: state.fullscreen,
      toggleFullScreen: state.toggleFullScreen
    })
  );
  const percent = Math.round(battery.level * 100);

  return (
    <div className="w-80">
      <PopupTitle>Power and Battery</PopupTitle>
      <div className="hstack gap-3 px-1">
        <span className={`${batteryIcon(battery.level, battery.charging)} text-3xl`} />
        <div className="flex-1">
          <div className="text-[13px] font-bold">Battery · {percent}%</div>
          <div className="text-xs text-kali-muted">
            {battery.charging
              ? percent >= 100
                ? "Fully charged"
                : "Charging"
              : "Discharging"}
          </div>
          <div className="mt-1.5 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-kali-blue" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-white/8 space-y-3">
        <div className="text-xs text-kali-muted">Display Brightness</div>
        <Range
          icon="i-mdi:brightness-6"
          label="Display brightness"
          value={brightness}
          onChange={setBrightness}
        />
        <div className="hstack justify-between text-[13px]">
          <span className="hstack gap-3">
            <span className="i-mdi:fullscreen text-lg text-kali-muted" />
            Fullscreen
          </span>
          <Switch
            checked={fullscreen}
            onChange={() => toggleFullScreen(!fullscreen)}
            label="Fullscreen"
          />
        </div>
      </div>
    </div>
  );
};

export default function Tray({ audioState, toggleAudio, setAudioVolume }: TrayProps) {
  const [open, setOpen] = useState<TrayId | null>(null);
  const [dnd, setDnd] = useState(false);
  const [toast, setToast] = useState(true);
  const [now, setNow] = useState(new Date());
  const wrapRef = useRef<HTMLDivElement>(null);

  const { volume, wifi } = useStore((state) => ({
    volume: state.volume,
    wifi: state.wifi
  }));
  const battery = useBattery();

  useInterval(() => setNow(new Date()), 10 * 1000);
  useClickOutside(wrapRef, () => setOpen(null));

  useEffect(() => {
    const timer = setTimeout(() => setToast(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  const toggle = (id: TrayId) => setOpen(open === id ? null : id);

  const volumeIcon =
    volume === 0
      ? "i-mdi:volume-off"
      : volume < 50
        ? "i-mdi:volume-medium"
        : "i-mdi:volume-high";

  const buttons: { id: TrayId; label: string; icon: string }[] = [
    { id: "clipboard", label: "Clipboard", icon: "i-mdi:clipboard-text-outline" },
    {
      id: "notifications",
      label: "Notifications",
      icon: dnd ? "i-mdi:bell-off-outline" : "i-mdi:bell-outline"
    },
    { id: "audio", label: "Audio Volume", icon: volumeIcon },
    { id: "network", label: "Networks", icon: wifi ? "i-mdi:wifi" : "i-mdi:wifi-off" },
    {
      id: "battery",
      label: "Power and Battery",
      icon: batteryIcon(battery.level, battery.charging)
    }
  ];

  return (
    <div ref={wrapRef} className="hstack h-full">
      <div className="hstack h-full">
        {buttons.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`tray-btn ${open === b.id ? "bg-white/12" : ""} ${
              b.id === "clipboard" || b.id === "notifications" ? "hidden sm:flex" : ""
            }`}
            aria-label={b.label}
            title={b.label}
            aria-expanded={open === b.id}
            onClick={() => toggle(b.id)}
          >
            <span className={`${b.icon} text-[18px]`} />
          </button>
        ))}
      </div>

      {/* Digital clock */}
      <button
        type="button"
        className={`tray-btn flex-col !px-2.5 leading-tight tabular-nums ${
          open === "calendar" ? "bg-white/12" : ""
        }`}
        aria-label="Calendar"
        aria-expanded={open === "calendar"}
        onClick={() => toggle("calendar")}
      >
        <span className="text-[13px] font-bold">{format(now, "HH:mm")}</span>
        <span className="text-[11px] text-kali-muted">{format(now, "dd/MM/yyyy")}</span>
      </button>

      {open && (
        <div className="fixed right-1 bottom-[52px] z-40 p-3 rounded-lg bg-kali-card/95 border border-white/10 shadow-2xl shadow-black/60 backdrop-blur-xl text-kali-text max-w-[calc(100vw-8px)] animate-[kickoff-in_120ms_ease-out]">
          {open === "clipboard" && <ClipboardPopup />}
          {open === "notifications" && (
            <NotificationsPopup dnd={dnd} toggleDnd={() => setDnd(!dnd)} />
          )}
          {open === "audio" && (
            <AudioPopup
              audioState={audioState}
              toggleAudio={toggleAudio}
              setAudioVolume={setAudioVolume}
            />
          )}
          {open === "network" && <NetworkPopup />}
          {open === "battery" && <BatteryPopup />}
          {open === "calendar" && <Calendar now={now} />}
        </div>
      )}

      {/* Welcome notification toast */}
      {toast && !dnd && !open && (
        <div
          role="status"
          className="fixed right-2 bottom-[56px] z-40 w-80 max-w-[calc(100vw-16px)] rounded-lg bg-kali-card/95 border border-white/10 shadow-2xl shadow-black/60 backdrop-blur-xl text-kali-text animate-[toast-in_200ms_ease-out]"
        >
          <div className="hstack justify-between px-3 pt-2 text-[11px] text-kali-muted">
            <span>Plasma · now</span>
            <button
              type="button"
              className="tray-icon-btn !size-6"
              aria-label="Close notification"
              onClick={() => setToast(false)}
            >
              <span className="i-mdi:close" />
            </button>
          </div>
          <div className="px-1 pb-1">
            <WelcomeNotification />
          </div>
        </div>
      )}
    </div>
  );
}
