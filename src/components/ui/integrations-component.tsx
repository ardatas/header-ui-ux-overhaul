import { useState } from "react";
import { ArrowUpRight, FileUp, Rss } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { SourceIcon, type SourceType } from "./source-icon";
import { links } from "@/lib/content";

const integrations: {
  name: string;
  type?: SourceType;
  x: number;
  y: number;
  description: string;
  anchor: string;
  action: string;
}[] = [
  {
    name: "Blogs & RSS",
    type: "rss",
    x: 108,
    y: 60,
    description:
      "Follow the blogs and publications you trust, using their RSS feeds.",
    anchor: "sources",
    action: "Connect blogs & RSS",
  },
  {
    name: "YouTube",
    type: "youtube",
    x: 108,
    y: 180,
    description:
      "Bring the channels and creators you follow into your newsletter.",
    anchor: "sources",
    action: "Connect YouTube",
  },
  {
    name: "Podcasts",
    type: "podcast",
    x: 108,
    y: 300,
    description:
      "Follow podcast feeds and turn long conversations into useful insights.",
    anchor: "sources",
    action: "Connect podcasts",
  },
  {
    name: "Newsletters",
    type: "newsletter",
    x: 492,
    y: 60,
    description:
      "Forward email newsletters, including paid Substacks, to Header.",
    anchor: "sources",
    action: "Connect newsletters",
  },
  {
    name: "Reddit",
    type: "reddit",
    x: 492,
    y: 180,
    description: "Follow the conversations in the subreddits you care about.",
    anchor: "sources",
    action: "Connect Reddit",
  },
  {
    name: "X accounts",
    type: "x",
    x: 492,
    y: 300,
    description:
      "Follow original posts from public X accounts. Available on the Pro plan.",
    anchor: "sources",
    action: "Connect X accounts",
  },
  {
    name: "Import OPML",
    x: 108,
    y: 420,
    description:
      "Bring your existing feed collection with you. Import an OPML file to keep your reading routine.",
    anchor: "opml-import",
    action: "Import OPML",
  },
  {
    name: "Connect FreshRSS",
    x: 492,
    y: 420,
    description:
      "Connect your FreshRSS account and bring your existing subscriptions into Header.",
    anchor: "freshrss-import",
    action: "Connect FreshRSS",
  },
];

export function IntegrationsSection() {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? selected;
  const source = integrations[active];
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="integrations section-wrap integrations-interactive"
      id="sources"
      aria-labelledby="sources-title"
    >
      <div className="integrations-centered-heading">
        <h2 id="sources-title">
          Bring your own <em>sources.</em>
        </h2>
        <p>
          Your favorite blogs, podcasts, and newsletters. Together in Header.
        </p>
      </div>
      <div
        className="source-network-board"
        onMouseLeave={() => setHovered(null)}
      >
        <div
          className="interactive-logo-network"
          role="group"
          aria-label="Explore sources and imports"
        >
          <div className="logo-network-dots" aria-hidden="true" />
          <svg
            className="interactive-network-lines"
            viewBox="0 0 600 480"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {integrations.map((item, index) => {
              const path = `M ${item.x} ${item.y} C ${item.x < 300 ? 235 : 365} ${item.y}, ${item.x < 300 ? 235 : 365} 180, 300 180`;
              return (
                <g
                  key={item.name}
                  className={index === active ? "is-active" : ""}
                >
                  <path d={path} />
                  {index === active && !reducedMotion && (
                    <circle r="3" fill="currentColor">
                      <animateMotion
                        path={path}
                        dur="1.7s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>
          {integrations.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={`interactive-source-node${index === active ? " is-active" : ""}`}
              style={{ left: `${item.x / 6}%`, top: `${item.y / 4.8}%` }}
              aria-pressed={selected === index}
              aria-controls="source-network-detail"
              onClick={() => {
                setSelected(index);
                setHovered(null);
              }}
              onMouseEnter={() => setHovered(index)}
              onFocus={() => {
                setSelected(index);
                setHovered(null);
              }}
            >
              <span className="interactive-source-tile">
                {item.type ? (
                  <SourceIcon type={item.type} size={32} />
                ) : index === 6 ? (
                  <FileUp size={32} strokeWidth={1.5} />
                ) : (
                  <Rss size={32} strokeWidth={1.5} />
                )}
                {item.type === "x" && <span className="source-pro">PRO</span>}
              </span>
              <span className="interactive-source-label">{item.name}</span>
            </button>
          ))}
          <div className="interactive-header-node">
            <div>
              <img
                src="/brand/header-logo.png"
                width="64"
                height="64"
                alt="Header"
              />
            </div>
            <span>Header</span>
          </div>
          <p className="network-reading-routine">
            Already have a<br />
            reading routine?
          </p>
        </div>
        <div className="source-network-detail" id="source-network-detail">
          <div>
            <h3>{source.name}</h3>
            <p>{source.description}</p>
          </div>
          <a href={`${links.docs}#${source.anchor}`}>
            {source.action}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <a className="network-discover-link" href={`${links.docs}#api-sources`}>
        Starting from scratch? Let Header find sources for you{" "}
        <ArrowUpRight size={14} />
      </a>
    </section>
  );
}
