import { readAppearance } from "../lib/appearance";
import type { SourceType } from "../components/ui/source-icon";

export type SectionName =
  | "TL;DR"
  | "Read & Act"
  | "Key Insights"
  | "Emerging Patterns"
  | "Dissenting Views";
export const sectionNames: SectionName[] = [
  "TL;DR",
  "Key Insights",
  "Read & Act",
  "Emerging Patterns",
  "Dissenting Views",
];
export type Topic = {
  id: string;
  name: string;
  goal: string;
  kind: "code" | "design" | "music" | "custom";
  owned: boolean;
  public: boolean;
  schedule: boolean;
  cadence: string;
  length: string;
  memory: boolean;
  keywords: string;
  sourceIds: string[];
  sections: SectionName[];
};
export type Source = {
  id: string;
  name: string;
  type: SourceType;
  description: string;
  url: string;
  group: string;
};
export type Issue = {
  markdown: string;
  id: string;
  topicId: string;
  date: string;
  title: string;
  goal: string;
  sections: SectionName[];
  sourceIds: string[];
  public: boolean;
  length: string;
};
export type Followup = {
  id: string;
  title: string;
  topic: string;
  done: boolean;
  kind: "followup" | "capture";
};
export type TabReport = {
  id: string;
  name: string;
  goal: string;
  urls: string[];
  mode: string;
  date: string;
};
export type Demo = {
  topics: Topic[];
  issues: Issue[];
  sources: Source[];
  followups: Followup[];
  reports: TabReport[];
  appearance: "dark" | "light";
  plan: "Pro" | "Free" | "Trial";
  outcome: "success" | "failure" | "limit";
};
export const seedSources: Source[] = [
  {
    id: "s1",
    name: "The Engineering Notebook",
    type: "rss",
    description: "Practical notes on building reliable software.",
    url: "https://example.com/engineering",
    group: "Building with AI",
  },
  {
    id: "s2",
    name: "Agents in Practice",
    type: "youtube",
    description: "Walkthroughs of small, repeatable agent workflows.",
    url: "https://example.com/agents",
    group: "Building with AI",
  },
  {
    id: "s3",
    name: "The Thoughtful Stack",
    type: "newsletter",
    description: "A weekly letter about tools, teams, and trade-offs.",
    url: "https://example.com/stack",
    group: "Building with AI",
  },
  {
    id: "s4",
    name: "Developer conversations",
    type: "reddit",
    description: "Lessons and questions from working developers.",
    url: "https://example.com/developers",
    group: "Building with AI",
  },
  {
    id: "s5",
    name: "Interface Notes",
    type: "rss",
    description: "Thoughtful details in everyday digital products.",
    url: "https://example.com/interfaces",
    group: "Design library",
  },
  {
    id: "s6",
    name: "Design, Considered",
    type: "podcast",
    description: "Conversations on making useful, understandable things.",
    url: "https://example.com/design",
    group: "Design library",
  },
  {
    id: "s7",
    name: "After Hours",
    type: "newsletter",
    description: "Independent sounds and the people behind them.",
    url: "https://example.com/music",
    group: "Listening room",
  },
];
export const seedTopics: Topic[] = [
  {
    id: "agentic-coding",
    name: "Agentic coding",
    goal: "Help me build better with AI coding agents. Focus on practical workflows, context management, and lessons from real projects. Skip model-launch hype.",
    kind: "code",
    owned: true,
    public: false,
    schedule: true,
    cadence: "Weekly · Thursday",
    length: "Standard",
    memory: true,
    keywords: "agent workflows, context, testing",
    sourceIds: ["s1", "s2", "s3", "s4"],
    sections: [...sectionNames],
  },
  {
    id: "thoughtful-design",
    name: "Thoughtful design",
    goal: "Find small interface decisions that make software easier to use. Prioritize accessibility, clear language, and useful examples.",
    kind: "design",
    owned: true,
    public: false,
    schedule: true,
    cadence: "Weekly · Monday",
    length: "Brief",
    memory: true,
    keywords: "interfaces, accessibility",
    sourceIds: ["s5", "s6"],
    sections: [...sectionNames],
  },
  {
    id: "new-music",
    name: "New music",
    goal: "Discover independent electronic music, interesting textures, and the stories behind new sounds.",
    kind: "music",
    owned: false,
    public: true,
    schedule: false,
    cadence: "Weekly · Friday",
    length: "Standard",
    memory: false,
    keywords: "independent, electronic",
    sourceIds: ["s7"],
    sections: [...sectionNames],
  },
];
export const issueTitles = {
  custom: [
    "A clearer view of your next question.",
    "An idea to carry forward.",
    "A little more perspective.",
  ],
  code: [
    "Better context. Better work.",
    "Small tasks, stronger feedback.",
    "A little structure goes a long way.",
  ],
  design: [
    "The details that make it click.",
    "Less guessing. More understanding.",
    "Make the next step obvious.",
  ],
  music: [
    "Something a little unexpected.",
    "A slower kind of discovery.",
    "Worth another listen.",
  ],
};
export const content = {
  custom: {
    summary:
      "This sample issue shows how your selected sources and learning goal can become a focused read. Its text is predefined for the demo; your goal is saved separately and remains editable.",
    insights: [
      {
        title: "Start with the question you care about.",
        text: "A useful learning goal makes room for a specific question. Name what you want to understand and the kind of examples that would make it useful.",
        takeaway:
          "Choose one question you would like your next newsletter to answer.",
        source: 0,
      },
      {
        title: "Bring more than one perspective.",
        text: "A mix of sources can reveal different assumptions about the same subject. Compare an explanation, a practical example, and a thoughtful critique.",
        takeaway:
          "Add a source that approaches your topic from a different angle.",
        source: 1,
      },
      {
        title: "Keep one idea to try.",
        text: "A short read becomes more useful when it leaves you with a manageable next step. Save a question, revisit a source, or try a small experiment.",
        takeaway: "Capture one idea before moving on to the next issue.",
        source: 2,
      },
    ],
    action: "Turn one question into a small next step.",
    actionText:
      "Write down what you want to understand and choose one source to explore in more depth.",
    pattern:
      "This is where a completed newsletter could connect recurring ideas across your selected sources. The demo illustrates the layout without analyzing live material.",
    dissent:
      "This section gives a contrasting perspective room to be heard. Its sample content demonstrates the reading flow, rather than a researched conclusion about your topic.",
  },
  code: {
    summary:
      "The useful shift this week: spend less time perfecting one enormous prompt, and more time giving your agent a small task, the right context, and a way to check its work.",
    insights: [
      {
        title: "Give context a home, not a longer prompt.",
        text: "A short project guide can keep conventions close to the code. Start with the commands that matter, the boundaries to respect, and one example of what good work looks like.",
        takeaway:
          "Try a short project guide before adding another paragraph to every prompt.",
        source: 0,
      },
      {
        title: "Short feedback loops make mistakes cheaper.",
        text: "Break a change into pieces you can inspect. A focused check after each meaningful step gives the agent useful feedback while the problem is still small.",
        takeaway: "Ask for one working slice, review it, then move on.",
        source: 1,
      },
      {
        title: "Keep a human in the review.",
        text: "A passing test is one piece of evidence. Read the change against the original request, check the awkward cases, and look for assumptions the test never exercised.",
        takeaway:
          "Review the behavior you asked for, as well as the code that changed.",
        source: 2,
      },
    ],
    action: "Write a five-line project guide for your next agent task.",
    actionText:
      "Include the goal, the relevant files, one constraint, the check to run, and what a finished result should look like.",
    pattern:
      "The examples share a practical habit: make the task smaller and the feedback more specific. Better results come from the workflow around the agent as much as from the prompt.",
    dissent:
      "More structure is not always better. For a quick, isolated change, a large instruction file can add more noise than useful context. Keep only what earns its place.",
  },
  design: {
    summary:
      "This edition looks at the small choices that reduce hesitation: clear button labels, visible state changes, and interfaces that keep the next step close to the task.",
    insights: [
      {
        title: "Let the button say what happens.",
        text: "Specific labels help people predict an outcome. “Save changes” carries more information than “Continue” when a form is about to be saved.",
        takeaway: "Read every action label without its surrounding paragraph.",
        source: 0,
      },
      {
        title: "Keep feedback next to the change.",
        text: "A visible confirmation near the edited field tells people that their work was saved. It also keeps them in the context of the task.",
        takeaway: "Place useful confirmation where attention already is.",
        source: 1,
      },
      {
        title: "Make room for the long version.",
        text: "Interfaces need to survive long titles, larger text, and narrow screens. Design with real sentences before reaching for ellipses.",
        takeaway: "Try a long title and keyboard navigation early.",
        source: 0,
      },
    ],
    action: "Rewrite three ambiguous buttons in a product you use.",
    actionText:
      "Describe the outcome in the label, then check whether a new user could predict the next screen.",
    pattern:
      "Clear language and visible state changes solve many of the same problems: they help people understand what has happened and what they can do next.",
    dissent:
      "Explanations can become clutter. When a convention is already familiar, an extra label may slow scanning. Test the smallest useful amount of guidance.",
  },
  music: {
    summary:
      "An illustrative listening note about taking time with unfamiliar sounds, following independent curators, and finding the details that make a track worth revisiting.",
    insights: [
      {
        title: "Listen for the space between sounds.",
        text: "Sparse arrangements leave room for a small texture to change the feeling of a track. Try listening once for the rhythm and once for the background.",
        takeaway: "Give an unfamiliar track two different kinds of attention.",
        source: 0,
      },
      {
        title: "Follow a curator beyond one recommendation.",
        text: "A consistent point of view can make discovery feel more personal. Keep a small list of the people whose selections surprise you.",
        takeaway: "Start a short listening list with room for the unexpected.",
        source: 0,
      },
      {
        title: "Let a good track lead somewhere.",
        text: "Credits, labels, and collaborators can open a new path through a scene. Follow one connection instead of jumping straight to another playlist.",
        takeaway: "Explore one credit from something you enjoyed.",
        source: 0,
      },
    ],
    action: "Set aside twenty minutes for an uninterrupted listen.",
    actionText:
      "Choose something unfamiliar, put the phone down, and write one sentence about what stayed with you.",
    pattern:
      "Slower listening creates a different kind of discovery: fewer tracks, more connections.",
    dissent:
      "Sometimes a playlist in the background is exactly what you need. Discovery does not have to become another task.",
  },
};
// Only the demo generator knows these sample sections. The reader receives a
// single Markdown document and makes no assumptions about its headings.
export function createMockNewsletter(
  topic: Pick<Topic, "kind" | "sections" | "sourceIds" | "length">,
  sources: Source[],
): string {
  const sample = content[topic.kind];
  const selected = sources.filter((source) =>
    topic.sourceIds.includes(source.id),
  );
  const cite = (index: number) => {
    if (!selected.length) return "";
    const source = selected[index % selected.length];
    const label = source.name.replace(/[\\`*{}\[\]()<>!_]/g, "");
    return ` [${label}](#source-${encodeURIComponent(source.id)})`;
  };
  const sections: Record<SectionName, string> = {
    "TL;DR": sample.summary,
    "Key Insights": sample.insights
      .slice(0, topic.length === "Brief" ? 2 : 3)
      .map(
        (insight) =>
          `- **${insight.title}** ${insight.text}${cite(insight.source)}`,
      )
      .join("\n\n"),
    "Read & Act": `**What to try**\n\n- **${sample.action}** ${sample.actionText}\n\n**What to read**\n\n${selected.map((_, index) => `-${cite(index)}`).join("\n") || "Your next issue can include reading links from your selected sources."}`,
    "Emerging Patterns": sample.pattern + cite(0),
    "Dissenting Views": sample.dissent + cite(2),
  };
  return topic.sections
    .map((name) => `### ${name}\n\n${sections[name]}`)
    .join("\n\n");
}

export function createSeed(): Demo {
  return {
    topics: structuredClone(seedTopics),
    sources: structuredClone(seedSources),
    issues: seedTopics.flatMap((topic) =>
      [0, 1, 2].map((n) => ({
        id: `${topic.id}-${n}`,
        topicId: topic.id,
        date: `2026-09-${24 - n * 7}T08:00:00.000Z`,
        title: issueTitles[topic.kind][n],
        markdown: createMockNewsletter(topic, seedSources),
        goal: topic.goal,
        sections: [...topic.sections],
        sourceIds: [...topic.sourceIds],
        public: !topic.owned,
        length: topic.length,
      })),
    ),
    followups: [
      {
        id: "f1",
        title: "Try a smaller task with a clear finishing point.",
        topic: "Agentic coding",
        done: false,
        kind: "followup",
      },
      {
        id: "f2",
        title: "Audit the labels in a settings screen.",
        topic: "Thoughtful design",
        done: false,
        kind: "followup",
      },
      {
        id: "f3",
        title:
          "Useful context is specific, close to the task, and easy to maintain.",
        topic: "Agentic coding",
        done: false,
        kind: "capture",
      },
    ],
    reports: [],
    appearance: readAppearance(),
    plan: "Pro",
    outcome: "success",
  };
}
const storageKey = "header-dashboard-demo-v1";
export function loadDemo(): Demo {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (
      saved &&
      Array.isArray(saved.topics) &&
      Array.isArray(saved.issues) &&
      Array.isArray(saved.sources) &&
      Array.isArray(saved.followups) &&
      Array.isArray(saved.reports) &&
      ["dark", "light"].includes(saved.appearance) &&
      ["Pro", "Trial", "Free"].includes(saved.plan)
    ) {
      // Preserve previously saved demo work when upgrading the reader format.
      const demo = saved as Demo;
      return {
        ...demo,
        appearance: readAppearance(demo.appearance),
        issues: demo.issues.map((issue) => ({
          ...issue,
          markdown:
            typeof issue.markdown === "string"
              ? issue.markdown
              : createMockNewsletter(
                  {
                    ...issue,
                    kind:
                      demo.topics.find((topic) => topic.id === issue.topicId)
                        ?.kind || "custom",
                  },
                  demo.sources,
                ),
        })),
      };
    }
  } catch {
    /* A blocked storage API should not prevent the demo from opening. */
  }
  return createSeed();
}
export function saveDemo(demo: Demo) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(demo));
  } catch {
    /* The current session remains usable without persistence. */
  }
}
export function uid() {
  return crypto.randomUUID();
}
export function dateLabel(value: string, full = false) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: full ? "long" : "short",
    ...(full ? { year: "numeric" } : {}),
    timeZone: "UTC",
  });
}
export function parseUrls(input: string) {
  const tokens = input.split(/[\s,]+/).filter(Boolean);
  const valid: string[] = [],
    invalid: string[] = [];
  for (const token of tokens) {
    try {
      const u = new URL(
        /^[a-z][a-z\d+.-]*:/i.test(token) ? token : `https://${token}`,
      );
      if (
        !["http:", "https:"].includes(u.protocol) ||
        !u.hostname.includes(".")
      )
        throw Error();
      valid.push(u.href);
    } catch {
      invalid.push(token);
    }
  }
  return { valid: [...new Set(valid)], invalid };
}
