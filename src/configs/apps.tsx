import { appBarHeight } from "~/utils";
import type { AppsData } from "~/types";

// Pinned apps of the Plasma panel (Kali Linux KDE flavour)
const apps: AppsData[] = [
  {
    id: "bear",
    title: "Dolphin",
    desktop: true,
    width: 1100,
    height: 680,
    show: true,
    y: -40,
    img: "img/icons/kde/dolphin.svg",
    content: <Bear />
  },
  {
    id: "terminal",
    title: "Konsole",
    desktop: true,
    width: 760,
    height: 480,
    x: 120,
    y: 40,
    img: "img/icons/kde/konsole.svg",
    content: <Terminal />
  },
  {
    id: "safari",
    title: "Firefox ESR",
    desktop: true,
    width: 1024,
    minWidth: 375,
    minHeight: 200,
    x: -20,
    img: "img/icons/kde/firefox.svg",
    content: <Safari />
  },
  {
    id: "typora",
    title: "Kate",
    desktop: true,
    width: 640,
    height: 580,
    y: -20,
    img: "img/icons/kde/kate.svg",
    content: <Typora />
  },
  {
    id: "vscode",
    title: "Visual Studio Code",
    desktop: true,
    width: 900,
    height: 600,
    x: 80,
    y: -30,
    img: "img/icons/kde/vscode.svg",
    content: <VSCode />
  },
  {
    id: "facetime",
    title: "Kamoso",
    desktop: true,
    img: "img/icons/kde/kamoso.svg",
    width: 500 * 1.7,
    height: 500 + appBarHeight,
    minWidth: 350 * 1.7,
    minHeight: 350 + appBarHeight,
    aspectRatio: 1.7,
    x: -80,
    y: 20,
    content: <FaceTime />
  },
  {
    id: "github",
    title: "GitHub",
    desktop: false,
    img: "img/icons/kde/github.svg",
    link: "https://github.com/daromsartof"
  }
];

export default apps;
