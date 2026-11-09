import React from "react";
import { apps, music } from "~/configs";
import type { MacActions } from "~/types";
import type { LauncherItem } from "~/utils/launcher";

interface PanelProps extends MacActions {
  showApps: { [id: string]: boolean };
  minApps: { [id: string]: boolean };
  maxApps: { [id: string]: boolean };
  activeId: string | null;
  floating: boolean;
  openApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  runItem: (item: LauncherItem) => void;
  showDesktop: () => void;
}

// KDE Plasma panel (bottom), Kali Linux flavour
export default function Panel(props: PanelProps) {
  const [kickoff, setKickoff] = useState(false);
  const launcherRef = useRef<HTMLDivElement>(null);

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [audio, audioState, controls] = useAudio({
    src: music.audio,
    autoReplay: true
  });
  const { volume, setVolume } = useStore((state) => ({
    volume: state.volume,
    setVolume: state.setVolume
  }));

  useEffect(() => {
    controls.volume(volume / 100);
  }, []);

  useClickOutside(launcherRef, () => setKickoff(false));

  const setAudioVolume = (value: number) => {
    setVolume(value);
    controls.volume(value / 100);
  };

  const withPause = (action: (e: React.MouseEvent) => void) => (e: React.MouseEvent) => {
    controls.pause();
    action(e);
  };

  const power = [
    {
      label: "Lock",
      icon: "i-mdi:lock-outline",
      run: withPause(() => props.setLogin(false))
    },
    { label: "Sleep", icon: "i-mdi:power-sleep", run: withPause(props.sleepMac) },
    { label: "Restart", icon: "i-mdi:restart", run: withPause(props.restartMac) },
    { label: "Shut Down", icon: "i-mdi:power", run: withPause(props.shutMac) }
  ];

  const onTask = (id: string) => {
    const running = props.showApps[id] && !props.minApps[id];
    if (running && props.activeId === id && !props.maxApps[id]) props.minimizeApp(id);
    else props.openApp(id);
  };

  const shape = props.floating
    ? "bottom-1 inset-x-1 h-10 rounded-lg border border-white/10"
    : "bottom-0 inset-x-0 h-11 rounded-none border-t border-white/8";

  return (
    <div
      className={`fixed z-20 hstack px-1 font-kali text-kali-text shadow-[0_-2px_16px_rgba(0,0,0,0.35)] transition-all duration-200 ${shape}`}
    >
      {/* Background on its own layer: a backdrop-filter on the panel itself would
          trap the fixed popups (Kickoff, tray) inside the panel box */}
      <div className="absolute inset-0 -z-1 rounded-[inherit] bg-kali-panel/90 backdrop-blur-xl" />

      {/* Application launcher */}
      <div ref={launcherRef} className="h-full">
        <button
          type="button"
          className={`tray-btn !px-2.5 ${kickoff ? "bg-white/12" : ""}`}
          aria-label="Application Launcher"
          title="Application Launcher"
          aria-expanded={kickoff}
          onClick={() => setKickoff(!kickoff)}
        >
          <span className="i-simple-icons:kalilinux text-[24px] text-kali-blue" />
        </button>
        {kickoff && (
          <Kickoff
            runItem={props.runItem}
            close={() => setKickoff(false)}
            power={power}
          />
        )}
      </div>

      {/* Icons-only task manager */}
      <ul className="hstack h-full ml-1 min-w-0">
        {apps.map((app) => {
          const running = app.desktop && props.showApps[app.id];
          const active = running && props.activeId === app.id && !props.minApps[app.id];
          const icon = (
            <img
              className="size-7 transition-transform group-active:scale-90"
              src={app.img}
              alt=""
              draggable={false}
            />
          );

          return (
            <li key={app.id} id={`dock-${app.id}`} className="relative h-full group">
              {app.link ? (
                <a
                  className={`task-btn ${active ? "bg-white/12" : ""}`}
                  href={app.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={app.title}
                >
                  {icon}
                </a>
              ) : (
                <button
                  type="button"
                  className={`task-btn ${active ? "bg-white/12" : ""}`}
                  aria-label={app.title}
                  onClick={() => onTask(app.id)}
                >
                  {icon}
                </button>
              )}
              {running && (
                <span
                  className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all ${
                    active ? "w-6 bg-kali-blue" : "w-3 bg-kali-muted"
                  }`}
                />
              )}
              <span className="task-tooltip">{app.title}</span>
            </li>
          );
        })}
      </ul>

      <div className="flex-1" />

      <Tray
        audioState={audioState}
        toggleAudio={controls.toggle}
        setAudioVolume={setAudioVolume}
      />

      {/* Peek at desktop */}
      <button
        type="button"
        className="h-full w-3 ml-1 border-l border-white/10 hover:bg-white/10"
        aria-label="Peek at Desktop"
        title="Peek at Desktop"
        onClick={props.showDesktop}
      />
    </div>
  );
}
