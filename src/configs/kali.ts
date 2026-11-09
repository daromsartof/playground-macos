// Official Kali Linux links, shown in the Kickoff launcher and KRunner.

export interface KaliLink {
  id: string;
  title: string;
  description: string;
  link: string;
}

export const kaliLinks: KaliLink[] = [
  {
    id: "kali-website",
    title: "Kali Linux",
    description: "kali.org",
    link: "https://www.kali.org/"
  },
  {
    id: "kali-docs",
    title: "Kali Docs",
    description: "Official documentation",
    link: "https://www.kali.org/docs/"
  },
  {
    id: "kali-forums",
    title: "Kali Forums",
    description: "Community forums",
    link: "https://forums.kali.org/"
  }
];
