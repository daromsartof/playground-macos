import React from "react";
import { Rnd } from "react-rnd";
import { minMarginX, minMarginY, appBarHeight, panelHeight } from "~/utils";

interface ButtonsProps {
  id: string;
  max: boolean;
  aspectRatio?: number;
  setMax: (id: string, target?: boolean) => void;
  setMin: (id: string) => void;
  close: (id: string) => void;
}

interface WindowProps extends ButtonsProps {
  title: string;
  img: string;
  min: boolean;
  active: boolean;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  x?: number;
  y?: number;
  z: number;
  focus: (id: string) => void;
  children: React.ReactNode;
}

interface WindowState {
  width: number;
  height: number;
  x: number;
  y: number;
}

// Breeze-like window buttons, on the right as in KDE Plasma
const WindowButtons = ({ id, close, aspectRatio, max, setMax, setMin }: ButtonsProps) => {
  const disableMax = aspectRatio !== undefined;

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    <div className="hstack gap-1 pr-1.5" onDoubleClick={stop} onMouseDown={stop}>
      <button
        type="button"
        className="kwin-btn"
        aria-label="Minimize"
        title="Minimize"
        onClick={() => setMin(id)}
        disabled={max}
      >
        <span className="i-mdi:chevron-down text-lg" />
      </button>
      {!disableMax && (
        <button
          type="button"
          className="kwin-btn"
          aria-label={max ? "Restore" : "Maximize"}
          title={max ? "Restore" : "Maximize"}
          onClick={() => setMax(id)}
        >
          <span
            className={`${max ? "i-mdi:rhombus-outline" : "i-mdi:chevron-up"} text-lg`}
          />
        </button>
      )}
      <button
        type="button"
        className="kwin-btn kwin-close"
        aria-label="Close"
        title="Close"
        onClick={(e) => {
          e.stopPropagation();
          close(id);
        }}
      >
        <span className="i-mdi:close text-base" />
      </button>
    </div>
  );
};

const Window = (props: WindowProps) => {
  const { winWidth, winHeight } = useWindowSize();
  const usableHeight = winHeight - panelHeight;

  const initWidth = Math.min(winWidth, props.width || 640);
  const initHeight = Math.min(usableHeight, props.height || 400);

  const [state, setState] = useState<WindowState>({
    width: initWidth,
    height: initHeight,
    // "+ winWidth" because of the boundary for windows
    x: winWidth + (winWidth - initWidth) / 2 + (props.x || 0),
    y: Math.max(0, (usableHeight - initHeight) / 2 + (props.y || 0))
  });

  useEffect(() => {
    setState({
      ...state,
      width: Math.min(winWidth, state.width),
      height: Math.min(usableHeight, state.height)
    });
  }, [winWidth, winHeight]);

  const minimized = props.min
    ? "opacity-0 invisible transition-opacity duration-300"
    : "";
  const frame = props.max
    ? "rounded-none"
    : "rounded-md border border-black/60 outline outline-1 outline-white/8";
  const width = props.max ? winWidth : state.width;
  const height = props.max ? usableHeight : state.height;
  const disableMax = props.aspectRatio !== undefined;

  const children = React.cloneElement(props.children as React.ReactElement, {
    width: width
  });

  return (
    <Rnd
      bounds="parent"
      size={{
        width: width,
        height: height
      }}
      position={{
        x: props.max
          ? winWidth // because of boundary
          : Math.min(
              // "winWidth * 2" because of the boundary for windows
              winWidth * 2 - minMarginX,
              Math.max(
                // "+ winWidth" because we add a boundary for windows
                winWidth - state.width + minMarginX,
                state.x
              )
            ),
        y: props.max
          ? -minMarginY
          : Math.min(usableHeight - appBarHeight, Math.max(0, state.y))
      }}
      onDragStop={(e, d) => {
        setState({ ...state, x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setState({
          ...state,
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          ...position
        });
      }}
      minWidth={props.minWidth ? props.minWidth : 200}
      minHeight={props.minHeight ? props.minHeight : 150}
      dragHandleClassName="window-bar"
      disableDragging={props.max}
      enableResizing={!props.max}
      lockAspectRatio={props.aspectRatio}
      lockAspectRatioExtraHeight={props.aspectRatio ? appBarHeight : undefined}
      style={{ zIndex: props.z }}
      onMouseDown={() => props.focus(props.id)}
      className={`overflow-hidden font-kali bg-kali-card shadow-[0_12px_40px_rgba(0,0,0,0.55)] ${frame} ${minimized}`}
      id={`window-${props.id}`}
    >
      <div
        className={`window-bar relative h-8 hstack select-none border-b border-black/40 transition-colors ${
          props.active ? "bg-[#262a33] text-kali-text" : "bg-kali-card text-kali-muted"
        }`}
        onDoubleClick={() => !disableMax && props.setMax(props.id)}
      >
        <img
          className={`size-4 ml-2.5 ${props.active ? "" : "opacity-60"}`}
          src={props.img}
          alt=""
          draggable={false}
        />
        <span className="absolute inset-x-28 text-center text-[13px] truncate pointer-events-none">
          {props.title}
        </span>
        <div className="flex-1" />
        <WindowButtons
          id={props.id}
          max={props.max}
          aspectRatio={props.aspectRatio}
          setMax={props.setMax}
          setMin={props.setMin}
          close={props.close}
        />
      </div>
      <div className="innner-window w-full overflow-y-hidden">{children}</div>
    </Rnd>
  );
};

export default Window;
