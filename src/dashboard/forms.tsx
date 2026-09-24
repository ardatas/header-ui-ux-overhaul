import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowRight,
  Check,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { SourceIcon, type SourceType } from "../components/ui/source-icon";
import { parseUrls, sectionNames, uid, type Source, type Topic } from "./data";

export function SourceForm({
  onAdd,
  plan,
}: {
  onAdd: (s: Source) => void;
  plan: string;
}) {
  const [name, setName] = useState(""),
    [url, setUrl] = useState(""),
    [type, setType] = useState<SourceType>("rss"),
    [group, setGroup] = useState("My sources"),
    [error, setError] = useState("");
  return (
    <form
      className="hd-form"
      onSubmit={(e) => {
        e.preventDefault();
        const urls = parseUrls(url);
        if (urls.invalid.length || urls.valid.length !== 1) {
          setError("Enter one valid website or feed address.");
          return;
        }
        onAdd({
          id: uid(),
          name: name.trim(),
          url: urls.valid[0],
          type,
          group: group.trim(),
          description: "A source you added to this demo workspace.",
        });
      }}
    >
      <p className="hd-muted">
        Connect the things you already read. Sources are saved locally for this
        demo.
      </p>
      <div className="hd-source-type-picker">
        {(
          [
            "rss",
            "youtube",
            "podcast",
            "newsletter",
            "reddit",
            "x",
          ] as SourceType[]
        ).map((t) => (
          <button
            key={t}
            type="button"
            className={type === t ? "selected" : ""}
            onClick={() => setType(t)}
            aria-pressed={type === t}
          >
            <SourceIcon type={t} size={18} />
            <span>
              {t === "rss"
                ? "RSS / Web"
                : t === "x"
                  ? "X · Pro"
                  : t === "youtube"
                    ? "YouTube"
                    : t.charAt(0).toUpperCase() + t.slice(1)}
            </span>
          </button>
        ))}
      </div>
      <label className="hd-field">
        Source name
        <input
          required
          maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. A newsletter you never miss"
        />
      </label>
      <label className="hd-field">
        {type === "newsletter" ? "Newsletter website" : "Source URL"}
        <input
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://…"
        />
      </label>
      <label className="hd-field">
        Source group
        <input
          required
          maxLength={80}
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        />
      </label>
      {type === "newsletter" && (
        <p className="hd-form-hint">
          Email forwarding is available under Settings → Email sources. This
          demo does not receive email.
        </p>
      )}
      {type === "x" && plan === "Free" && (
        <p className="hd-error">
          X sources require Pro. You can change the demo plan in Settings.
        </p>
      )}
      {error && (
        <p className="hd-error" role="alert">
          {error}
        </p>
      )}
      <button
        className="hd-btn hd-btn-primary hd-full"
        disabled={
          !name.trim() || !group.trim() || (type === "x" && plan === "Free")
        }
      >
        <Plus size={15} />
        Add source
      </button>
    </form>
  );
}

