import type { WebsitesData } from "~/types";

const websites: WebsitesData = {
  favorites: {
    title: "SNS Links",
    sites: [
      {
        id: "my-website",
        title: "Daroms'Art",
        img: "img/ui/avatar.jpg",
        link: "https://daromsart.xyz/"
      },
      {
        id: "my-portfolio",
        title: "Portfolio",
        img: "img/ui/avatar.jpg",
        link: "https://romeo-ericka.vercel.app/",
        inner: true
      },
      {
        id: "my-github",
        title: "Github",
        img: "img/sites/github.svg",
        link: "https://github.com/daromsartof"
      },
      {
        id: "my-linkedin",
        title: "Linkedin",
        img: "img/sites/linkedin.svg",
        link: "https://www.linkedin.com/in/daroms/"
      },
      {
        id: "my-twitter",
        title: "X",
        img: "img/sites/twitter.svg",
        link: "https://x.com/Romeo_Eticka"
      },
      {
        id: "my-email",
        title: "Email",
        img: "img/sites/gmail.svg",
        link: "mailto:romeoerika.razaka@gmail.com"
      }
    ]
  },
  freq: {
    title: "Frequently Visited",
    sites: [
      {
        id: "github",
        title: "Github",
        img: "img/sites/github.svg",
        link: "https://github.com/"
      },
      {
        id: "huggingface",
        title: "Hugging Face",
        img: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
        link: "https://huggingface.co/"
      },
      {
        id: "claude",
        title: "Claude",
        img: "https://claude.ai/apple-touch-icon.png",
        link: "https://claude.ai/"
      },
      {
        id: "stackoverflow",
        title: "Stack Overflow",
        img: "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png",
        link: "https://stackoverflow.com/"
      },
      {
        id: "fastapi",
        title: "FastAPI",
        img: "https://fastapi.tiangolo.com/img/favicon.png",
        link: "https://fastapi.tiangolo.com/"
      },
      {
        id: "langchain",
        title: "LangChain",
        link: "https://python.langchain.com/"
      },
      {
        id: "docker-hub",
        title: "Docker Hub",
        img: "https://www.docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
        link: "https://hub.docker.com/"
      },
      {
        id: "expo",
        title: "Expo",
        link: "https://expo.dev/"
      },
      {
        id: "npm",
        title: "npm",
        link: "https://www.npmjs.com/"
      },
      {
        id: "kaggle",
        title: "Kaggle",
        img: "https://www.kaggle.com/static/images/favicon.ico",
        link: "https://www.kaggle.com/"
      },
      {
        id: "arxiv",
        title: "arXiv",
        img: "img/sites/arxiv.png",
        link: "https://arxiv.org/"
      },
      {
        id: "leetcode",
        title: "LeetCode",
        img: "img/sites/leetcode.svg",
        link: "https://leetcode.com/"
      },
      {
        id: "fiverr",
        title: "Fiverr",
        link: "https://www.fiverr.com/"
      },
      {
        id: "dribbble",
        title: "Dribbble",
        img: "img/sites/dribbble.svg",
        link: "https://dribbble.com/"
      },
      {
        id: "reddit",
        title: "Reddit",
        img: "img/sites/reddit.svg",
        link: "https://www.reddit.com/"
      },
      {
        id: "hacker-news",
        title: "Hacker News",
        img: "img/sites/hacker.svg",
        link: "https://news.ycombinator.com/"
      },
      {
        id: "svgomg",
        title: "SVGOMG",
        img: "https://jakearchibald.github.io/svgomg/imgs/icon.png",
        link: "https://jakearchibald.github.io/svgomg/"
      },
      {
        id: "tiny-png",
        title: "Tiny PNG",
        img: "https://tinypng.com/images/panda-chewing-2x.png",
        link: "https://tinypng.com/"
      }
    ]
  }
};

export default websites;
