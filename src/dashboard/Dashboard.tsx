import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Compass,
  Copy,
  Ellipsis,
  FileText,
  Flag,
  History,
  Home,
  Layers,
  ListFilter,
  LoaderCircle,
  Menu,
  PanelRightClose,
  PanelRightOpen,
  Plus,
  Search,
  Settings2,
  Share2,
  Sparkles,
  Trash2,
  X,
  Bookmark,
  RotateCcw,
  Rss,
  SlidersHorizontal,
} from "lucide-react";
import { useApplyAppearance } from "../lib/appearance";
import { SourceIcon } from "../components/ui/source-icon";
import {
  content,
  createMockNewsletter,
  dateLabel,
  issueTitles,
  loadDemo,
  saveDemo,
  uid,
  type Demo,
  type Issue,
  type Source,
  type Topic,
} from "./data";
import { Modal, Empty, TopicMark } from "./ui";
import { NewsletterBody } from "./NewsletterBody";
import { TopicForm, NewTopic, SourceForm } from "./forms";
import {
  HomePage,
  ExplorePage,
  SourcesPage,
  FollowupsPage,
  SettingsPage,
  ClearTabsPage,
} from "./pages";
import "./dashboard.css";

type Job = { started: number; topic: Topic; fail: boolean };
const navItems = [
  { id: "home", label: "Overview", icon: Home },
  { id: "explore", label: "Explore", icon: Compass },
  { id: "sources", label: "Sources", icon: Rss },
  { id: "clear-tabs", label: "Clear Tabs", icon: Layers },
  { id: "follow-ups", label: "Follow-ups", icon: Flag },
];
export default function Dashboard() {
  const [demo, setDemo] = useState<Demo>(loadDemo);
  useApplyAppearance(demo.appearance);
  const [route, setRoute] = useState(
    () => window.location.hash.slice(1) || "topic/agentic-coding",
  );
  const [mobile, setMobile] = useState(false);
  const [narrow, setNarrow] = useState(() => window.innerWidth <= 800);
  const [inspector, setInspector] = useState(() => window.innerWidth > 1100);
  const [modal, setModal] = useState<
    | "new"
    | "settings"
    | "search"
    | "source"
    | "share"
    | "transparency"
    | "delete"
    | "help"
    | "save-text"
    | null
  >(null);
  const [preview, setPreview] = useState<Source | null>(null);
  const [tab, setTab] = useState("newsletter");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [notices, setNotices] = useState<Record<string, string>>({});
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [savedText, setSavedText] = useState("");
  const [saveKind, setSaveKind] = useState<"capture" | "followup">("capture");
  const [jobs, setJobs] = useState<Record<string, Job>>({});
  const [now, setNow] = useState(Date.now());
  const [failures, setFailures] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const reader = useRef<HTMLDivElement>(null);
  const composer = useRef<HTMLTextAreaElement>(null);
  const topicId = route.startsWith("topic/") ? route.slice(6) : null;
  const topic = demo.topics.find((t) => t.id === topicId);
  const draft = topicId ? drafts[topicId] || "" : "";
  const notice = topicId ? notices[topicId] || "" : "";
  const setDraft = (value: string) => {
    if (topicId) setDrafts((saved) => ({ ...saved, [topicId]: value }));
  };
  const setNotice = (value: string) => {
    if (topicId) setNotices((saved) => ({ ...saved, [topicId]: value }));
  };
  const issues = demo.issues
    .filter((i) => i.topicId === topicId)
    .sort((a, b) => b.date.localeCompare(a.date));
  const issue = issues.find((i) => i.id === selectedIssue) || issues[0];
  const sources = demo.sources.filter((s) =>
    (issue && tab === "newsletter"
      ? issue.sourceIds
      : topic?.sourceIds || []
    ).includes(s.id),
  );
  const topicSources = demo.sources.filter((s) =>
    topic?.sourceIds.includes(s.id),
  );
  const currentJob = topicId ? jobs[topicId] : undefined;
  const stage = currentJob
    ? Math.max(0, Math.min(2, Math.floor((now - currentJob.started) / 1600)))
    : -1;
  const pageTitle =
    topic?.name ||
    navItems.find((n) => n.id === route)?.label ||
    (route === "settings" ? "Settings" : "Workspace");
  const navigate = (path: string) => {
    window.location.hash = path;
    setMobile(false);
  };
  const notify = (text: string) => setToast(text);
  const updateTopic = (next: Topic) => {
    setDemo((d) => ({
      ...d,
      topics: d.topics.map((t) => (t.id === next.id ? next : t)),
    }));
  };
  useEffect(() => saveDemo(demo), [demo]);
  useEffect(() => {
    const resize = () => {
      setNarrow(window.innerWidth <= 800);
      if (window.innerWidth > 800) setMobile(false);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => {
    if (mobile)
      document.querySelector<HTMLAnchorElement>(".hd-sidebar a")?.focus();
  }, [mobile]);
  useEffect(() => {
    document.title = "Your workspace · Header";
    const change = () => {
      setRoute(window.location.hash.slice(1) || "topic/agentic-coding");
      setSelectedIssue("");
      setTab("newsletter");
      setMobile(false);
      reader.current?.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (!Object.keys(jobs).length) return;
    const timer = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [jobs]);
  useEffect(() => {
    const finished = Object.entries(jobs).filter(
      ([, job]) => now - job.started >= 5200,
    );
    if (!finished.length) return;
    for (const [id, job] of finished) {
      if (job.fail)
        setFailures((f) => ({
          ...f,
          [id]: "This demo run could not finish. Your previous issues are safe. Try again.",
        }));
      else {
        const next: Issue = {
          id: uid(),
          topicId: id,
          date: new Date().toISOString(),
          title: issueTitles[job.topic.kind][0],
          markdown: createMockNewsletter(job.topic, demo.sources),
          goal: job.topic.goal,
          sections: [...job.topic.sections],
          sourceIds: [...job.topic.sourceIds],
          public: false,
          length: job.topic.length,
        };
        setDemo((d) => ({ ...d, issues: [next, ...d.issues] }));
        if (id === topicId) {
          setSelectedIssue(next.id);
          setTab("newsletter");
          reader.current?.scrollTo({ top: 0 });
        }
        notify(`${job.topic.name}: your demo newsletter is ready.`);
      }
    }
    setJobs((j) =>
      Object.fromEntries(
        Object.entries(j).filter(
          ([id]) => !finished.some(([key]) => key === id),
        ),
      ),
    );
  }, [now, jobs, topicId]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setModal("search");
      }
      if (event.key === "Escape") setMobile(false);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  function generate(retry = false) {
    if (!topic || currentJob) return;
    if (demo.plan === "Free" || demo.outcome === "limit") {
      notify(
        "Generation is unavailable in this demo plan state. Change it in Settings → Demo controls.",
      );
      return;
    }
    if (!topic.sourceIds.length) {
      notify("Add at least one source before generating a newsletter.");
      setModal("settings");
      return;
    }
    setFailures((f) => ({ ...f, [topic.id]: "" }));
    setNow(Date.now());
    setJobs((j) => ({
      ...j,
      [topic.id]: {
        started: Date.now(),
        topic: structuredClone(topic),
        fail: !retry && demo.outcome === "failure",
      },
    }));
    setTab("newsletter");
  }
  function refine() {
    if (!topic || !draft.trim()) return;
    updateTopic({
      ...topic,
      goal: `${topic.goal}\n\nRefinement: ${draft.trim()}`,
    });
    setNotice(
      `Goal for ${topic.name} updated: “${draft.trim()}” Applies to future newsletters${currentJob ? "; this run keeps its original goal" : ""}.`,
    );
    setDraft("");
  }
  function saveItem(title: string, kind: "followup" | "capture") {
    if (!topic) return;
    if (demo.followups.some((f) => f.title === title && f.kind === kind)) {
      notify("Already saved in Follow-ups.");
      return;
    }
    setDemo((d) => ({
      ...d,
      followups: [
        ...d.followups,
        { id: uid(), title, topic: topic.name, kind, done: false },
      ],
    }));
    notify(
      kind === "capture"
        ? "Insight saved to Captured."
        : "Added to your follow-ups.",
    );
  }
  function openSaveText(kind: "capture" | "followup") {
    const selection = window.getSelection();
    const body = reader.current?.querySelector(".hd-generated-text");
    setSavedText(
      selection &&
        body?.contains(selection.anchorNode) &&
        body.contains(selection.focusNode)
        ? selection.toString().trim().slice(0, 4000)
        : "",
    );
    setSaveKind(kind);
    setModal("save-text");
  }
  async function copyShare() {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/dashboard#topic/${topic?.id}`,
      );
      setCopied(true);
    } catch {
      notify("Clipboard unavailable. Select and copy the link below.");
    }
  }
  const openIssue = (id: string) => {
    setSelectedIssue(id);
    reader.current?.scrollTo({ top: 0 });
  };
  const addSource = (source: Source) => {
    setDemo((d) => ({
      ...d,
      sources: [...d.sources, source],
      topics: d.topics.map((t) =>
        t.id === topicId ? { ...t, sourceIds: [...t.sourceIds, source.id] } : t,
      ),
    }));
    setModal(null);
    notify(
      topic ? "Source added to this topic." : "Source added to your library.",
    );
  };
  const saveTopic = (t: Topic) => {
    updateTopic(t);
    setModal(null);
    notify("Topic settings saved for future newsletters.");
  };
  const newTopic = (t: Topic) => {
    setDemo((d) => ({ ...d, topics: [...d.topics, t] }));
    setModal(null);
    navigate(`topic/${t.id}`);
    notify("Your topic is ready. Generate its first demo newsletter.");
  };
  return (
    <div
      className={`hd-app ${mobile ? "hd-nav-open" : ""}`}
      data-theme={demo.appearance}
    >
      <a
        href="#hd-main"
        className="hd-skip"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("hd-main")?.focus();
        }}
      >
        Skip to workspace
      </a>
      {mobile && (
        <button
          className="hd-nav-scrim"
          aria-label="Close navigation"
          onClick={() => setMobile(false)}
        />
      )}
      <aside
        className="hd-sidebar"
        aria-label="Workspace navigation"
        inert={narrow && !mobile}
      >
        <a className="hd-brand" href="/">
          <img src="/brand/header-logo.png" width="29" height="29" alt="" />
          <span>Header</span>
        </a>
        <button className="hd-new" onClick={() => setModal("new")}>
          <Plus size={17} /> New topic <span>↗</span>
        </button>
        <button className="hd-search" onClick={() => setModal("search")}>
          <Search size={16} /> Search workspace <kbd>⌘ K</kbd>
        </button>
        <nav className="hd-main-nav">
          {navItems.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className={route === id ? "active" : ""}
              aria-current={route === id ? "page" : undefined}
              onClick={() => setMobile(false)}
            >
              <Icon size={17} />
              {label}
              {id === "follow-ups" && (
                <span className="hd-count">
                  {
                    demo.followups.filter(
                      (f) => f.kind === "followup" && !f.done,
                    ).length
                  }
                </span>
              )}
            </a>
          ))}
        </nav>
        <div className="hd-topics-list">
          <div className="hd-nav-label">
            YOUR TOPICS
            <button
              className="hd-icon"
              aria-label="Create topic"
              onClick={() => setModal("new")}
            >
              <Plus size={13} />
            </button>
          </div>
          {demo.topics
            .filter((t) => t.owned)
            .map((t) => (
              <a
                key={t.id}
                href={`#topic/${t.id}`}
                className={`hd-topic-link ${topicId === t.id ? "active" : ""}`}
                aria-current={topicId === t.id ? "page" : undefined}
                onClick={() => setMobile(false)}
              >
                <TopicMark kind={t.kind} small />
                <span>{t.name}</span>
                {jobs[t.id] ? (
                  <LoaderCircle size={12} className="hd-spin" />
                ) : (
                  topicId === t.id && <i />
                )}
              </a>
            ))}
          <div className="hd-nav-label hd-sub-label">FOLLOWING</div>
          {demo.topics
            .filter((t) => !t.owned)
            .map((t) => (
              <a
                key={t.id}
                className={`hd-topic-link ${topicId === t.id ? "active" : ""}`}
                href={`#topic/${t.id}`}
                onClick={() => setMobile(false)}
              >
                <TopicMark kind={t.kind} small />
                <span>{t.name}</span>
              </a>
            ))}
          {!demo.topics.some((t) => !t.owned) && (
            <a href="#explore" className="hd-muted-link">
              Find something to follow <ArrowRight size={13} />
            </a>
          )}
        </div>
        <div className="hd-sidebar-bottom">
          <div className="hd-demo-note">
            <span className="hd-live-dot" /> A little room for curiosity.
            <p>Demo workspace · saved on this browser</p>
          </div>
          <a
            href="#settings"
            className={`hd-account ${route === "settings" ? "active" : ""}`}
          >
            <span className="hd-avatar">JD</span>
            <span>
              Jamie’s workspace<small>{demo.plan} demo</small>
            </span>
            <Settings2 size={16} />
          </a>
        </div>
      </aside>
      <div className="hd-body" inert={narrow && mobile}>
        <header className="hd-topbar">
          <div className="hd-breadcrumb">
            <button
              className="hd-icon hd-mobile-toggle"
              aria-label="Open navigation"
              aria-expanded={mobile}
              onClick={() => setMobile(!mobile)}
            >
              <Menu size={20} />
            </button>
            <span className="hd-breadcrumb-home">Workspace</span>
            <ChevronRight className="hd-breadcrumb-home" size={13} />
            <span>{pageTitle}</span>
          </div>
          <div className="hd-top-actions">
            <span className="hd-demo-badge">DEMO</span>
            <button
              className="hd-icon"
              aria-label="How this demo works"
              onClick={() => setModal("help")}
            >
              <CircleHelp size={17} />
            </button>
            {topic && (
              <button
                className="hd-icon"
                aria-label={
                  inspector ? "Hide issue context" : "Show issue context"
                }
                aria-pressed={inspector}
                onClick={() => setInspector(!inspector)}
              >
                {inspector ? (
                  <PanelRightClose size={18} />
                ) : (
                  <PanelRightOpen size={18} />
                )}
              </button>
            )}
          </div>
        </header>
        <main id="hd-main" tabIndex={-1} className="hd-main">
          {topic ? (
            <div
              className={`hd-workspace ${inspector ? "" : "hd-no-inspector"}`}
            >
              <div className="hd-reading-column">
                <div className="hd-topic-bar">
                  <div className="hd-topic-title">
                    <TopicMark kind={topic.kind} />
                    <div>
                      <h1>{topic.name}</h1>
                      <span>
                        {topic.owned
                          ? topic.schedule
                            ? topic.cadence.startsWith("Weekly · ")
                              ? `Newsletter every ${topic.cadence.split(" · ")[1]}`
                              : "Newsletter every morning"
                            : "Newsletter on demand"
                          : "Following this newsletter"}{" "}
                        <i>·</i> {topicSources.length}{" "}
                        {topicSources.length === 1 ? "source" : "sources"}
                      </span>
                    </div>
                  </div>
                  <div className="hd-topic-buttons">
                    {topic.owned ? (
                      <>
                        <button
                          className="hd-icon"
                          aria-label="Topic settings"
                          onClick={() => setModal("settings")}
                        >
                          <SlidersHorizontal size={17} />
                        </button>
                        <button
                          className="hd-btn hd-btn-primary"
                          disabled={!!currentJob}
                          onClick={() => generate()}
                        >
                          {currentJob ? (
                            <LoaderCircle size={14} className="hd-spin" />
                          ) : (
                            <Sparkles size={14} />
                          )}
                          <span>
                            {currentJob ? "Generating…" : "Generate newsletter"}
                          </span>
                        </button>
                      </>
                    ) : (
                      <button
                        className="hd-btn"
                        onClick={() => {
                          newTopic({
                            ...topic,
                            id: uid(),
                            name: `${topic.name} · my version`,
                            owned: true,
                            public: false,
                          });
                        }}
                      >
                        Customize topic <Plus size={14} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="hd-reader-toolbar">
                  <div
                    className="hd-tabs"
                    role="tablist"
                    aria-label="Topic views"
                  >
                    {["newsletter", "feed", "goal"].map((value) => (
                      <button
                        key={value}
                        role="tab"
                        aria-selected={tab === value}
                        onClick={() => setTab(value)}
                      >
                        {value === "newsletter"
                          ? "Newsletters"
                          : value === "feed"
                            ? "Source feed"
                            : "Your goal"}
                        {value === "newsletter" && <span>{issues.length}</span>}
                      </button>
                    ))}
                  </div>
                  {issues.length > 0 && tab === "newsletter" && (
                    <label className="hd-issue-select">
                      <History size={13} />
                      <span className="sr-only">Choose newsletter</span>
                      <select
                        aria-label="Choose newsletter"
                        value={issue?.id}
                        onChange={(e) => openIssue(e.target.value)}
                      >
                        {issues.map((i) => (
                          <option value={i.id} key={i.id}>
                            {dateLabel(i.date)}
                            {i.id === issues[0].id ? " · Latest" : ""}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={12} />
                    </label>
                  )}
                </div>
                <div className="hd-reader-scroll" ref={reader}>
                  {currentJob && (
                    <div className="hd-generating" role="status">
                      <div>
                        <LoaderCircle size={17} className="hd-spin" />
                        <strong>
                          {
                            [
                              "Gathering your sources",
                              "Filtering through your goal",
                              "Writing your newsletter",
                            ][stage]
                          }
                        </strong>
                        <span>Simulated demo</span>
                      </div>
                      <div className="hd-run-steps">
                        {["Sources", "Goal filter", "Newsletter"].map(
                          (s, n) => (
                            <span
                              key={s}
                              className={n <= stage ? "active" : ""}
                            >
                              {n < stage ? <Check size={12} /> : <i />}
                              {s}
                            </span>
                          ),
                        )}
                      </div>
                      <p>
                        You can keep reading or switch topics. We’ll let you
                        know when it’s ready.
                      </p>
                    </div>
                  )}
                  {topicId && failures[topicId] && (
                    <div className="hd-error" role="alert">
                      {failures[topicId]}
                      <button
                        className="hd-link"
                        onClick={() => generate(true)}
                      >
                        Retry generation <RotateCcw size={13} />
                      </button>
                    </div>
                  )}
                  {tab === "newsletter" &&
                    (issue ? (
                      <article className="hd-newsletter" key={issue.id}>
                        <div className="hd-issue-eyebrow">
                          <span className="hd-live-dot" /> YOUR PERSONAL
                          NEWSLETTER{" "}
                          <span className="hd-edition">
                            {dateLabel(issue.date)}
                          </span>
                        </div>
                        <h2>{issue.title}</h2>
                        <p className="hd-issue-deck">
                          Useful ideas, selected around what you want to learn.
                        </p>
                        <div className="hd-issue-meta">
                          <span>
                            <BookOpen size={13} />{" "}
                            {issue.length === "Brief"
                              ? "3"
                              : issue.length === "In-Depth"
                                ? "8"
                                : "5"}{" "}
                            min read
                          </span>
                          <span>
                            <Rss size={13} /> {sources.length} sources
                          </span>
                          <span>{dateLabel(issue.date, true)}</span>
                        </div>
                        <div className="hd-pipeline">
                          <button
                            onClick={() => {
                              setInspector(true);
                              setModal("transparency");
                            }}
                          >
                            <span className="hd-source-stack">
                              {sources.slice(0, 3).map((s) => (
                                <span key={s.id}>
                                  <SourceIcon type={s.type} size={12} />
                                </span>
                              ))}
                            </span>
                            {sources.length} sources
                          </button>
                          <ArrowRight size={13} />
                          <button onClick={() => setTab("goal")}>
                            <ListFilter size={14} /> Your goal
                          </button>
                          <ArrowRight size={13} />
                          <span>
                            <FileText size={14} /> This issue{" "}
                            <Check size={12} />
                          </span>
                        </div>
                        <NewsletterBody
                          markdown={issue.markdown}
                          sources={demo.sources}
                          onSource={setPreview}
                        />
                        <div className="hd-reader-actions">
                          <button
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => openSaveText("capture")}
                          >
                            <Bookmark size={14} /> Capture insight
                          </button>
                          <button
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => openSaveText("followup")}
                          >
                            <Plus size={14} /> Follow up
                          </button>
                          <button onClick={() => setModal("transparency")}>
                            <ListFilter size={14} />
                            Transparency
                          </button>
                          <button
                            onClick={() => {
                              setCopied(false);
                              setModal("share");
                            }}
                          >
                            <Share2 size={14} />
                            Share
                          </button>
                          {topic.owned && (
                            <button
                              onClick={() => setModal("delete")}
                              aria-label="Delete newsletter"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                        {issues.length > 1 && (
                          <div className="hd-history">
                            <span className="hd-eyebrow">
                              MORE FROM THIS TOPIC
                            </span>
                            {issues
                              .filter((i) => i.id !== issue.id)
                              .map((i) => (
                                <button
                                  key={i.id}
                                  onClick={() => openIssue(i.id)}
                                >
                                  <span>{dateLabel(i.date)}</span>
                                  <strong>{i.title}</strong>
                                  <ArrowRight size={15} />
                                </button>
                              ))}
                            {issue.id !== issues[0].id && (
                              <button
                                className="hd-link"
                                onClick={() => openIssue(issues[0].id)}
                              >
                                Return to latest <ArrowUp size={14} />
                              </button>
                            )}
                          </div>
                        )}
                      </article>
                    ) : (
                      <Empty
                        title="A fresh start for your curiosity."
                        text="Your goal and sources are ready. Generate a demo newsletter to see them come together."
                      >
                        <button
                          className="hd-btn hd-btn-primary"
                          disabled={!!currentJob}
                          onClick={() => generate()}
                        >
                          <Sparkles size={15} />
                          Generate first newsletter
                        </button>
                      </Empty>
                    ))}
                  {tab === "feed" && (
                    <div className="hd-feed">
                      <span className="hd-eyebrow">BEFORE THE NEWSLETTER</span>
                      <h2>From your sources.</h2>
                      <p className="hd-muted">
                        A sample of the reading behind this topic. All entries
                        are illustrative.
                      </p>
                      {topicSources.map((s, n) => (
                        <button
                          className="hd-feed-item"
                          key={s.id}
                          onClick={() => setPreview(s)}
                        >
                          <span className="hd-source-square">
                            <SourceIcon type={s.type} size={20} />
                          </span>
                          <div>
                            <span>
                              {s.name} · {n + 1}h ago
                            </span>
                            <h3>{content[topic.kind].insights[n % 3].title}</h3>
                            <p>{s.description}</p>
                          </div>
                          <ArrowUpRight size={16} />
                        </button>
                      ))}
                      {!topicSources.length && (
                        <Empty
                          title="Bring your sources."
                          text="Add a source to start building your reading list."
                        >
                          <button
                            className="hd-btn"
                            onClick={() => setModal("source")}
                          >
                            Add source
                          </button>
                        </Empty>
                      )}
                    </div>
                  )}
                  {tab === "goal" && (
                    <div className="hd-goal-view">
                      <span className="hd-eyebrow">
                        A FILTER FOR YOUR CURIOSITY
                      </span>
                      <h2>What matters to you?</h2>
                      <p className="hd-goal-quote">{topic.goal}</p>
                      <div className="hd-goal-facts">
                        <span>
                          <CalendarDays size={17} />
                          {topic.schedule ? topic.cadence : "On demand"}
                        </span>
                        <span>
                          <BookOpen size={17} />
                          {topic.length} newsletters
                        </span>
                        <span>
                          <Rss size={17} />
                          {topicSources.length} sources
                        </span>
                      </div>
                      <p className="hd-muted">
                        Changes guide future newsletters. Previous issues keep
                        the goal they were created with.
                      </p>
                      {topic.owned && (
                        <button
                          className="hd-btn"
                          onClick={() => setModal("settings")}
                        >
                          <Settings2 size={15} />
                          Edit goal settings
                        </button>
                      )}
                    </div>
                  )}
                </div>
                {topic.owned ? (
                  <div className="hd-composer-dock">
                    {notice && (
                      <div className="hd-goal-notice" role="status">
                        <Check size={14} />
                        <p>{notice}</p>
                        <button
                          className="hd-icon"
                          aria-label="Dismiss goal update"
                          onClick={() => setNotice("")}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    )}
                    <form
                      className="hd-composer"
                      onSubmit={(e) => {
                        e.preventDefault();
                        refine();
                      }}
                    >
                      <label
                        className="hd-composer-topic"
                        htmlFor="hd-goal-input"
                      >
                        <TopicMark kind={topic.kind} />
                        <span>{topic.name}</span>
                        <small>Learning goal</small>
                      </label>
                      <textarea
                        id="hd-goal-input"
                        ref={composer}
                        rows={2}
                        value={draft}
                        maxLength={2000}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (
                            e.key === "Enter" &&
                            !e.shiftKey &&
                            !e.nativeEvent.isComposing
                          ) {
                            e.preventDefault();
                            refine();
                          }
                        }}
                        placeholder={
                          topic.kind === "code"
                            ? `What should ${topic.name} focus on? Try “More practical workflows, fewer model launches.”`
                            : topic.kind === "design"
                              ? `What should ${topic.name} focus on? Try “More accessible interfaces and real examples.”`
                              : topic.kind === "music"
                                ? `What should ${topic.name} focus on? Try “More independent artists and new electronic releases.”`
                                : `What would you like to learn about ${topic.name}? Tell Header what to include or skip.`
                        }
                      />
                      <div className="hd-composer-tools">
                        <button
                          type="button"
                          className="hd-attach"
                          onClick={() => setModal("source")}
                        >
                          <Plus size={16} /> Add sources
                        </button>
                        <span>Refine this topic</span>
                        <button
                          className="hd-send"
                          type="submit"
                          disabled={!draft.trim()}
                          aria-label={`Refine ${topic.name} goal`}
                        >
                          <ArrowUp size={18} />
                        </button>
                      </div>
                    </form>
                    <div className="hd-composer-caption">
                      <span>Only affects future {topic.name} issues.</span>
                      <span>Predefined demo output</span>
                    </div>
                  </div>
                ) : (
                  <div className="hd-subscription-bar">
                    <span>You’re following this public topic.</span>
                    <button
                      className="hd-link"
                      onClick={() => {
                        setDemo((d) => ({
                          ...d,
                          topics: d.topics.filter((t) => t.id !== topic.id),
                        }));
                        navigate("explore");
                        notify("Unsubscribed in this demo.");
                      }}
                    >
                      Unsubscribe
                    </button>
                  </div>
                )}
              </div>
              {inspector && (
                <aside className="hd-inspector">
                  <div className="hd-inspector-heading">
                    <span>BEHIND THIS ISSUE</span>
                    <button
                      className="hd-icon hd-inspector-close"
                      onClick={() => setInspector(false)}
                      aria-label="Close issue context"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="hd-context-goal">
                    <span className="hd-context-icon">
                      <ListFilter size={17} />
                    </span>
                    <h3>Your curiosity, in focus.</h3>
                    <p>{issue?.goal || topic.goal}</p>
                    <button
                      className="hd-link"
                      onClick={() => {
                        setTab("goal");
                        setInspector(false);
                      }}
                    >
                      View learning goal <ArrowUpRight size={12} />
                    </button>
                  </div>
                  <div className="hd-inspector-section">
                    <div className="hd-section-label">
                      <span>Source library</span>
                      <span>{sources.length}</span>
                    </div>
                    {sources.map((s) => (
                      <button
                        key={s.id}
                        className="hd-source-row"
                        onClick={() => setPreview(s)}
                      >
                        <span className="hd-source-square">
                          <SourceIcon type={s.type} size={16} />
                        </span>
                        <span>
                          {s.name}
                          <small>
                            {s.type === "rss"
                              ? "RSS / Website"
                              : s.type === "youtube"
                                ? "YouTube"
                                : s.type === "newsletter"
                                  ? "Newsletter"
                                  : s.type === "reddit"
                                    ? "Reddit"
                                    : "Podcast"}
                          </small>
                        </span>
                        <ArrowUpRight size={12} />
                      </button>
                    ))}
                    <button
                      className="hd-link"
                      onClick={() => navigate("sources")}
                    >
                      Manage sources <ArrowRight size={13} />
                    </button>
                  </div>
                  <div className="hd-next-delivery">
                    <CalendarDays size={17} />
                    <span>
                      {topic.schedule ? "On your schedule" : "At your own pace"}
                      <strong>
                        {topic.schedule
                          ? topic.cadence
                          : "Generate when you’re ready"}
                      </strong>
                    </span>
                    {topic.owned && (
                      <button
                        className="hd-icon"
                        aria-label="Edit schedule"
                        onClick={() => setModal("settings")}
                      >
                        <Ellipsis size={16} />
                      </button>
                    )}
                  </div>
                  <div className="hd-inspector-bottom">
                    <img
                      src="/brand/header-logo.png"
                      alt=""
                      width="18"
                      height="18"
                    />
                    <p>
                      Your sources.
                      <br />
                      Your goals. Your time.
                    </p>
                  </div>
                </aside>
              )}
            </div>
          ) : (
            <div className="hd-page-scroll">
              {route === "home" && (
                <HomePage
                  demo={demo}
                  navigate={navigate}
                  create={() => setModal("new")}
                  jobs={Object.keys(jobs)}
                />
              )}
              {route === "explore" && (
                <ExplorePage
                  demo={demo}
                  setDemo={setDemo}
                  navigate={navigate}
                  notify={notify}
                  create={() => setModal("new")}
                />
              )}
              {route === "sources" && (
                <SourcesPage
                  demo={demo}
                  setDemo={setDemo}
                  notify={notify}
                  preview={setPreview}
                  add={() => setModal("source")}
                />
              )}
              {route === "follow-ups" && (
                <FollowupsPage
                  demo={demo}
                  setDemo={setDemo}
                  navigate={navigate}
                  notify={notify}
                />
              )}
              {route === "clear-tabs" && (
                <ClearTabsPage demo={demo} setDemo={setDemo} notify={notify} />
              )}
              {route === "settings" && (
                <SettingsPage
                  demo={demo}
                  setDemo={setDemo}
                  navigate={navigate}
                  notify={notify}
                />
              )}
              {![
                "home",
                "explore",
                "sources",
                "follow-ups",
                "clear-tabs",
                "settings",
              ].includes(route) && (
                <Empty
                  title="This topic isn’t here."
                  text="It may have been removed from this demo. Your other topics are available in the overview."
                >
                  <button className="hd-btn" onClick={() => navigate("home")}>
                    Open overview
                  </button>
                </Empty>
              )}
            </div>
          )}
        </main>
      </div>
      {toast && (
        <div className="hd-toast" role="status">
          <Check size={16} />
          <span>{toast}</span>
          <button
            aria-label="Dismiss notification"
            onClick={() => setToast("")}
          >
            <X size={14} />
          </button>
        </div>
      )}
      {modal === "save-text" && topic && (
        <Modal
          title={
            saveKind === "capture" ? "Capture an insight" : "Add a follow-up"
          }
          close={() => setModal(null)}
        >
          <form
            className="hd-form"
            onSubmit={(event) => {
              event.preventDefault();
              if (!savedText.trim()) return;
              saveItem(savedText.trim(), saveKind);
              setModal(null);
            }}
          >
            <label className="hd-field">
              <span>
                {saveKind === "capture"
                  ? "Text to keep"
                  : "What would you like to follow up on?"}
              </span>
              <textarea
                rows={5}
                maxLength={4000}
                value={savedText}
                onChange={(event) => setSavedText(event.target.value)}
                placeholder="Paste a passage or write a note…"
                required
                autoFocus
              />
            </label>
            <p className="hd-form-hint">
              You can also select any passage in the newsletter before opening
              this action.
            </p>
            <div className="hd-form-actions">
              <button
                type="button"
                className="hd-btn hd-btn-ghost"
                onClick={() => setModal(null)}
              >
                Cancel
              </button>
              <button className="hd-btn" disabled={!savedText.trim()}>
                Save {saveKind === "capture" ? "insight" : "follow-up"}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {modal === "new" && (
        <Modal title="Follow your curiosity." close={() => setModal(null)} wide>
          <NewTopic
            sources={demo.sources}
            plan={demo.plan}
            onCreate={newTopic}
            close={() => setModal(null)}
          />
        </Modal>
      )}
      {modal === "settings" && topic && (
        <Modal title="Make it your own." close={() => setModal(null)} wide>
          <TopicForm
            topic={topic}
            sources={demo.sources}
            onSave={saveTopic}
            close={() => setModal(null)}
            onDelete={() => {
              setDemo((d) => ({
                ...d,
                topics: d.topics.filter((t) => t.id !== topic.id),
                issues: d.issues.filter((i) => i.topicId !== topic.id),
              }));
              setModal(null);
              navigate("home");
              notify("Topic removed from the demo.");
            }}
          />
        </Modal>
      )}
      {modal === "source" && (
        <Modal title="Bring what you follow." close={() => setModal(null)}>
          <SourceForm onAdd={addSource} plan={demo.plan} />
        </Modal>
      )}
      {modal === "search" && (
        <Modal title="Find your next read." close={() => setModal(null)}>
          <div className="hd-search-field">
            <Search size={18} />
            <input
              autoFocus
              placeholder="Search topics, goals, and newsletters…"
              aria-label="Search workspace"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="hd-search-results">
            {demo.topics
              .filter((t) =>
                `${t.name} ${t.goal}`
                  .toLowerCase()
                  .includes(search.toLowerCase()),
              )
              .map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    navigate(`topic/${t.id}`);
                    setModal(null);
                  }}
                >
                  <TopicMark kind={t.kind} />
                  <span>
                    {t.name}
                    <small>{t.owned ? "Your topic" : "Following"}</small>
                  </span>
                  <ArrowRight size={16} />
                </button>
              ))}
            {search &&
              demo.issues
                .filter(
                  (i) =>
                    i.title.toLowerCase().includes(search.toLowerCase()) &&
                    demo.topics.some((t) => t.id === i.topicId),
                )
                .map((i) => (
                  <button
                    key={i.id}
                    onClick={() => {
                      navigate(`topic/${i.topicId}`);
                      window.setTimeout(() => setSelectedIssue(i.id), 0);
                      setModal(null);
                    }}
                  >
                    <FileText size={18} />
                    <span>
                      {i.title}
                      <small>{dateLabel(i.date)}</small>
                    </span>
                  </button>
                ))}
            {search &&
              !demo.topics.some((t) =>
                `${t.name} ${t.goal}`
                  .toLowerCase()
                  .includes(search.toLowerCase()),
              ) &&
              !demo.issues.some((i) =>
                i.title.toLowerCase().includes(search.toLowerCase()),
              ) && (
                <p className="hd-muted">
                  No matches. Try a topic name or a shorter phrase.
                </p>
              )}
          </div>
        </Modal>
      )}
      {modal === "transparency" && issue && (
        <Modal
          title="From sources to understanding."
          close={() => setModal(null)}
        >
          <p className="hd-muted">
            An illustrative look at this issue. These counts and steps describe
            the demo, not a live processing run.
          </p>
          <div className="hd-transparency-steps">
            {[
              {
                title: "Your sources",
                text: `${issue.sourceIds.length} selected sources bring the reading together.`,
              },
              { title: "Your goal", text: issue.goal },
              {
                title: "Your newsletter",
                text: `${issue.length} length. Sections: ${issue.sections.join(", ")}.`,
              },
            ].map((s, n) => (
              <div key={s.title}>
                <span>{n + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="hd-form-hint">
            Content date: {dateLabel(issue.date, true)}. Mock content is
            predefined; editing the goal updates its saved context, not the
            sample prose.
          </p>
        </Modal>
      )}
      {modal === "share" && issue && topic && (
        <Modal title="Good ideas travel." close={() => setModal(null)}>
          <p className="hd-muted">
            This link opens the demo topic. Browser-local changes are not
            published or shared with other people.
          </p>
          {topic.owned && (
            <label className="hd-toggle-row">
              <span>
                Public newsletter
                <small>Simulated visibility for this browser</small>
              </span>
              <input
                type="checkbox"
                checked={issue.public}
                onChange={(e) =>
                  setDemo((d) => ({
                    ...d,
                    issues: d.issues.map((i) =>
                      i.id === issue.id
                        ? { ...i, public: e.target.checked }
                        : i,
                    ),
                  }))
                }
              />
            </label>
          )}
          <input
            className="hd-input"
            readOnly
            aria-label="Demo topic link"
            value={`${window.location.origin}/dashboard#topic/${topic.id}`}
          />
          <button className="hd-btn hd-btn-primary hd-full" onClick={copyShare}>
            {copied ? <Check size={15} /> : <Copy size={15} />}{" "}
            {copied ? "Link copied" : "Copy demo link"}
          </button>
        </Modal>
      )}
      {modal === "delete" && issue && (
        <Modal title="Delete this newsletter?" close={() => setModal(null)}>
          <p className="hd-muted">
            This removes “{issue.title}” from this browser’s demo. Your topic
            and other issues stay available.
          </p>
          <div className="hd-form-actions">
            <button className="hd-btn" onClick={() => setModal(null)}>
              Keep newsletter
            </button>
            <button
              className="hd-btn hd-btn-danger"
              onClick={() => {
                setDemo((d) => ({
                  ...d,
                  issues: d.issues.filter((i) => i.id !== issue.id),
                }));
                setSelectedIssue("");
                setModal(null);
                notify("Demo newsletter deleted.");
              }}
            >
              Delete newsletter
            </button>
          </div>
        </Modal>
      )}
      {modal === "help" && (
        <Modal
          title="A workspace for your curiosity."
          close={() => setModal(null)}
        >
          <div className="hd-help-copy">
            <p>
              Start with a topic, tell Header what matters, and add the sources
              you trust.
            </p>
            <p>
              <strong>Refine your goal</strong> with the composer. Then choose{" "}
              <strong>Generate newsletter</strong> to try the simulated process.
              Open citations, save an insight, or track a follow-up as you read.
            </p>
            <p>
              This is an interactive frontend demo. Newsletters and sources are
              synthetic, generation is simulated, and changes stay in this
              browser. No Header account is connected.
            </p>
            <button
              className="hd-btn hd-btn-primary"
              onClick={() => setModal(null)}
            >
              Start exploring <ArrowRight size={15} />
            </button>
          </div>
        </Modal>
      )}
      {preview && (
        <Modal title={preview.name} close={() => setPreview(null)}>
          <div className="hd-source-preview">
            <span className="hd-source-square">
              <SourceIcon type={preview.type} size={24} />
            </span>
            <span>
              {preview.group} · {preview.type}
            </span>
          </div>
          <p className="hd-muted">{preview.description}</p>
          <label className="hd-field">
            Source address
            <input readOnly value={preview.url} />
          </label>
          <button
            className="hd-btn"
            onClick={() => {
              setPreview(null);
              navigate("sources");
            }}
          >
            Open source library <ArrowRight size={14} />
          </button>
        </Modal>
      )}
    </div>
  );
}
