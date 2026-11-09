import type { TerminalData } from "~/types";

const terminal: TerminalData[] = [
  {
    id: "about",
    title: "about",
    type: "folder",
    children: [
      {
        id: "about-bio",
        title: "bio.txt",
        type: "file",
        content: (
          <div className="py-1">
            <div>
              Hi, this is Romeo Ericka Razakandriarimanana. I am a backend & AI developer
              based in Antananarivo, Madagascar, with 3+ years of experience building
              Python services and LLM-powered products. I also run Daroms&apos;Art, a web,
              mobile and AI development agency.
            </div>
          </div>
        )
      },
      {
        id: "about-interests",
        title: "interests.txt",
        type: "file",
        content: "Backend / LLM & RAG Agents / OCR & Document AI / Mobile Apps"
      },
      {
        id: "about-who-cares",
        title: "who-cares.txt",
        type: "file",
        content:
          "I'm open to freelance missions and remote backend & AI roles. I work in English and French with teams across time zones."
      },
      {
        id: "about-contact",
        title: "contact.txt",
        type: "file",
        content: (
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                className="text-blue-300"
                href="mailto:romeoerika.razaka@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                romeoerika.razaka@gmail.com
              </a>
            </li>
            <li>
              Github:{" "}
              <a
                className="text-blue-300"
                href="https://github.com/daromsartof"
                target="_blank"
                rel="noreferrer"
              >
                @daromsartof
              </a>
            </li>
            <li>
              Linkedin:{" "}
              <a
                className="text-blue-300"
                href="https://www.linkedin.com/in/daroms/"
                target="_blank"
                rel="noreferrer"
              >
                daroms
              </a>
            </li>
            <li>
              X:{" "}
              <a
                className="text-blue-300"
                href="https://x.com/Romeo_Eticka"
                target="_blank"
                rel="noreferrer"
              >
                @Romeo_Eticka
              </a>
            </li>
            <li>
              Website:{" "}
              <a
                className="text-blue-300"
                href="https://daromsart.xyz/"
                target="_blank"
                rel="noreferrer"
              >
                https://daromsart.xyz
              </a>
            </li>
          </ul>
        )
      }
    ]
  },
  {
    id: "about-dream",
    title: "my-dream.cpp",
    type: "file",
    content: (
      <div className="py-1">
        <div>
          <span className="text-yellow-400">while</span>(
          <span className="text-blue-400">sleeping</span>) <span>{"{"}</span>
        </div>
        <div>
          <span className="text-blue-400 ml-9">money</span>
          <span className="text-yellow-400">++</span>;
        </div>
        <div>
          <span>{"}"}</span>
        </div>
      </div>
    )
  }
];

export default terminal;
