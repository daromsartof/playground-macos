interface BootProps {
  restart: boolean;
  sleep: boolean;
  setBooting: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

type Phase = "off" | "sleep" | "grub" | "splash";

const GRUB_ENTRIES = [
  "Kali GNU/Linux",
  "Advanced options for Kali GNU/Linux",
  "UEFI Firmware Settings"
];
const GRUB_TIMEOUT = 5;

// GRUB menu (text mode)
const Grub = ({ onBoot }: { onBoot: () => void }) => {
  const [selected, setSelected] = useState(0);
  const [seconds, setSeconds] = useState(GRUB_TIMEOUT);
  const [touched, setTouched] = useState(false);

  useInterval(
    () => {
      if (seconds <= 1) onBoot();
      else setSeconds(seconds - 1);
    },
    touched ? null : 1000
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setTouched(true);
        setSelected((s) => Math.min(s + 1, GRUB_ENTRIES.length - 1));
      } else if (e.key === "ArrowUp") {
        setTouched(true);
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter") onBoot();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onBoot]);

  return (
    <div className="size-full bg-black text-[#aaaaaa] font-kali-mono text-[13px] sm:text-sm flex flex-col items-center pt-[8vh] px-4 select-none">
      <div className="mb-4">GNU GRUB version 2.12</div>
      <ul className="w-full max-w-3xl border border-[#aaaaaa] py-1 min-h-[45vh]">
        {GRUB_ENTRIES.map((entry, index) => (
          <li key={entry}>
            <button
              type="button"
              className={`w-full text-left px-2 leading-6 ${
                index === selected ? "bg-[#aaaaaa] text-black" : ""
              }`}
              onMouseEnter={() => {
                setTouched(true);
                setSelected(index);
              }}
              onClick={onBoot}
            >
              {index === selected ? "*" : " "}
              {entry}
            </button>
          </li>
        ))}
      </ul>
      <div className="w-full max-w-3xl mt-3 px-4 leading-6">
        <p>Use the ↑ and ↓ keys to select which entry is highlighted.</p>
        <p>Press enter (or click) to boot the selected OS.</p>
        {!touched && (
          <p className="mt-2">
            The highlighted entry will be executed automatically in {seconds}s.
          </p>
        )}
      </div>
    </div>
  );
};

// Plymouth splash screen
const Splash = ({ onDone }: { onDone: () => void }) => {
  const [percent, setPercent] = useState(0);

  useInterval(
    () => {
      if (percent >= 100) onDone();
      else setPercent(Math.min(100, percent + 2));
    },
    percent > 100 ? null : 40
  );

  return (
    <div className="size-full bg-black flex-center flex-col gap-10 select-none">
      <span className="i-simple-icons:kalilinux size-28 sm:size-36 text-kali-blue drop-shadow-[0_0_24px_rgba(54,123,240,0.45)]" />
      <div
        className="w-56 h-1 rounded-full bg-white/10 overflow-hidden"
        role="progressbar"
        aria-label="Booting"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full bg-kali-blue" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};

export default function Boot({ restart, sleep, setBooting }: BootProps) {
  const [phase, setPhase] = useState<Phase>(sleep ? "sleep" : restart ? "grub" : "off");

  const boot = useCallback(() => setPhase("splash"), []);
  const done = useCallback(() => setBooting(false), [setBooting]);

  if (phase === "grub") return <Grub onBoot={boot} />;
  if (phase === "splash") return <Splash onDone={done} />;

  // powered off or suspended: black screen
  return (
    <button
      type="button"
      className="size-full bg-black flex-center flex-col gap-4 text-sm text-white/40 font-kali-mono cursor-default"
      onClick={() => (phase === "sleep" ? setBooting(false) : setPhase("grub"))}
    >
      <span
        className={`i-mdi:power text-4xl ${
          phase === "sleep" ? "text-kali-blue/60 animate-pulse" : ""
        }`}
      />
      {phase === "sleep" ? "Suspended · click to wake up" : "Powered off · click to boot"}
    </button>
  );
}
