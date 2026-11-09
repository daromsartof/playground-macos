import React from "react";
import { apps, wallpapers } from "~/configs";
import { minMarginY } from "~/utils";
import type { LauncherItem } from "~/utils/launcher";
import type { MacActions } from "~/types";

interface DesktopState {
  showApps: {
    [key: string]: boolean;
  };
  appsZ: {
    [key: string]: number;
  };
  maxApps: {
    [key: string]: boolean;
  };
  minApps: {
    [key: string]: boolean;
  };
  maxZ: number;
  krunner: boolean;
}

export default function Desktop(props: MacActions) {
  const [state, setState] = useState({
    showApps: {},
    appsZ: {},
    maxApps: {},
    minApps: {},
    maxZ: 2,
    krunner: false
  } as DesktopState);

  const brightness = useStore((state) => state.brightness);
  const dark = useStore((state) => state.dark);

  const getAppsData = (): void => {
    let showApps = {},
      appsZ = {},
      maxApps = {},
      minApps = {};

    apps.forEach((app) => {
      showApps = {
        ...showApps,
        [app.id]: !!app.show
      };
      appsZ = {
        ...appsZ,
        [app.id]: 2
      };
      maxApps = {
        ...maxApps,
        [app.id]: false
      };
      minApps = {
        ...minApps,
        [app.id]: false
      };
    });

    setState({ ...state, showApps, appsZ, maxApps, minApps });
  };

  useEffect(() => {
    getAppsData();
  }, []);

  // KRunner shortcut: Alt+Space or Alt+F2, like on KDE Plasma
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.code === "Space" || e.key === "F2")) {
        e.preventDefault();
        setState((s) => ({ ...s, krunner: !s.krunner }));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeKRunner = (): void => {
    setState((s) => ({ ...s, krunner: false }));
  };

  const setWindowPosition = (id: string): void => {
    const r = document.querySelector(`#window-${id}`) as HTMLElement;
    const rect = r.getBoundingClientRect();
    r.style.setProperty(
      "--window-transform-x",
      // "+ window.innerWidth" because of the boundary for windows
      (window.innerWidth + rect.x).toFixed(1).toString() + "px"
    );
    r.style.setProperty(
      "--window-transform-y",
      (rect.y - minMarginY).toFixed(1).toString() + "px"
    );
  };

  const setAppMax = (id: string, target?: boolean): void => {
    const maxApps = state.maxApps;
    if (target === undefined) target = !maxApps[id];
    maxApps[id] = target;
    setState({
      ...state,
      maxApps: maxApps
    });
  };

  const setAppMin = (id: string, target?: boolean): void => {
    const minApps = state.minApps;
    if (target === undefined) target = !minApps[id];
    minApps[id] = target;
    setState({
      ...state,
      minApps: minApps
    });
  };

  const minimizeApp = (id: string): void => {
    setWindowPosition(id);

    // get the corresponding task manager icon's position
    let r = document.querySelector(`#dock-${id}`) as HTMLElement;
    const taskRect = r.getBoundingClientRect();

    r = document.querySelector(`#window-${id}`) as HTMLElement;
    const posY = window.innerHeight - r.offsetHeight / 2 - minMarginY;
    // "+ window.innerWidth" because of the boundary for windows
    const posX = window.innerWidth + taskRect.x - r.offsetWidth / 2 + 22;

    // shrink the window into its task manager entry
    r.style.transform = `translate(${posX}px, ${posY}px) scale(0.2)`;
    r.style.transition = "ease-out 0.3s";

    setAppMin(id, true);
  };

  const closeApp = (id: string): void => {
    const maxApps = state.maxApps;
    maxApps[id] = false;
    const showApps = state.showApps;
    showApps[id] = false;
    setState({
      ...state,
      maxApps,
      showApps
    });
  };

  const openApp = (id: string): void => {
    // add it to the shown app list
    const showApps = state.showApps;
    showApps[id] = true;

    // move to the top (use a maximum z-index)
    const appsZ = state.appsZ;
    const maxZ = state.maxZ + 1;
    appsZ[id] = maxZ;

    setState({
      ...state,
      showApps: showApps,
      appsZ: appsZ,
      maxZ: maxZ
    });

    const minApps = state.minApps;
    // if the app has already been shown but minimized
    if (minApps[id]) {
      // move to window's last position
      const r = document.querySelector(`#window-${id}`) as HTMLElement;
      r.style.transform = `translate(${r.style.getPropertyValue(
        "--window-transform-x"
      )}, ${r.style.getPropertyValue("--window-transform-y")}) scale(1)`;
      r.style.transition = "ease-in 0.3s";
      // remove it from the minimized app list
      minApps[id] = false;
      setState({ ...state, minApps });
    }
  };

  // "Peek at Desktop": minimize every visible window
  const showDesktop = (): void => {
    apps.forEach((app) => {
      if (
        app.desktop &&
        state.showApps[app.id] &&
        !state.minApps[app.id] &&
        !state.maxApps[app.id]
      )
        minimizeApp(app.id);
    });
  };

  const runItem = (item: LauncherItem): void => {
    if (item.kind === "app") openApp(item.target);
    else window.open(item.target, "_blank", "noopener,noreferrer");
  };

  // the focused window is the visible one with the highest z-index
  const activeId =
    apps
      .filter((app) => app.desktop && state.showApps[app.id] && !state.minApps[app.id])
      .sort((a, b) => (state.appsZ[b.id] || 0) - (state.appsZ[a.id] || 0))[0]?.id || null;

  const anyMax = apps.some((app) => state.showApps[app.id] && state.maxApps[app.id]);

  const renderAppWindows = () => {
    return apps.map((app) => {
      if (app.desktop && state.showApps[app.id]) {
        const props = {
          id: app.id,
          title: app.title,
          img: app.img,
          width: app.width,
          height: app.height,
          minWidth: app.minWidth,
          minHeight: app.minHeight,
          aspectRatio: app.aspectRatio,
          x: app.x,
          y: app.y,
          z: state.appsZ[app.id],
          max: state.maxApps[app.id],
          min: state.minApps[app.id],
          active: activeId === app.id,
          close: closeApp,
          setMax: setAppMax,
          setMin: minimizeApp,
          focus: openApp
        };

        return (
          <AppWindow key={`desktop-app-${app.id}`} {...props}>
            {app.content}
          </AppWindow>
        );
      } else {
        return <div key={`desktop-app-${app.id}`} />;
      }
    });
  };

  return (
    <div
      className="size-full overflow-hidden bg-center bg-cover"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`,
        filter: `brightness( ${(brightness as number) * 0.7 + 50}% )`
      }}
    >
      {/* Desktop Apps */}
      <div className="window-bound z-10 absolute" style={{ top: minMarginY }}>
        {renderAppWindows()}
      </div>

      {/* KRunner (Alt+Space) */}
      {state.krunner && <KRunner close={closeKRunner} runItem={runItem} />}

      {/* Plasma panel */}
      <Panel
        setLogin={props.setLogin}
        shutMac={props.shutMac}
        sleepMac={props.sleepMac}
        restartMac={props.restartMac}
        showApps={state.showApps}
        minApps={state.minApps}
        maxApps={state.maxApps}
        activeId={activeId}
        floating={!anyMax}
        openApp={openApp}
        minimizeApp={minimizeApp}
        runItem={runItem}
        showDesktop={showDesktop}
      />
    </div>
  );
}
