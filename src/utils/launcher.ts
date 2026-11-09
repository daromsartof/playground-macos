import { apps, launchpadApps } from "~/configs";
import { kaliLinks } from "~/configs/kali";

export interface LauncherItem {
  id: string;
  title: string;
  subtitle: string;
  img?: string;
  icon?: string;
  kind: "app" | "link";
  target: string;
}

export interface LauncherCategory {
  id: string;
  title: string;
  icon: string;
  items: LauncherItem[];
}

const appSubtitles: { [id: string]: string } = {
  bear: "File Manager · my profile & projects",
  terminal: "Terminal",
  safari: "Web Browser",
  typora: "Text Editor",
  vscode: "Code Editor",
  facetime: "Camera",
  github: "github.com/daromsartof"
};

export const appItems: LauncherItem[] = apps.map((app) => ({
  id: app.id,
  title: app.title,
  subtitle: appSubtitles[app.id] || "",
  img: app.img,
  kind: app.link ? "link" : "app",
  target: app.link || app.id
}));

export const projectItems: LauncherItem[] = launchpadApps.map((project) => ({
  id: `project-${project.id}`,
  title: project.title,
  subtitle: new URL(project.link).hostname.replace(/^www\./, ""),
  img: project.img,
  kind: "link",
  target: project.link
}));

export const kaliItems: LauncherItem[] = kaliLinks.map((item) => ({
  id: item.id,
  title: item.title,
  subtitle: item.description,
  icon: "i-simple-icons:kalilinux text-kali-blue",
  kind: "link",
  target: item.link
}));

const pick = (ids: string[]) => appItems.filter((item) => ids.includes(item.id));

export const launcherCategories: LauncherCategory[] = [
  {
    id: "favorites",
    title: "Favorites",
    icon: "i-mdi:star-outline",
    items: pick(["bear", "terminal", "safari", "typora", "vscode"])
  },
  {
    id: "all",
    title: "All Applications",
    icon: "i-mdi:apps",
    items: [...appItems].sort((a, b) => a.title.localeCompare(b.title))
  },
  {
    id: "projects",
    title: "Projects",
    icon: "i-mdi:folder-account",
    items: projectItems
  },
  {
    id: "development",
    title: "Development",
    icon: "i-mdi:console",
    items: pick(["terminal", "typora", "vscode", "github"])
  },
  {
    id: "internet",
    title: "Internet",
    icon: "i-mdi:web",
    items: pick(["safari", "github"])
  },
  {
    id: "system",
    title: "System",
    icon: "i-mdi:cog-outline",
    items: pick(["bear", "terminal"])
  },
  {
    id: "multimedia",
    title: "Multimedia",
    icon: "i-mdi:camera",
    items: pick(["facetime"])
  },
  {
    id: "kali",
    title: "Kali Linux",
    icon: "i-simple-icons:kalilinux",
    items: kaliItems
  }
];

export const searchLauncher = (text: string): LauncherItem[] => {
  const query = text.trim().toLowerCase();
  if (query === "") return [];

  return [...appItems, ...projectItems, ...kaliItems].filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query)
  );
};
