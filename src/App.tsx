import { useState } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  Code2,
  Music2,
  TrendingUp,
  Layers,
  Flag,
  ChevronDown,
  Check,
  ArrowDown,
  Rss,
  Users,
} from "lucide-react";
import { MotionConfig } from "framer-motion";
import { Button } from "./components/ui/button";
import { AppearanceSwitch } from "./components/ui/appearance-switch";
import {
  readAppearance,
  useApplyAppearance,
  type Appearance,
} from "./lib/appearance";
import { TopicComposer } from "./components/ui/topic-composer";
import { GatewayFlow } from "./components/ui/gateway-flow";
import { ScrollStory } from "./components/ui/scroll-story";
import { IntegrationsSection } from "./components/ui/integrations-component";
import { Testimonial } from "./components/ui/testimonial-v2";
import { BashTool } from "./components/ui/bash-tool";
import { links, examples } from "./lib/content";

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Header home">
      <img src="/brand/header-logo.png" alt="" width="32" height="32" />
      <span>Header</span>
    </a>
  );
}
function Navigation({
  appearance,
  onAppearance,
}: {
  appearance: Appearance;
  onAppearance: (value: Appearance) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Brand />
        <nav
          className={`main-nav ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <a onClick={() => setOpen(false)} href="#how-it-works">
            How it works
          </a>
          <a onClick={() => setOpen(false)} href="#sources">
            Sources
          </a>
          <a onClick={() => setOpen(false)} href="#explore">
            Explore
          </a>
          <a onClick={() => setOpen(false)} href={links.docs}>
            For developers <ArrowUpRight size={12} />
          </a>
          <a className="mobile-login" href={links.login}>
            Log in
          </a>
        </nav>
        <div className="nav-actions">
          <AppearanceSwitch value={appearance} onChange={onAppearance} />
          <a className="login-link" href={links.login}>
            Log in
          </a>
          <Button asChild size="sm">
            <a href={links.signup}>
              Start for free <ArrowUpRight size={14} />
            </a>
          </Button>
          <button
            className="mobile-menu-toggle icon-button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
    </header>
  );
}
function Explore() {
  return (
    <section
      className="explore-section section-wrap"
      id="explore"
      aria-labelledby="explore-title"
    >
      <div className="section-heading split-heading">
        <div>
          <span className="eyebrow">FOLLOW YOUR CURIOSITY</span>
          <h2 id="explore-title">
            A little more <em>you.</em>
          </h2>
        </div>
        <a className="text-link" href={links.explore}>
          Browse all topics <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="topic-grid">
        {examples.map((e, i) => {
          const Icon = [Code2, Music2, TrendingUp][i];
          return (
            <a key={e.name} className={`topic-card topic-${i}`} href={e.url}>
              <div className="topic-visual" aria-hidden="true">
                {i === 0 ? (
                  <div className="code-art">
                    <span>
                      context <i>→</i> clarity
                    </span>
                    <span className="code-indent">
                      {"{"} curiosity: <em>true</em> {"}"}
                    </span>
                    <span>
                      learn. build. repeat<span className="code-cursor">_</span>
                    </span>
                  </div>
                ) : i === 1 ? (
                  <div className="music-art">
                    {Array.from({ length: 31 }, (_, n) => (
                      <i
                        key={n}
                        style={{
                          height: 22 + Math.abs(Math.sin(n * 0.61)) * 70 + "%",
                          animationDelay: `${n * 0.06}s`,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <svg className="chart-art" viewBox="0 0 280 120">
                    <path
                      d="M0 100H280 M0 65H280 M0 30H280"
                      stroke="currentColor"
                      strokeOpacity=".1"
                    />
                    <path
                      d="M0 103C20 103 20 89 42 91S73 67 97 73S126 49 151 54S183 35 207 40S246 15 280 13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                )}
                <span className="topic-visual-icon">
                  <Icon size={17} />
                </span>
              </div>
              <div className="topic-info">
                <span className="mono-label">{e.label}</span>
                <h3>
                  {e.name} <ArrowUpRight size={19} />
                </h3>
                <p>{e.goal}</p>
                <div className="topic-card-meta">
                  <span>
                    <Rss size={14} aria-hidden="true" />
                    {e.sourceCount} sources
                  </span>
                  <span>
                    <Users size={14} aria-hidden="true" />
                    {e.subscriberCount} subscribers
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
function MoreWays() {
  return (
    <section className="more-ways section-wrap">
      <div className="section-heading">
        <span className="eyebrow">BEYOND THE INBOX</span>
        <h2>
          Good information.
          <br />
          <em>Put to good use.</em>
        </h2>
      </div>
      <div className="feature-row">
        <div className="feature-copy">
          <div className="feature-icon">
            <Layers size={22} />
          </div>
          <h3>
            Close the tabs.
            <br />
            Keep the good parts.
          </h3>
          <p>
            That pile of links you meant to read? Turn up to 100 into one
            newsletter. Or grab your open tabs with the Chrome extension.
          </p>
          <a className="text-link" href={links.clearTabs}>
            Meet Clear Tabs <ArrowUpRight size={16} />
          </a>
        </div>
        <div
          className="tabs-art"
          aria-label="Illustration of open tabs becoming a reading list"
        >
          <div className="stacked-tab tab-back">
            <span />
            <span>That article you saved…</span>
            <X size={13} />
          </div>
          <div className="stacked-tab tab-middle">
            <span />
            <span>The podcast for later…</span>
            <X size={13} />
          </div>
          <div className="stacked-tab tab-front">
            <img src="/brand/header-logo.png" alt="" width="18" height="18" />
            <span>Everything worth keeping.</span>
            <Check size={15} />
          </div>
          <div className="reading-lines">
            <span />
            <span />
            <span />
          </div>
          <span className="tabs-art-caption">
            A FRESH START FOR YOUR BROWSER
          </span>
        </div>
      </div>
      <div className="feature-row feature-row-second">
        <div className="feature-copy">
          <div className="feature-icon">
            <Flag size={22} />
          </div>
          <h3>
            From “interesting”
            <br />
            to <em>“I tried it.”</em>
          </h3>
          <p>
            Save the recommendations you want to act on. Header’s follow-ups
            help you keep track of what happens next.
          </p>
          <a className="text-link" href={links.followups}>
            Explore follow-ups <span className="pro-label">BETA</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="followup-art">
          <span className="mono-label">YOUR NEXT SMALL STEP</span>
          <div>
            <span className="check-square">
              <Check size={15} />
            </span>
            <span>Read something that changes your mind.</span>
          </div>
          <div>
            <span className="empty-square" />
            <span>Try one thing you learned.</span>
          </div>
          <div>
            <span className="empty-square" />
            <span>Keep what works.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
const faqs = [
  {
    q: "What does Header actually do?",
    a: "You choose your sources and describe what you want to learn. Header filters new content through your goal, then writes a newsletter that connects the useful ideas across those sources. Each issue links back to the originals.",
  },
  {
    q: "Can I bring the sources I already follow?",
    a: "Yes. Add RSS feeds, websites that advertise a feed, YouTube channels, podcasts, and subreddits. Forward newsletters to a dedicated email address, import an OPML file, or connect FreshRSS. Public X accounts are available on Pro.",
  },
  {
    q: "Do I have to create my own topic?",
    a: "No. You can browse curated public topics and subscribe. When you want a different perspective, customize a topic around your own goal and sources.",
  },
  {
    q: "How often will I get a newsletter?",
    a: "You choose the schedule for your goal, such as daily or weekly. You can also generate a newsletter on demand within your plan’s limits.",
  },
  {
    q: "How much does it cost?",
    a: "You can start with a 15-day free trial, with no credit card required. Pro is $10 per month after the trial. See Header for current plan details and limits.",
  },
];
function FAQ() {
  return (
    <section className="faq-section section-wrap" aria-labelledby="faq-title">
      <div>
        <span className="eyebrow">A FEW THINGS TO KNOW</span>
        <h2 id="faq-title">
          Glad you <em>asked.</em>
        </h2>
        <a className="text-link" href={links.docs}>
          More in the docs <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="faq-list">
        {faqs.map((f) => (
          <details key={f.q}>
            <summary>
              {f.q}
              <ChevronDown size={17} />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="site-footer section-wrap">
      <div className="footer-main">
        <div>
          <Brand />
          <p>Your sources. Your goals. Your time.</p>
        </div>
        <div className="footer-links">
          <div>
            <span className="mono-label">PRODUCT</span>
            <a href={links.explore}>Explore topics</a>
            <a href="/dashboard/">Try the demo workspace</a>
            <a href={links.clearTabs}>Clear Tabs</a>
            <a href={links.docs}>Documentation</a>
          </div>
          <div>
            <span className="mono-label">HEADER</span>
            <a href="https://joinheader.com/about">About us</a>
            <a href="https://joinheader.com/blog">Journal</a>
            <a href="https://discord.com/invite/C8nmTYhuye">
              Discord <ArrowUpRight size={11} />
            </a>
          </div>
          <div>
            <span className="mono-label">ELSEWHERE</span>
            <a href="https://x.com/joinheader">
              X / Twitter <ArrowUpRight size={11} />
            </a>
            <a href="https://joinheader.com/privacy-policy">Privacy policy</a>
            <a href="https://joinheader.com/terms-of-service">
              Terms of service
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Header. All rights reserved.</span>
        <img
          src="/brand/google-startup-badge.png"
          width="1132"
          height="984"
          alt="Google for Startups Cloud Program"
        />
      </div>
      <p className="concept-note">
        Independent concept redesign for educational and portfolio purposes. Not
        affiliated with Header Inc. Brand assets belong to their respective
        owners.
      </p>
    </footer>
  );
}
export default function App() {
  const [appearance, setAppearance] = useState(() => readAppearance());
  useApplyAppearance(appearance);
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <Navigation appearance={appearance} onAppearance={setAppearance} />
      <main id="main">
        <section className="hero section-wrap" aria-labelledby="hero-heading">
          <div className="hero-grain" aria-hidden="true" />
          <span className="eyebrow hero-eyebrow">
            <span className="tiny-mark" /> A NEWSLETTER SHAPED AROUND YOU
          </span>
          <h1 id="hero-heading">
            Take back your attention.
            <br />
            <em>Spend it yourself.</em>
          </h1>
          <p className="hero-description">
            Tell Header what matters and what to skip. Add your sources.
          </p>
          <TopicComposer />
          <div className="hero-bottom">
            <a href="#how-it-works">
              See how it works <ArrowDown size={13} />
            </a>
            <a href="/dashboard/">
              Try the dashboard <ArrowUpRight size={13} />
            </a>
          </div>
        </section>
        <div className="source-ribbon" hidden>
          <div className="section-wrap ribbon-inner">
            <span>BUILT AROUND YOUR CURIOSITY</span>
            <span>Blogs</span>
            <span className="ribbon-star">✳</span>
            <span>Podcasts</span>
            <span className="ribbon-star">✳</span>
            <span>Newsletters</span>
            <span className="ribbon-star">✳</span>
            <span>YouTube</span>
            <span className="ribbon-star">✳</span>
            <span>And your next obsession.</span>
          </div>
        </div>
        <ScrollStory />
        <div id="how-it-works">
          <GatewayFlow />
        </div>
        <IntegrationsSection />
        <Explore />
        <MoreWays />
        <Testimonial />
        <section
          className="terminal-signup-section section-wrap"
          id="get-started"
          aria-labelledby="terminal-signup-title"
        >
          <BashTool />
        </section>
        <FAQ />
      </main>
      <Footer />
    </MotionConfig>
  );
}
