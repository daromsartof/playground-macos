import type { BearData } from "~/types";

const bear: BearData[] = [
  {
    id: "profile",
    title: "Profile",
    icon: "i-fa-solid:paw",
    md: [
      {
        id: "about-me",
        title: "About Me",
        file: "markdown/about-me.md",
        icon: "i-ri:user-smile-line",
        excerpt: "Hey there! I'm a backend & AI developer from Madagascar..."
      },
      {
        id: "resume",
        title: "Résumé",
        file: "markdown/resume.md",
        icon: "i-ri:file-user-line",
        excerpt: "Experience, skills, education and certifications..."
      },
      {
        id: "github-stats",
        title: "Github Stats",
        file: "markdown/github-stats.md",
        icon: "i-icon-park-outline:github",
        excerpt: "Here are some status about my github account..."
      },
      {
        id: "about-site",
        title: "About This Site",
        file: "markdown/about-site.md",
        icon: "i-octicon:browser",
        excerpt: "Something about this personal portfolio site..."
      }
    ]
  },
  {
    id: "project",
    title: "Projects",
    icon: "i-octicon:repo",
    md: [
      {
        id: "daroms-speedapp",
        title: "Daroms Speed App",
        file: "https://raw.githubusercontent.com/daromsartof/daroms-speedapp/main/README.md",
        icon: "i-bi:lightning-charge-fill",
        excerpt: "Expo + Tamagui + Supabase mobile framework built for Claude Code...",
        link: "https://daromsartof.github.io/daroms-speedapp/"
      },
      {
        id: "expo-pin",
        title: "expo-pin",
        file: "https://raw.githubusercontent.com/daromsartof/expo-pin/main/README.md",
        icon: "i-ri:pushpin-2-fill",
        excerpt: "Stop Expo Go auto-updates from forcing Expo SDK upgrades...",
        link: "https://www.npmjs.com/package/expo-pin"
      },
      {
        id: "palmer-immo",
        title: "Palmer-immo",
        file: "markdown/projects/palmer-immo.md",
        icon: "i-ri:home-4-line",
        excerpt: "Scraping services and RAG agents for a Swiss real estate SaaS...",
        link: "https://www.palmer-immo.ch/"
      },
      {
        id: "compta-sympa",
        title: "Compta Sympa",
        file: "markdown/projects/compta-sympa.md",
        icon: "i-ri:bill-line",
        excerpt: "OCR + LLM document classification at 90% accuracy...",
        link: "https://compta-sympa.com/"
      },
      {
        id: "pure-budget",
        title: "Pure Budget",
        file: "markdown/projects/pure-budget.md",
        icon: "i-ri:wallet-3-line",
        excerpt: "AI budget app with voice logging and receipt scanning..."
      },
      {
        id: "aimkit",
        title: "AimKit",
        file: "markdown/projects/aimkit.md",
        icon: "i-ri:focus-3-line",
        excerpt: "Point at any element on your page and send it to Claude Code..."
      },
      {
        id: "wawap",
        title: "Wawap",
        file: "markdown/projects/wawap.md",
        icon: "i-ri:whatsapp-line",
        excerpt: "Chrome extension that drafts WhatsApp Web replies with AI..."
      },
      {
        id: "funface",
        title: "FunFace",
        file: "markdown/projects/funface.md",
        icon: "i-ri:emotion-laugh-line",
        excerpt: "Facial recognition pipeline and React Native app..."
      },
      {
        id: "databonita",
        title: "Databonita",
        file: "markdown/projects/databonita.md",
        icon: "i-ri:dashboard-3-line",
        excerpt: "Real-time KPI dashboards for iOS and Android..."
      },
      {
        id: "smart-scrapping",
        title: "Smart Scraping",
        file: "https://raw.githubusercontent.com/daromsartof/smart-scrapping/main/README.md",
        icon: "i-ri:robot-2-line",
        excerpt: "LLM-powered web scraping agent system with Docker...",
        link: "https://github.com/daromsartof/smart-scrapping"
      }
    ]
  }
];

export default bear;