export function NewTopic({
  sources,
  plan,
  onCreate,
  close,
}: {
  sources: Source[];
  plan: string;
  onCreate: (t: Topic) => void;
  close: () => void;
}) {
  const [step, setStep] = useState(0),
    [name, setName] = useState(""),
    [goal, setGoal] = useState(""),
    [ids, setIds] = useState<string[]>([]),
    [mode, setMode] = useState("existing");
  const valid =
    step === 0 ? !!name.trim() : step === 1 ? !!goal.trim() : ids.length > 0;
  return (
    <form
      className="hd-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (!valid) return;
        if (step < 2) {
          setStep(step + 1);
          return;
        }
        onCreate({
          id: uid(),
          name: name.trim(),
          goal: goal.trim(),
          kind: /design|interface/i.test(name)
            ? "design"
            : /music|sound/i.test(name)
              ? "music"
              : /agent|coding|software|AI/i.test(name)
                ? "code"
                : "custom",
          owned: true,
          public: false,
          schedule: false,
          cadence: "Weekly · Thursday",
          length: "Standard",
          memory: true,
          keywords: "",
          sourceIds: ids,
          sections: [...sectionNames],
        });
      }}
    >
      <div className="hd-wizard-steps">
        {["Topic", "Learning goal", "Sources"].map((s, n) => (
          <span key={s} className={n <= step ? "active" : ""}>
            <i>{n < step ? <Check size={12} /> : n + 1}</i>
            {s}
          </span>
        ))}
      </div>
      {plan === "Free" ? (
        <div className="hd-error">
          Custom topics are a Pro feature. Change the demo plan in Settings to
          try this flow, or follow a topic from Explore.
        </div>
      ) : (
        <>
          {step === 0 && (
            <>
              <span className="hd-eyebrow">START WITH A CURIOSITY</span>
              <label className="hd-field">
                What would you like to keep up with?
                <input
                  autoFocus
                  required
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Building with AI"
                />
              </label>
              <div className="hd-suggestion-pills">
                {["Agentic coding", "Thoughtful design", "New music"].map(
                  (s) => (
                    <button type="button" key={s} onClick={() => setName(s)}>
                      {s}
                      <Plus size={12} />
                    </button>
                  ),
                )}
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <label className="hd-field">
                What matters to you about {name}?
                <textarea
                  required
                  rows={5}
                  maxLength={2000}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="Tell Header what you want to learn, why it matters, and what to skip."
                />
              </label>
              <button
                type="button"
                className="hd-link"
                onClick={() =>
                  setGoal(
                    `Help me understand practical ideas in ${name.toLowerCase()}. Focus on clear examples I can try. Skip promotional content and repeated announcements.`,
                  )
                }
              >
                <Sparkles size={14} />
                Use a suggested goal
              </button>
              <p className="hd-form-hint">
                A predefined suggestion to help you get started. You can edit
                every word.
              </p>
            </>
          )}
          {step === 2 && (
            <>
              <p className="hd-muted">
                Choose the sources that will shape your newsletter.
              </p>
              <div className="hd-tabs">
                <button
                  type="button"
                  className={mode === "existing" ? "active" : ""}
                  onClick={() => setMode("existing")}
                >
                  Existing sources
                </button>
                <button
                  type="button"
                  className={mode === "recommend" ? "active" : ""}
                  onClick={() => setMode("recommend")}
                >
                  Recommendations
                </button>
              </div>
              {mode === "recommend" && (
                <p className="hd-form-hint">
                  Sample recommendations from the demo library. Select the ones
                  you want.
                </p>
              )}
              <div className="hd-picker-list">
                {sources
                  .filter(
                    (s) =>
                      mode === "existing" ||
                      s.group ===
                        (/design/i.test(name)
                          ? "Design library"
                          : /music/i.test(name)
                            ? "Listening room"
                            : "Building with AI"),
                  )
                  .map((s) => (
                    <label key={s.id}>
                      <input
                        type="checkbox"
                        checked={ids.includes(s.id)}
                        onChange={(e) =>
                          setIds(
                            e.target.checked
                              ? [...ids, s.id]
                              : ids.filter((id) => id !== s.id),
                          )
                        }
                      />
                      <SourceIcon type={s.type} size={17} />
                      <span>
                        {s.name}
                        <small>{s.group}</small>
                      </span>
                    </label>
                  ))}
              </div>
              <p className="hd-form-hint">
                Add new URLs and import feeds in Sources. You can change this
                selection later.
              </p>
            </>
          )}
        </>
      )}
      <div className="hd-form-actions">
        <button
          type="button"
          className="hd-btn"
          onClick={() => (step ? setStep(step - 1) : close())}
        >
          {step ? "Back" : "Cancel"}
        </button>
        <button
          className="hd-btn hd-btn-primary"
          disabled={!valid || plan === "Free"}
        >
          {step === 2 ? "Create topic" : "Continue"}
          <ArrowRight size={15} />
        </button>
      </div>
    </form>
  );
}

