import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  Copy,
  FileText,
  Flag,
  Layers,
  LoaderCircle,
  Plus,
  Rss,
  Search,
  Settings2,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { AppearanceSwitch } from "../components/ui/appearance-switch";
import { SourceIcon } from "../components/ui/source-icon";
import {
  createSeed,
  createMockNewsletter,
  dateLabel,
  issueTitles,
  parseUrls,
  seedTopics,
  uid,
  type Demo,
  type Source,
  type TabReport,
} from "./data";
import { Empty, External, Modal, TopicMark } from "./ui";

type Props = {
  demo: Demo;
  setDemo: Dispatch<SetStateAction<Demo>>;
  notify: (s: string) => void;
};
function Heading({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="hd-page-heading">
      <div>
        <span className="hd-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {children}
    </div>
  );
}
export function HomePage({
  demo,
  navigate,
  create,
  jobs,
}: {
  demo: Demo;
  navigate: (s: string) => void;
  create: () => void;
  jobs: string[];
}) {
  return (
    <div className="hd-page">
      <Heading
        eyebrow="YOUR READING ROOM"
        title="A little more perspective."
        text="Pick up where you left off, or follow a new curiosity."
      >
        <button className="hd-btn hd-btn-primary" onClick={create}>
          <Plus size={15} />
          New topic
        </button>
      </Heading>
      <div className="hd-overview-stats">
        <span>
          <strong>{demo.topics.filter((t) => t.owned).length}</strong>Your
          topics
        </span>
        <span>
          <strong>
            {
              demo.issues.filter((i) =>
                demo.topics.some((t) => t.id === i.topicId),
              ).length
            }
          </strong>
          Newsletters to explore
        </span>
        <span>
          <strong>
            {
              demo.followups.filter((f) => !f.done && f.kind === "followup")
                .length
            }
          </strong>
          Ideas to try
        </span>
      </div>
      {["Your topics", "Following"].map((label, n) => (
        <section className="hd-home-section" key={label}>
          <div className="hd-section-label">
            <span>{label}</span>
            <span>
              {demo.topics.filter((t) => (n ? !t.owned : t.owned)).length}
            </span>
          </div>
          <div className="hd-topic-cards">
            {demo.topics
              .filter((t) => (n ? !t.owned : t.owned))
              .map((t) => {
                const latest = demo.issues
                  .filter((i) => i.topicId === t.id)
                  .sort((a, b) => b.date.localeCompare(a.date))[0];
                return (
                  <button
                    key={t.id}
                    className="hd-overview-card"
                    onClick={() => navigate(`topic/${t.id}`)}
                  >
                    <div>
                      <TopicMark kind={t.kind} />
                      <ArrowUpRight size={17} />
                    </div>
                    <h2>{t.name}</h2>
                    <p>{t.goal}</p>
                    <footer>
                      <span>
                        {jobs.includes(t.id)
                          ? "Generating…"
                          : latest
                            ? `Latest · ${dateLabel(latest.date)}`
                            : "Ready for a first issue"}
                      </span>
                      <span>{t.sourceIds.length} sources</span>
                    </footer>
                  </button>
                );
              })}
            <button
              className="hd-overview-card hd-new-card"
              onClick={n ? () => navigate("explore") : create}
            >
              <Plus size={23} />
              <h3>
                {n ? "Explore something new" : "Make room for a new idea"}
              </h3>
              <p>
                {n
                  ? "Find a topic worth following."
                  : "Your sources, through your lens."}
              </p>
            </button>
          </div>
        </section>
      ))}
      <section className="hd-home-section">
        <div className="hd-section-label">
          <span>A few ideas to put into practice</span>
          <button className="hd-link" onClick={() => navigate("follow-ups")}>
            All follow-ups <ArrowRight size={14} />
          </button>
        </div>
        {demo.followups
          .filter((f) => f.kind === "followup" && !f.done)
          .slice(0, 3)
          .map((f) => (
            <button
              className="hd-home-followup"
              key={f.id}
              onClick={() => navigate("follow-ups")}
            >
              <Flag size={17} />
              <span>
                {f.title}
                <small>{f.topic}</small>
              </span>
              <ArrowRight size={15} />
            </button>
          ))}
        {!demo.followups.some((f) => f.kind === "followup" && !f.done) && (
          <p className="hd-muted">
            Nothing waiting on you. Save a recommendation from your next
            newsletter.
          </p>
        )}
      </section>
    </div>
  );
}
export function ExplorePage({
  demo,
  setDemo,
  navigate,
  notify,
  create,
}: Props & { navigate: (s: string) => void; create: () => void }) {
  const [query, setQuery] = useState("");
  return (
    <div className="hd-page">
      <Heading
        eyebrow="FOLLOW YOUR CURIOSITY"
        title="There’s more to discover."
        text="A few perspectives to make your own. Sample topics for this demo."
      >
        <button className="hd-btn" onClick={create}>
          <Plus size={15} />
          Create a topic
        </button>
      </Heading>
      <div className="hd-search-field hd-explore-search">
        <Search size={17} />
        <input
          aria-label="Search public topics"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find your next curiosity…"
        />
      </div>
      <div className="hd-explore-grid">
        {seedTopics
          .filter((t) => t.name.toLowerCase().includes(query.toLowerCase()))
          .map((t, n) => {
            const following = demo.topics.find(
              (d) => d.id === `public-${t.id}` || (!d.owned && d.id === t.id),
            );
            return (
              <div
                className={`hd-explore-card hd-explore-${t.kind}`}
                key={t.id}
              >
                <div className="hd-explore-art">
                  <TopicMark kind={t.kind} />
                  <span>
                    {n === 0
                      ? "think. build. repeat."
                      : n === 1
                        ? "less, but considered."
                        : "find your next repeat."}
                  </span>
                  <i />
                </div>
                <div className="hd-explore-copy">
                  <span className="hd-eyebrow">CURATED DEMO TOPIC</span>
                  <h2>{t.name}</h2>
                  <p>{t.goal}</p>
                  <div className="hd-mini-meta">
                    <span>
                      <Rss size={13} />
                      {t.sourceIds.length} sources
                    </span>
                    <span>
                      <BookOpen size={13} />
                      Weekly newsletter
                    </span>
                  </div>
                  <div className="hd-card-actions">
                    <button
                      className="hd-btn hd-btn-primary"
                      onClick={() => {
                        if (following) {
                          navigate(`topic/${following.id}`);
                          return;
                        }
                        const id = `public-${t.id}`;
                        setDemo((d) => ({
                          ...d,
                          topics: [
                            ...d.topics,
                            { ...t, id, owned: false, public: true },
                          ],
                          issues: [
                            ...d.issues,
                            {
                              id: uid(),
                              topicId: id,
                              date: "2026-09-24T08:00:00Z",
                              title: issueTitles[t.kind][0],
                              markdown: createMockNewsletter(t, d.sources),
                              goal: t.goal,
                              sections: [...t.sections],
                              sourceIds: [...t.sourceIds],
                              public: true,
                              length: t.length,
                            },
                          ],
                        }));
                        notify("Topic followed in this demo.");
                      }}
                    >
                      {following ? <Check size={14} /> : <Plus size={14} />}{" "}
                      {following ? "Open topic" : "Follow topic"}
                    </button>
                    <button
                      className="hd-link"
                      onClick={() => {
                        const id = uid();
                        setDemo((d) => ({
                          ...d,
                          topics: [
                            ...d.topics,
                            {
                              ...t,
                              id,
                              name: `${t.name} · my version`,
                              owned: true,
                              public: false,
                            },
                          ],
                        }));
                        navigate(`topic/${id}`);
                        notify("Your copy is ready to customize.");
                      }}
                    >
                      Make it yours <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {!seedTopics.some((t) =>
        t.name.toLowerCase().includes(query.toLowerCase()),
      ) && (
        <Empty
          title="A curiosity of your own."
          text="No sample topic matches that search. Create one around your goal."
        >
          <button className="hd-btn" onClick={create}>
            Create topic
          </button>
        </Empty>
      )}
    </div>
  );
}
export function SourcesPage({
  demo,
  setDemo,
  notify,
  preview,
  add,
}: Props & { preview: (s: Source) => void; add: () => void }) {
  const [group, setGroup] = useState("All sources"),
    [query, setQuery] = useState(""),
    [selection, setSelection] = useState<string[]>([]),
    [importOpen, setImport] = useState(false),
    [importMode, setImportMode] = useState("opml"),
    [imported, setImported] = useState<Source[]>([]),
    [error, setError] = useState(""),
    [confirm, setConfirm] = useState(false),
    [rename, setRename] = useState(false),
    [groupName, setGroupName] = useState(""),
    [refreshed, setRefreshed] = useState(false);
  const groups = [...new Set(demo.sources.map((s) => s.group))];
  const filtered = demo.sources.filter(
    (s) =>
      (group === "All sources" || s.group === group) &&
      `${s.name} ${s.url}`.toLowerCase().includes(query.toLowerCase()),
  );
  async function readOpml(file: File) {
    setError("");
    setImported([]);
    if (file.size > 2000000) {
      setError("Choose an OPML file smaller than 2 MB.");
      return;
    }
    try {
      const xml = new DOMParser().parseFromString(
        await file.text(),
        "text/xml",
      );
      if (xml.querySelector("parsererror")) throw Error();
      const items = [...xml.querySelectorAll("outline[xmlUrl]")].map((el) => ({
        url: el.getAttribute("xmlUrl") || "",
        name:
          el.getAttribute("title") ||
          el.getAttribute("text") ||
          "Imported feed",
      }));
      const valid = items.filter(
        (item) =>
          parseUrls(item.url).valid.length === 1 &&
          !parseUrls(item.url).invalid.length,
      );
      if (!valid.length) {
        setError(
          "No valid RSS feed addresses were found. Choose an OPML export.",
        );
        return;
      }
      setImported(
        valid.slice(0, 100).map((item) => ({
          id: uid(),
          name: item.name,
          url: parseUrls(item.url).valid[0],
          type: "rss",
          description: "Imported locally from an OPML file.",
          group: "Imported feeds",
        })),
      );
      if (valid.length !== items.length)
        setError(
          `${items.length - valid.length} invalid entries were skipped.`,
        );
    } catch {
      setError("This file could not be read as OPML/XML.");
    }
  }
  return (
    <div className="hd-page">
      <Heading
        eyebrow="BRING WHAT YOU FOLLOW"
        title="Good reading starts here."
        text="A library of voices, through your own lens."
      >
        <div className="hd-inline">
          <button className="hd-btn" onClick={() => setImport(true)}>
            <Upload size={14} />
            Import
          </button>
          <button className="hd-btn hd-btn-primary" onClick={add}>
            <Plus size={15} />
            Add source
          </button>
        </div>
      </Heading>
      <div className="hd-group-pills">
        {["All sources", ...groups].map((g) => (
          <button
            key={g}
            className={g === group ? "active" : ""}
            onClick={() => {
              setGroup(g);
              setSelection([]);
            }}
          >
            {g}
            <span>
              {
                demo.sources.filter((s) => g === "All sources" || s.group === g)
                  .length
              }
            </span>
          </button>
        ))}
      </div>
      <div className="hd-source-library-toolbar">
        <div className="hd-search-field">
          <Search size={16} />
          <input
            aria-label="Search sources"
            placeholder="Search your sources…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          className="hd-btn"
          onClick={() => {
            setRefreshed(true);
            notify("Demo refresh complete. No live feeds were fetched.");
          }}
        >
          {refreshed ? <Check size={14} /> : <Rss size={14} />}{" "}
          {refreshed ? "Refreshed" : "Refresh sources"}
        </button>
        {group !== "All sources" && (
          <button
            className="hd-icon"
            aria-label="Rename source group"
            onClick={() => {
              setGroupName(group);
              setRename(true);
            }}
          >
            <Settings2 size={17} />
          </button>
        )}
      </div>
      <div className="hd-source-table">
        <div className="hd-table-heading">
          <label>
            <input
              type="checkbox"
              aria-label="Select all visible sources"
              checked={
                filtered.length > 0 &&
                filtered.every((s) => selection.includes(s.id))
              }
              onChange={(e) =>
                setSelection(e.target.checked ? filtered.map((s) => s.id) : [])
              }
            />
            <span>
              {selection.length ? `${selection.length} selected` : "SOURCE"}
            </span>
          </label>
          <span>GROUP</span>
          <span>STATUS</span>
          {selection.length > 0 && (
            <button className="hd-link" onClick={() => setConfirm(true)}>
              Remove <Trash2 size={13} />
            </button>
          )}
        </div>
        {filtered.map((s) => (
          <div key={s.id} className="hd-source-table-row">
            <input
              type="checkbox"
              aria-label={`Select ${s.name}`}
              checked={selection.includes(s.id)}
              onChange={(e) =>
                setSelection(
                  e.target.checked
                    ? [...selection, s.id]
                    : selection.filter((id) => id !== s.id),
                )
              }
            />
            <button className="hd-source-table-main" onClick={() => preview(s)}>
              <span className="hd-source-square">
                <SourceIcon type={s.type} size={19} />
              </span>
              <span>
                {s.name}
                <small>{s.description}</small>
              </span>
            </button>
            <span className="hd-source-group-name">{s.group}</span>
            <span className="hd-source-status">
              <span className="hd-live-dot" />
              Demo source
            </span>
            <button
              className="hd-icon"
              aria-label={`Preview ${s.name}`}
              onClick={() => preview(s)}
            >
              <ArrowUpRight size={16} />
            </button>
          </div>
        ))}
      </div>
      {!filtered.length && (
        <Empty
          title="Room for another voice."
          text="Add a source, import your feeds, or try a different search."
        >
          <button className="hd-btn" onClick={add}>
            Add source
          </button>
        </Empty>
      )}
      <p className="hd-form-hint hd-source-footnote">
        Source names and articles in the starter library are fictional. Adding a
        URL does not fetch or subscribe to it.
      </p>
      {rename && (
        <Modal title="Name this collection." close={() => setRename(false)}>
          <form
            className="hd-form"
            onSubmit={(e) => {
              e.preventDefault();
              const next = groupName.trim();
              if (!next) return;
              setDemo((d) => ({
                ...d,
                sources: d.sources.map((s) =>
                  s.group === group ? { ...s, group: next } : s,
                ),
              }));
              setGroup(next);
              setRename(false);
              notify("Source group renamed.");
            }}
          >
            <label className="hd-field">
              Group name
              <input
                value={groupName}
                required
                maxLength={80}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </label>
            <button
              className="hd-btn hd-btn-primary"
              disabled={!groupName.trim()}
            >
              Save name
            </button>
          </form>
        </Modal>
      )}
      {confirm && (
        <Modal title="Remove selected sources?" close={() => setConfirm(false)}>
          <p className="hd-muted">
            Remove {selection.length} sources from the demo library and future
            topic runs. Historical issues retain their source IDs, but removed
            source previews will no longer be available.
          </p>
          <div className="hd-form-actions">
            <button className="hd-btn" onClick={() => setConfirm(false)}>
              Cancel
            </button>
            <button
              className="hd-btn hd-btn-danger"
              onClick={() => {
                setDemo((d) => ({
                  ...d,
                  sources: d.sources.filter((s) => !selection.includes(s.id)),
                  topics: d.topics.map((t) => ({
                    ...t,
                    sourceIds: t.sourceIds.filter(
                      (id) => !selection.includes(id),
                    ),
                  })),
                }));
                setSelection([]);
                setConfirm(false);
                setGroup("All sources");
                notify("Sources removed from the demo.");
              }}
            >
              Remove sources
            </button>
          </div>
        </Modal>
      )}
      {importOpen && (
        <Modal title="Bring your reading list." close={() => setImport(false)}>
          <div className="hd-tabs">
            <button
              className={importMode === "opml" ? "active" : ""}
              onClick={() => {
                setImportMode("opml");
                setImported([]);
                setError("");
              }}
            >
              OPML / XML
            </button>
            <button
              className={importMode === "freshrss" ? "active" : ""}
              onClick={() => {
                setImportMode("freshrss");
                setImported([]);
                setError("");
              }}
            >
              FreshRSS
            </button>
          </div>
          {importMode === "opml" ? (
            <label className="hd-upload">
              <Upload size={25} />
              <strong>Choose an OPML export</strong>
              <span>Read locally in your browser · up to 2 MB</span>
              <input
                aria-label="Choose OPML file"
                type="file"
                accept=".opml,.xml,text/xml"
                onChange={(e) => {
                  if (e.target.files?.[0]) void readOpml(e.target.files[0]);
                }}
              />
            </label>
          ) : (
            <div className="hd-form">
              <p className="hd-muted">
                Try a sample FreshRSS import without entering credentials. A
                real server connection is outside this frontend demo.
              </p>
              <button
                className="hd-btn"
                onClick={() =>
                  setImported([
                    {
                      id: uid(),
                      name: "My FreshRSS reading list",
                      url: "https://example.com/feed.xml",
                      type: "rss",
                      group: "FreshRSS import",
                      description: "Sample feed from a simulated connection.",
                    },
                  ])
                }
              >
                Preview demo connection <ArrowRight size={14} />
              </button>
            </div>
          )}
          {error && (
            <p className="hd-error" role="alert">
              {error}
            </p>
          )}
          {imported.length > 0 && (
            <div className="hd-form">
              <p>{imported.length} feeds ready to add.</p>
              <div className="hd-import-preview">
                {imported.map((s) => (
                  <p key={s.id}>
                    <Rss size={13} />
                    {s.name}
                  </p>
                ))}
              </div>
              <button
                className="hd-btn hd-btn-primary"
                onClick={() => {
                  setDemo((d) => ({
                    ...d,
                    sources: [...d.sources, ...imported],
                  }));
                  setImported([]);
                  setImport(false);
                  notify("Feeds added to your local demo library.");
                }}
              >
                Import {imported.length} feeds <Check size={14} />
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
export function FollowupsPage({
  demo,
  setDemo,
  navigate,
  notify,
}: Props & { navigate: (s: string) => void }) {
  const [tab, setTab] = useState<"followup" | "capture" | "experiments">(
    "followup",
  );
  const items = demo.followups.filter((f) => f.kind === tab);
  return (
    <div className="hd-page">
      <Heading
        eyebrow="BEYOND THE READ"
        title="From interesting to tried."
        text="Keep the ideas you want to do something with."
      />
      <div className="hd-tabs hd-page-tabs">
        {[
          { id: "followup" as const, label: "Follow-ups" },
          { id: "capture" as const, label: "Captured" },
          { id: "experiments" as const, label: "Agent experiments" },
        ].map((t) => (
          <button
            className={tab === t.id ? "active" : ""}
            key={t.id}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.id === "experiments" && <span>BETA</span>}
          </button>
        ))}
      </div>
      {tab === "experiments" ? (
        <Empty
          title="An idea can become an experiment."
          text="Agent experiments appear here when synced from the Header skill. This frontend demo is not connected to an agent."
        >
          <External href="https://joinheader.com/docs">
            Read the integration guide
          </External>
        </Empty>
      ) : items.length ? (
        <div className="hd-followup-list">
          {items.map((f) => (
            <div
              className={`hd-followup-card ${f.done ? "is-done" : ""}`}
              key={f.id}
            >
              {tab === "followup" ? (
                <button
                  className="hd-check-box"
                  aria-label={
                    f.done ? `Reopen ${f.title}` : `Complete ${f.title}`
                  }
                  aria-pressed={f.done}
                  onClick={() =>
                    setDemo((d) => ({
                      ...d,
                      followups: d.followups.map((x) =>
                        x.id === f.id ? { ...x, done: !x.done } : x,
                      ),
                    }))
                  }
                >
                  {f.done && <Check size={15} />}
                </button>
              ) : (
                <span className="hd-captured-symbol">“</span>
              )}
              <div>
                <span className="hd-eyebrow">{f.topic}</span>
                <h3>{f.title}</h3>
                <p>
                  {tab === "followup"
                    ? f.done
                      ? "Tried and noted."
                      : "One small next step, on your own schedule."
                    : "An insight saved from your reading."}
                </p>
                {tab === "capture" && (
                  <button
                    className="hd-link"
                    onClick={() => {
                      if (
                        demo.followups.some(
                          (x) => x.kind === "followup" && x.title === f.title,
                        )
                      ) {
                        notify("This insight is already in Follow-ups.");
                        return;
                      }
                      setDemo((d) => ({
                        ...d,
                        followups: [
                          ...d.followups,
                          { ...f, id: uid(), kind: "followup" },
                        ],
                      }));
                      notify("Added to Follow-ups.");
                    }}
                  >
                    Turn into a follow-up <ArrowRight size={14} />
                  </button>
                )}
              </div>
              <button
                className="hd-icon"
                aria-label={`Remove ${f.title}`}
                onClick={() => {
                  setDemo((d) => ({
                    ...d,
                    followups: d.followups.filter((x) => x.id !== f.id),
                  }));
                  notify(
                    "Removed from the local demo. Reset the demo in Settings to restore starter items.",
                  );
                }}
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <Empty
          title={
            tab === "followup"
              ? "Your next small step."
              : "Keep what stays with you."
          }
          text={
            tab === "followup"
              ? "Choose “Follow up” on a newsletter recommendation to bring it here."
              : "Capture an insight from a newsletter and come back to it later."
          }
        >
          <button className="hd-btn" onClick={() => navigate("home")}>
            Find a newsletter <ArrowRight size={15} />
          </button>
        </Empty>
      )}
    </div>
  );
}
export function ClearTabsPage({ demo, setDemo, notify }: Props) {
  const [name, setName] = useState(""),
    [goal, setGoal] = useState(""),
    [urls, setUrls] = useState(""),
    [mode, setMode] = useState("A newsletter"),
    [pending, setPending] = useState(false),
    [report, setReport] = useState<TabReport | null>(null),
    [history, setHistory] = useState(false),
    [error, setError] = useState("");
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const parsed = parseUrls(urls);
  const today = new Date().toDateString();
  const uses = demo.reports.filter(
    (r) => new Date(r.date).toDateString() === today,
  ).length;
  return (
    <div className="hd-page hd-page-narrow">
      <Heading
        eyebrow="CLOSE THE TABS. KEEP THE GOOD PARTS."
        title="Make a little room."
        text="Turn that pile of links into something you’ll actually read."
      >
        <button className="hd-btn" onClick={() => setHistory(true)}>
          <CalendarDays size={14} />
          History <span>{demo.reports.length}</span>
        </button>
      </Heading>
      {report ? (
        <div className="hd-tab-report">
          <span className="hd-eyebrow">
            {report.mode.toUpperCase()} · DEMO RESULT
          </span>
          <h2>{report.name}</h2>
          <p className="hd-muted">{report.goal}</p>
          {report.mode === "A newsletter" && (
            <div className="hd-tldr">
              <span className="hd-eyebrow">THE SHORT VERSION</span>
              <p>
                Your saved links are gathered in one place. This predefined demo
                shows how an issue can connect useful ideas and leave you with a
                manageable next step.
              </p>
            </div>
          )}
          {report.mode === "Sorted by subject" && <h3>Collected reading</h3>}
          <div className="hd-report-links">
            {report.urls.map((url, n) => (
              <a key={url} href={url} target="_blank" rel="noreferrer">
                <span>{String(n + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{new URL(url).hostname}</strong>
                  <small>{url}</small>
                </div>
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
          <p className="hd-form-hint">
            No pages were fetched or analyzed. These are the URLs you supplied,
            presented as a sample result.
          </p>
          <button className="hd-btn" onClick={() => setReport(null)}>
            <Plus size={15} />
            Start another
          </button>
        </div>
      ) : (
        <form
          className="hd-form hd-tabs-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (parsed.invalid.length) {
              setError(`Check these addresses: ${parsed.invalid.join(", ")}`);
              return;
            }
            if (parsed.valid.length > 100) {
              setError("Use up to 100 unique URLs per submission.");
              return;
            }
            if (demo.plan === "Free" && uses >= 3) {
              setError(
                "You’ve reached the demo Free limit of 3 submissions today.",
              );
              return;
            }
            setError("");
            setPending(true);
            timer.current = window.setTimeout(() => {
              const result = {
                id: uid(),
                name: name.trim(),
                goal: goal.trim(),
                urls: parsed.valid,
                mode,
                date: new Date().toISOString(),
              };
              setDemo((d) => ({ ...d, reports: [result, ...d.reports] }));
              setReport(result);
              setPending(false);
              notify("Your demo reading list is ready.");
            }, 2200);
          }}
        >
          <fieldset disabled={pending}>
            <div className="hd-two-fields">
              <label className="hd-field">
                Topic name
                <input
                  required
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ideas for my next project"
                />
              </label>
              <label className="hd-field">
                What do you want to learn?
                <input
                  required
                  maxLength={500}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="Give these links a little direction"
                />
              </label>
            </div>
            <label className="hd-field">
              Your open tabs
              <textarea
                rows={8}
                required
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                placeholder={
                  "Paste your links here…\nOne per line, or separated by spaces or commas."
                }
              />
              <span className="hd-field-meta">
                <span>Missing https://? We’ll add it.</span>
                <span>{parsed.valid.length} / 100 URLs</span>
              </span>
            </label>
            <span className="hd-field-title">Make it into</span>
            <div className="hd-output-options">
              {["Sorted by subject", "A reading list", "A newsletter"].map(
                (x, n) => {
                  const Icon = [Layers, BookOpen, FileText][n];
                  return (
                    <button
                      type="button"
                      className={mode === x ? "active" : ""}
                      key={x}
                      onClick={() => setMode(x)}
                    >
                      <Icon size={21} />
                      {x}
                      {mode === x && <Check size={13} />}
                    </button>
                  );
                },
              )}
            </div>
          </fieldset>
          {error && (
            <p className="hd-error" role="alert">
              {error}
            </p>
          )}
          <div className="hd-form-actions">
            <button
              type="button"
              className="hd-link"
              disabled={pending}
              onClick={() => {
                setUrls("");
                setError("");
              }}
            >
              Clear URLs
            </button>
            <button
              className="hd-btn hd-btn-primary"
              disabled={
                pending ||
                !name.trim() ||
                !goal.trim() ||
                !parsed.valid.length ||
                parsed.valid.length > 100
              }
            >
              {pending ? (
                <LoaderCircle size={15} className="hd-spin" />
              ) : (
                <Sparkles size={15} />
              )}{" "}
              {pending ? "Preparing demo…" : "Bring it together"}
            </button>
          </div>
          <p className="hd-form-hint">
            Simulated processing.{" "}
            {demo.plan === "Free"
              ? `${Math.max(0, 3 - uses)} of 3 daily demo uses remaining.`
              : "Up to 100 links per submission."}
          </p>
        </form>
      )}
      <div className="hd-extension-note">
        <Layers size={21} />
        <div>
          <strong>All those tabs, in one click.</strong>
          <p>Find Header’s browser extension and setup instructions.</p>
        </div>
        <External href="https://joinheader.com/docs">View guide</External>
      </div>
      {history && (
        <Modal title="A little less tab chaos." close={() => setHistory(false)}>
          {demo.reports.length ? (
            demo.reports.map((r) => (
              <button
                className="hd-history-report"
                key={r.id}
                onClick={() => {
                  setReport(r);
                  setHistory(false);
                }}
              >
                <span>
                  {r.name}
                  <small>
                    {dateLabel(r.date)} · {r.urls.length} links · {r.mode}
                  </small>
                </span>
                <ArrowRight size={15} />
              </button>
            ))
          ) : (
            <Empty
              title="Your first clean slate awaits."
              text="Completed Clear Tabs submissions will appear here."
            />
          )}
        </Modal>
      )}
    </div>
  );
}
export function SettingsPage({
  demo,
  setDemo,
  navigate,
  notify,
}: Props & { navigate: (s: string) => void }) {
  const [tab, setTab] = useState("Workspace"),
    [reset, setReset] = useState(false),
    [copied, setCopied] = useState(false);
  const tabs = [
    "Workspace",
    "Topics & subscriptions",
    "Email sources",
    "API & resources",
  ];
  return (
    <div className="hd-page">
      <Heading
        eyebrow="MAKE YOURSELF AT HOME"
        title="Your workspace, your way."
        text="A few preferences to keep Header working for you."
      />
      <div className="hd-settings-layout">
        <nav className="hd-settings-nav" aria-label="Settings sections">
          {tabs.map((s) => (
            <button
              key={s}
              className={tab === s ? "active" : ""}
              onClick={() => setTab(s)}
            >
              {s}
              <ArrowRight size={13} />
            </button>
          ))}
        </nav>
        <div className="hd-settings-content">
          {tab === "Workspace" && (
            <>
              <section className="hd-settings-section">
                <h2>The everyday details.</h2>
                <div className="hd-toggle-row">
                  <span>
                    Appearance<small>Shared with the Header landing page</small>
                  </span>
                  <AppearanceSwitch
                    value={demo.appearance}
                    onChange={(appearance) =>
                      setDemo((d) => ({ ...d, appearance }))
                    }
                  />
                </div>
                <div className="hd-toggle-row">
                  <span>
                    Jamie · Demo reader
                    <small>No account or email address is connected</small>
                  </span>
                  <a className="hd-link" href="/">
                    Exit demo <ArrowUpRight size={13} />
                  </a>
                </div>
              </section>
              <section className="hd-plan-card">
                <span className="hd-eyebrow">YOUR PLAN</span>
                <h2>
                  Header {demo.plan} <span>Demo</span>
                </h2>
                <p>
                  {demo.plan === "Free"
                    ? "Follow public topics and try Clear Tabs three times a day."
                    : "Your own topics, sources, manual generation, and scheduled newsletters."}
                </p>
                <p className="hd-form-hint">
                  {demo.plan === "Trial"
                    ? "Sample trial state. No subscription will begin."
                    : "No billing is connected to this prototype."}
                </p>
                <External href="https://joinheader.com">
                  See current plans on Header
                </External>
              </section>
              <section className="hd-settings-section">
                <h2>Try the different states.</h2>
                <p className="hd-muted">
                  Demo controls for exploring the interface. These do not change
                  a real account.
                </p>
                <label className="hd-field">
                  Demo plan
                  <select
                    value={demo.plan}
                    onChange={(e) =>
                      setDemo((d) => ({
                        ...d,
                        plan: e.target.value as Demo["plan"],
                      }))
                    }
                  >
                    {["Pro", "Free", "Trial"].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
                <label className="hd-field">
                  Next newsletter generation
                  <select
                    value={demo.outcome}
                    onChange={(e) =>
                      setDemo((d) => ({
                        ...d,
                        outcome: e.target.value as Demo["outcome"],
                      }))
                    }
                  >
                    <option value="success">Complete successfully</option>
                    <option value="failure">Show a failure and retry</option>
                    <option value="limit">Show a reached limit</option>
                  </select>
                </label>
                <button className="hd-btn" onClick={() => setReset(true)}>
                  Reset demo data
                </button>
              </section>
            </>
          )}
          {tab === "Topics & subscriptions" && (
            <section className="hd-settings-section">
              <h2>A rhythm that suits you.</h2>
              <p className="hd-muted">
                Local demo preferences. No newsletters will be emailed.
              </p>
              {demo.topics.map((t) => (
                <div className="hd-subscription-setting" key={t.id}>
                  <div>
                    <TopicMark kind={t.kind} />
                    <button
                      className="hd-link"
                      onClick={() => navigate(`topic/${t.id}`)}
                    >
                      {t.name}
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                  <div>
                    <label className="hd-inline">
                      <input
                        type="checkbox"
                        checked={t.schedule}
                        onChange={(e) =>
                          setDemo((d) => ({
                            ...d,
                            topics: d.topics.map((x) =>
                              x.id === t.id
                                ? { ...x, schedule: e.target.checked }
                                : x,
                            ),
                          }))
                        }
                      />
                      {t.schedule ? "Scheduled" : "Paused"}
                    </label>
                    <select
                      aria-label={`${t.name} newsletter length`}
                      value={t.length}
                      onChange={(e) =>
                        setDemo((d) => ({
                          ...d,
                          topics: d.topics.map((x) =>
                            x.id === t.id
                              ? { ...x, length: e.target.value }
                              : x,
                          ),
                        }))
                      }
                    >
                      {["Brief", "Standard", "In-Depth"].map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                    {!t.owned && (
                      <button
                        className="hd-link"
                        onClick={() => {
                          setDemo((d) => ({
                            ...d,
                            topics: d.topics.filter((x) => x.id !== t.id),
                          }));
                          notify("Unsubscribed in this demo.");
                        }}
                      >
                        Unsubscribe
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}
          {tab === "Email sources" && (
            <section className="hd-settings-section">
              <h2>Bring your inbox along.</h2>
              <p className="hd-muted">
                Email newsletters can join your source library. This address is
                a non-working example for the demo.
              </p>
              <div className="hd-forwarding-address">
                <code>reading-room@demo.invalid</code>
                <button
                  className="hd-icon"
                  aria-label="Copy demo forwarding address"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        "reading-room@demo.invalid",
                      );
                      setCopied(true);
                    } catch {
                      notify(
                        "Clipboard unavailable. Select and copy the address.",
                      );
                    }
                  }}
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                </button>
              </div>
              <p className="hd-form-hint">
                Do not forward email to this address. No inbox has been
                provisioned.
              </p>
              {demo.sources
                .filter((s) => s.type === "newsletter")
                .map((s) => (
                  <div className="hd-email-source" key={s.id}>
                    <SourceIcon type="newsletter" size={18} />
                    <span>
                      {s.name}
                      <small>Example newsletter source</small>
                    </span>
                  </div>
                ))}
              <button className="hd-btn" onClick={() => navigate("sources")}>
                Manage source library <ArrowRight size={14} />
              </button>
            </section>
          )}
          {tab === "API & resources" && (
            <section className="hd-settings-section">
              <h2>Take your curiosity further.</h2>
              <p className="hd-muted">
                API keys are managed in your real Header account. This demo does
                not create or display credentials.
              </p>
              <External href="https://app.joinheader.com/dashboard">
                Open Header account
              </External>
              <div className="hd-resource-links">
                {[
                  {
                    title: "Documentation & API",
                    url: "https://joinheader.com/docs",
                  },
                  {
                    title: "Header skill & agent integration",
                    url: "https://joinheader.com/docs",
                  },
                  {
                    title: "About Header",
                    url: "https://joinheader.com/about",
                  },
                  {
                    title: "Community on Discord",
                    url: "https://discord.com/invite/C8nmTYhuye",
                  },
                  {
                    title: "Privacy policy",
                    url: "https://joinheader.com/privacy-policy",
                  },
                  {
                    title: "Terms of service",
                    url: "https://joinheader.com/terms-of-service",
                  },
                ].map((r) => (
                  <External key={r.title} href={r.url}>
                    {r.title}
                  </External>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      {reset && (
        <Modal title="Start fresh?" close={() => setReset(false)}>
          <p className="hd-muted">
            This replaces your local demo changes with the original sample
            topics, sources, newsletters, and follow-ups.
          </p>
          <div className="hd-form-actions">
            <button className="hd-btn" onClick={() => setReset(false)}>
              Keep my changes
            </button>
            <button
              className="hd-btn hd-btn-danger"
              onClick={() => {
                setDemo(createSeed());
                setReset(false);
                notify("Demo reset to its original sample data.");
              }}
            >
              Reset demo
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
