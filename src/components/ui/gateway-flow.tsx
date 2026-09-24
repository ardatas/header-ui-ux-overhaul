import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  SlidersHorizontal,
  ChevronRight,
  Check,
  Minus,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { examples } from "@/lib/content";
import { SourceIcon, type SourceType } from "./source-icon";
import { FlowStreams } from "./flow-streams";

// Colors copied from the original website's source diagram.
const sources: { label: string; type: SourceType; color: string }[] = [
  { label: "YouTube", type: "youtube", color: "#EF4444" },
  { label: "RSS feeds", type: "rss", color: "#F59E0B" },
  { label: "Blogs", type: "web", color: "#94A3B8" },
  { label: "Podcasts", type: "podcast", color: "#A78BFA" },
  { label: "Newsletters", type: "newsletter", color: "#34D399" },
  { label: "Reddit", type: "reddit", color: "#60A5FA" },
  { label: "X accounts", type: "x", color: "var(--text-primary)" },
];
const filters = [
  { include: "Practical patterns & lessons", exclude: "Model launches & hype" },
  {
    include: "Indie, alternative & electronic",
    exclude: "Music outside your taste",
  },
  {
    include: "Simple, long-term foundations",
    exclude: "Complex trading strategies",
  },
];
const EXAMPLE_HOLD_MS = 10_000;
const EXAMPLE_FADE_MS = 350;

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flow-step-heading">
      <span>{number}</span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export function GatewayFlow() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const [autoRotate, setAutoRotate] = useState(true);
  const [changing, setChanging] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const advance = useCallback(() => {
    if (transitionTimer.current !== null) return;
    if (reducedMotion) {
      setIndex((current) => (current + 1) % examples.length);
      return;
    }
    setChanging(true);
    transitionTimer.current = setTimeout(() => {
      setIndex((current) => (current + 1) % examples.length);
      setChanging(false);
      transitionTimer.current = null;
    }, EXAMPLE_FADE_MS);
  }, [reducedMotion]);

  // Match the original site's cadence and stop autoplay after manual selection.
  useEffect(() => {
    if (!autoRotate || reducedMotion) return;
    const timer = setInterval(advance, EXAMPLE_HOLD_MS + EXAMPLE_FADE_MS);
    return () => clearInterval(timer);
  }, [advance, autoRotate, reducedMotion]);

  useEffect(
    () => () => {
      if (transitionTimer.current !== null)
        clearTimeout(transitionTimer.current);
    },
    [],
  );

  const diagram = useRef<HTMLDivElement>(null);
  const example = examples[index];
  const filter = filters[index];

  return (
    <section
      className="flow-section section-wrap"
      aria-labelledby="flow-title"
    >
      <div className="section-heading centered">
        <span className="eyebrow">A LITTLE FOCUS CHANGES EVERYTHING</span>
        <h2 id="flow-title">
          Many sources. <br className="mobile-only" />
          <em>One clear perspective.</em>
        </h2>
      </div>
      <div className="source-flow-v2" ref={diagram}>
        <FlowStreams container={diagram} />
        <div className="flow-stage flow-input-stage">
          <Step
            number="01"
            title="Your sources"
            description="Choose who you trust."
          />
          <div className="flow-source-list">
            {sources.map((s) => (
              <div key={s.type} className="flow-source-item">
                <span style={{ color: s.color }}>
                  <SourceIcon type={s.type} size={18} />
                </span>
                <span>{s.label}</span>
                {s.type === "x" && <small>PRO</small>}
              </div>
            ))}
          </div>
        </div>
        <div className="flow-mobile-transition">
          <ArrowDown size={20} />
          <span>Filtered through your goal</span>
        </div>
        <div className="flow-stage flow-filter-stage">
          <Step
            number="02"
            title="Your goal"
            description="Tell Header what matters."
          />
          <div className="goal-filter">
            <div className="filter-icon">
              <SlidersHorizontal size={21} />
            </div>
            <div
              key={index}
              className={`flow-topic-swap${changing ? " is-changing" : ""}`}
            >
              <div className="goal-body">
                <span className="mono-label">I WANT TO KEEP UP WITH</span>
                <h3>{example.name}</h3>
                <p>{example.goal}</p>
              </div>
              <div className="filter-decisions">
                <div>
                  <Check size={14} />
                  <span>Keep: {filter.include}</span>
                </div>
                <div>
                  <Minus size={14} />
                  <span>Skip: {filter.exclude}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            className="next-example"
            onClick={() => {
              setAutoRotate(false);
              advance();
            }}
          >
            Try another goal <ChevronRight size={14} />
            <span>
              {index + 1} / {examples.length}
            </span>
          </button>
        </div>
        <div className="flow-mobile-transition">
          <ArrowDown size={20} />
          <span>Synthesized into your newsletter</span>
        </div>
        <div className="flow-stage flow-output-stage">
          <Step
            number="03"
            title="Your newsletter"
            description="Know what to do next."
          />
          <article
            className="newsletter-preview"
            aria-live={autoRotate && !reducedMotion ? "off" : "polite"}
          >
            <div className="newsletter-top">
              <img src="/brand/header-logo.png" width="24" height="24" alt="" />
              <span>YOUR WEEKLY HEADER</span>
              <span>3 MIN</span>
            </div>
            <div
              key={index}
              className={`newsletter-body flow-topic-swap${changing ? " is-changing" : ""}`}
            >
              <h3>{example.title}</h3>
              <div className="newsletter-entry">
                <span className="mono-label">WHAT’S NEW</span>
                <p>{example.news}</p>
              </div>
              <div className="newsletter-entry">
                <span className="mono-label">WHY IT MATTERS</span>
                <p>{example.matters}</p>
              </div>
              <div className="newsletter-action">
                <span className="mono-label">WHAT TO DO</span>
                <p>{example.action}</p>
              </div>
            </div>
            <a href={example.url}>
              Explore this topic <ArrowUpRight size={14} />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
