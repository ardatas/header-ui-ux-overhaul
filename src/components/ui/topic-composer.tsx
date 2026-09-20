import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Plus,
  X,
  ArrowUp,
  Check,
  Copy,
  Link2,
  Code2,
  Music2,
  TrendingUp,
  FileUp,
} from "lucide-react";
import { Button } from "./button";
import { SourceIcon, type SourceType } from "./source-icon";
import { examples, links } from "@/lib/content";

const sourceOptions: { name: string; type: SourceType }[] = [
  { name: "RSS feed or website", type: "rss" },
  { name: "YouTube channel", type: "youtube" },
  { name: "Podcast feed", type: "podcast" },
  { name: "Newsletter", type: "newsletter" },
  { name: "Subreddit", type: "reddit" },
  { name: "X account · Pro", type: "x" },
];

export function TopicComposer() {
  const [goal, setGoal] = useState("");
  const [menu, setMenu] = useState(false);
  const [sourceType, setSourceType] = useState<SourceType | null>(null);
  const [sourceValue, setSourceValue] = useState("");
  const [sources, setSources] = useState<{ name: string; type: SourceType }[]>(
    [],
  );
  const [copied, setCopied] = useState(false);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    function dismiss(e: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenu(false);
    }
    function escape(e: KeyboardEvent) {
      if (e.key === "Escape") setMenu(false);
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  useEffect(() => {
    if (textarea.current) {
      textarea.current.style.height = "auto";
      textarea.current.style.height = `${Math.min(150, Math.max(66, textarea.current.scrollHeight))}px`;
    }
  }, [goal]);

  const copyDraft = async () => {
    const draft = `${goal}${sources.length ? "\n\nSources:\n" + sources.map((s) => s.name).join("\n") : ""}`;
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="composer-area">
      <form
        className="composer"
        onSubmit={(e) => {
          e.preventDefault();
          if (goal.trim()) {
            setCopied(false);
            dialog.current?.showModal();
          }
        }}
      >
        <label className="sr-only" htmlFor="topic-goal">
          What do you want to keep up with?
        </label>
        <textarea
          id="topic-goal"
          ref={textarea}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. Keep me up to date on practical AI coding techniques. Focus on real examples and skip product-launch hype."
          maxLength={2000}
          rows={2}
          required
        />
        {sources.length > 0 && (
          <div className="attached-sources">
            {sources.map((s, i) => (
              <span key={`${s.name}-${i}`}>
                <SourceIcon type={s.type} size={13} />
                <span>{s.name}</span>
                <button
                  type="button"
                  aria-label={`Remove ${s.name}`}
                  onClick={() => setSources(sources.filter((_, j) => i !== j))}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="composer-toolbar">
          <div className="source-menu-anchor" ref={menuRef}>
            <button
              type="button"
              className="attach-button"
              aria-expanded={menu}
              aria-controls="source-menu"
              onClick={() => setMenu(!menu)}
            >
              <Plus size={17} /> Add sources
            </button>
            {menu && (
              <div className="source-menu" id="source-menu">
                <span className="mono-label">BRING WHAT YOU FOLLOW</span>
                {sourceOptions.map((option) => (
                  <button
                    type="button"
                    key={option.type}
                    onClick={() => {
                      setSourceType(option.type);
                      setMenu(false);
                      setSourceValue("");
                    }}
                  >
                    <SourceIcon type={option.type} size={17} />
                    {option.name}
                    <Plus size={13} />
                  </button>
                ))}
                <a href="https://app.joinheader.com/imports/opml">
                  <FileUp size={17} /> Import OPML on Header{" "}
                  <ArrowUpRight size={13} />
                </a>
                <a href={`${links.docs}#freshrss-import`}>
                  <RssSmall /> Connect FreshRSS <ArrowUpRight size={13} />
                </a>
              </div>
            )}
          </div>
          <span className="composer-helper">Your curiosity. Your rules.</span>
          <Button
            size="icon"
            type="submit"
            disabled={!goal.trim()}
            aria-label="Create my topic"
          >
            <ArrowUp size={20} />
          </Button>
        </div>
      </form>
      {sourceType && (
        <form
          className="source-entry"
          onSubmit={(e) => {
            e.preventDefault();
            if (sourceValue.trim()) {
              setSources([
                ...sources,
                { name: sourceValue.trim(), type: sourceType },
              ]);
              setSourceType(null);
            }
          }}
        >
          <SourceIcon type={sourceType} />
          <label className="sr-only" htmlFor="source-url">
            Source URL
          </label>
          <input
            autoFocus
            id="source-url"
            type="url"
            required
            placeholder={
              sourceType === "newsletter"
                ? "Newsletter website URL"
                : "https://…"
            }
            value={sourceValue}
            onChange={(e) => setSourceValue(e.target.value)}
          />
          <Button size="sm" type="submit">
            Add
          </Button>
          <button
            className="icon-button"
            type="button"
            aria-label="Cancel adding source"
            onClick={() => setSourceType(null)}
          >
            <X size={18} />
          </button>
        </form>
      )}
      <div className="suggestions">
        <span>Try a topic</span>
        {examples.map((example, i) => {
          const Icon = [Code2, Music2, TrendingUp][i];
          return (
            <button
              key={example.name}
              onClick={() => {
                setGoal(example.goal);
                textarea.current?.focus();
              }}
            >
              <Icon size={18} />
              {example.name}
            </button>
          );
        })}
      </div>
      <dialog
        ref={dialog}
        className="draft-dialog"
        aria-labelledby="draft-title"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="dialog-heading">
          <span className="mono-label">YOUR NEXT CHAPTER</span>
          <button
            className="icon-button"
            aria-label="Close topic draft"
            onClick={() => dialog.current?.close()}
          >
            <X size={20} />
          </button>
        </div>
        <h2 id="draft-title">
          Make it <em>your own.</em>
        </h2>
        <p>
          Create your account on Header to set up this topic. Copy your draft to
          take it with you.
        </p>
        <div className="draft-content">
          <p>{goal}</p>
          {sources.length > 0 && (
            <ul>
              {sources.map((s, i) => (
                <li key={i}>{s.name}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="dialog-actions">
          <Button variant="outline" onClick={copyDraft}>
            {copied ? <Check size={16} /> : <Copy size={16} />}{" "}
            {copied ? "Draft copied" : "Copy draft"}
          </Button>
          <Button asChild>
            <a href={links.signup}>
              Start for free <ArrowUpRight size={16} />
            </a>
          </Button>
        </div>
        <p className="dialog-footnote">
          Already have an account? <a href={links.login}>Log in</a>
        </p>
      </dialog>
    </div>
  );
}
function RssSmall() {
  return <Link2 size={17} />;
}