export function TopicForm({
  topic,
  sources,
  onSave,
  close,
  onDelete,
}: {
  topic: Topic;
  sources: Source[];
  onSave: (t: Topic) => void;
  close: () => void;
  onDelete: () => void;
}) {
  const [value, setValue] = useState<Topic>(() => structuredClone(topic));
  const [confirm, setConfirm] = useState(false);
  const set = <K extends keyof Topic>(key: K, v: Topic[K]) =>
    setValue((t) => ({ ...t, [key]: v }));
  const move = (index: number, delta: number) => {
    const sections = [...value.sections];
    [sections[index], sections[index + delta]] = [
      sections[index + delta],
      sections[index],
    ];
    set("sections", sections);
  };
  return (
    <form
      className="hd-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ ...value, name: value.name.trim(), goal: value.goal.trim() });
      }}
    >
      <label className="hd-field">
        Topic name
        <input
          required
          maxLength={80}
          value={value.name}
          onChange={(e) => set("name", e.target.value)}
        />
      </label>
      <label className="hd-field">
        Your learning goal
        <textarea
          required
          rows={4}
          maxLength={4000}
          value={value.goal}
          onChange={(e) => set("goal", e.target.value)}
        />
      </label>
      <label className="hd-field">
        Keywords
        <input
          value={value.keywords}
          onChange={(e) => set("keywords", e.target.value)}
          placeholder="Separate keywords with commas"
        />
      </label>
      <div className="hd-two-fields">
        <label className="hd-field">
          Newsletter length
          <select
            value={value.length}
            onChange={(e) => set("length", e.target.value)}
          >
            {["Brief", "Standard", "In-Depth"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label className="hd-field">
          Schedule
          <select
            value={value.cadence}
            onChange={(e) => set("cadence", e.target.value)}
          >
            {[
              "Daily · Morning",
              "Weekly · Monday",
              "Weekly · Thursday",
              "Weekly · Friday",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="hd-setting-group">
        {[
          {
            key: "schedule" as const,
            label: "Scheduled delivery",
            text: "Simulated schedule; no email will be sent.",
          },
          {
            key: "memory" as const,
            label: "Remember previous newsletters",
            text: "Keep future issues aware of what came before.",
          },
          {
            key: "public" as const,
            label: "Public topic",
            text: "Demo visibility only; nothing is published.",
          },
        ].map((s) => (
          <label className="hd-toggle-row" key={s.key}>
            <span>
              {s.label}
              <small>{s.text}</small>
            </span>
            <input
              type="checkbox"
              checked={value[s.key]}
              onChange={(e) => set(s.key, e.target.checked)}
            />
          </label>
        ))}
      </div>
      <span className="hd-field-title">Newsletter sections</span>
      <div className="hd-section-picker">
        {value.sections.map((s, n) => (
          <div key={s}>
            <label>
              <input
                type="checkbox"
                checked
                disabled={s === "Key Insights"}
                onChange={() =>
                  set(
                    "sections",
                    value.sections.filter((x) => x !== s),
                  )
                }
              />
              {s}
              {s === "Key Insights" && <small>Required</small>}
            </label>
            <button
              type="button"
              className="hd-icon"
              disabled={n === 0}
              aria-label={`Move ${s} up`}
              onClick={() => move(n, -1)}
            >
              <ArrowUp size={14} />
            </button>
            <button
              type="button"
              className="hd-icon"
              disabled={n === value.sections.length - 1}
              aria-label={`Move ${s} down`}
              onClick={() => move(n, 1)}
            >
              <ArrowDown size={14} />
            </button>
          </div>
        ))}
        {sectionNames
          .filter((s) => !value.sections.includes(s))
          .map((s) => (
            <label className="hd-disabled-section" key={s}>
              <input
                type="checkbox"
                checked={false}
                onChange={() => set("sections", [...value.sections, s])}
              />
              {s}
            </label>
          ))}
      </div>
      <span className="hd-field-title">Sources</span>
      <div className="hd-picker-list">
        {sources.map((s) => (
          <label key={s.id}>
            <input
              type="checkbox"
              checked={value.sourceIds.includes(s.id)}
              onChange={(e) =>
                set(
                  "sourceIds",
                  e.target.checked
                    ? [...value.sourceIds, s.id]
                    : value.sourceIds.filter((id) => id !== s.id),
                )
              }
            />
            <SourceIcon type={s.type} size={15} />
            <span>{s.name}</span>
          </label>
        ))}
      </div>
      <div className="hd-form-actions">
        <button className="hd-btn" type="button" onClick={close}>
          Cancel
        </button>
        <button
          className="hd-btn hd-btn-primary"
          disabled={!value.name.trim() || !value.goal.trim()}
        >
          Save changes
          <Check size={15} />
        </button>
      </div>
      <div className="hd-danger-zone">
        {confirm ? (
          <>
            <p>Delete this topic and its newsletters from the demo?</p>
            <button
              type="button"
              className="hd-btn hd-btn-danger"
              onClick={onDelete}
            >
              Delete topic
            </button>
            <button
              type="button"
              className="hd-link"
              onClick={() => setConfirm(false)}
            >
              Keep topic
            </button>
          </>
        ) : (
          <button
            type="button"
            className="hd-link"
            onClick={() => setConfirm(true)}
          >
            <Trash2 size={13} />
            Delete topic
          </button>
        )}
      </div>
    </form>
  );
}
