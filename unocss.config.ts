import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
  transformerAttributifyJsx
} from "unocss";

const colorReg = (prefix: string) => new RegExp("^" + prefix + "-([0-9a-z]+)(/(\\d+))?$");

const colorAttr = (prefix: string, [, color, , opacity]: RegExpMatchArray) => {
  let lightColor = "",
    darkColor = "";

  if (["black", "white"].includes(color)) {
    lightColor = color;
    darkColor = color === "white" ? "black" : "white";
  } else {
    lightColor = `gray-${color}`;
    darkColor = `gray-${(
      (+color === 900 || +color === 50 ? 950 : 900) - +color
    ).toString()}`;
  }

  const attr = `${prefix}-${lightColor}${opacity ? "/" + opacity : ""}`;
  const darkAttr = `${prefix}-${darkColor}${opacity ? "/" + opacity : ""}`;

  return `${attr} dark:${darkAttr}`;
};

export default defineConfig({
  theme: {
    colors: {
      // Kali Linux inspired palette (Kali-Dark theme)
      kali: {
        blue: { DEFAULT: "#367bf0", light: "#5a95f5" },
        base: "#0b0f19",
        panel: "#14161c",
        card: "#1b1e26",
        field: "#0f1116",
        line: "#2d323e",
        text: "#e6e8ee",
        muted: "#8b93a3"
      }
    },
    fontFamily: {
      kali: '"Cantarell", "Noto Sans", Ubuntu, "Segoe UI", system-ui, sans-serif',
      "kali-mono": '"Fira Code", "JetBrains Mono", "DejaVu Sans Mono", Menlo, monospace'
    }
  },
  shortcuts: [
    ["flex-center", "flex items-center justify-center"],
    ["hstack", "flex items-center"],
    ["vstack", "hstack flex-col"],
    ["no-outline", "outline-none focus:outline-none"],
    [colorReg("text-c"), (v) => colorAttr("text", v)],
    [colorReg("border-c"), (v) => colorAttr("border", v)],
    [colorReg("bg-c"), (v) => colorAttr("bg", v)],
    ["shadow-menu", "shadow-md shadow-black/25 dark:shadow-black/50"],
    ["window-btn", "size-3 text-black rounded-full flex-center no-outline"],
    ["border-menu", "border-gray-500/50"],
    [
      "menu-box",
      "fixed top-8.5 text-c-black bg-c-200/90 border border-menu rounded-lg shadow-menu"
    ],
    [
      "safari-btn",
      "h-6 outline-none focus:outline-none rounded flex-center border border-c-300"
    ],
    ["cc-btn", "flex-center rounded-full size-8 text-white bg-blue-500"],
    [
      "cc-btn-active",
      "flex-center rounded-full size-8 text-c-700 bg-gray-400/25 dark:bg-gray-300/25"
    ],
    ["cc-text", "text-xs text-c-500"],
    ["cc-grid", "bg-c-200/80 rounded-xl cc-grid-shadow backdrop-blur-2xl"],
    ["battery-level", "absolute rounded-[1px] h-2 top-1/2 -mt-1 ml-0.5 left-0"],
    // KDE Plasma / KWin (Kali flavour)
    [
      "kwin-btn",
      "flex-center size-6 rounded-full text-kali-text/80 hover:(bg-white/15 text-white) disabled:(opacity-30 pointer-events-none) no-outline focus-visible:ring-1 focus-visible:ring-kali-blue"
    ],
    ["kwin-close", "hover:(bg-[#e5484d] text-white)"],
    [
      "tray-btn",
      "flex-center h-full px-1.5 rounded-md text-kali-text hover:bg-white/10 no-outline focus-visible:ring-1 focus-visible:ring-kali-blue"
    ],
    ["tray-icon-btn", "flex-center size-7 rounded hover:bg-white/10"],
    [
      "task-btn",
      "flex-center h-full w-11 rounded-md hover:bg-white/8 no-outline focus-visible:ring-1 focus-visible:ring-kali-blue"
    ],
    [
      "task-tooltip",
      "pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+10px)] whitespace-nowrap rounded-md px-2.5 py-1 text-xs bg-kali-card border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity delay-300"
    ]
  ],
  rules: [["cc-grid-shadow", { "box-shadow": "0px 1px 5px 0px rgba(0, 0, 0, 0.3)" }]],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      warn: true,
      extraProperties: {
        display: "inline-block"
      }
    })
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerAttributifyJsx()
  ]
});
