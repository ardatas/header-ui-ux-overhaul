# Header dashboard design plan

Status: frontend demo implemented September 24, 2026, after the user instructed us to proceed with reasonable defaults. Send refines the goal; Generate newsletter starts simulated generation. The matrix below preserves the original design mapping, not a claim that every row is implemented. See `dashboard-demo-verification.md` and the updated checklist for exact coverage. No backend is connected.

## Evidence and decisions

- User direction: use https://www.prompt-kit.com/chat-ui as the baseline; adapt all content to Header. Reuse the landing-page composer styling, source marks, logo, palette, fonts, and sizing conventions. Provide synthetic newsletters and resources so visitors can try the flow. Preserve the landing page and existing uncommitted work.
- Repository evidence: the current app is a React/Vite landing page with a local topic draft. There is no dashboard or router. The three modified source files preserve the mobile-only source-flow removal and its navigation anchor.
- Prior product inspection: the checklist records visible controls from September 23. It does not prove account-changing backend operations. Its unchecked boxes mean redesign coverage is outstanding.
- Reference inspected in the browser: the Chat UI page, its Full chat app example, the mobile sidebar, and the initial Tool calling example. The full app has a header, collapsible history navigation, scrollable conversation, compact response actions, and bottom composer. The tool-calling example was inspected only in its initial state; no processing stages were verified there.
- The implemented defaults are identified below; other proposals remain provisional. Natural-language refinement, clarification dialogue, and simulated processing stages are prototype behavior, not verified Header backend capabilities.

## Reference translation

| Prompt Kit pattern | Header adaptation |
| --- | --- |
| History sidebar and search | Home, owned topics, subscriptions, topic search, and the secondary destinations |
| New Chat | New topic, preserving name, goal, and source-selection steps |
| Conversation header | Topic name, ownership/visibility, goal context, schedule status, and settings |
| Scrollable conversation | Dated newsletters with a separate compact goal-refinement conversation |
| Bottom prompt input | Header-styled goal composer with supported source attachments |
| Message action row | Citations, sources, transparency, capture, follow-up, sharing, and owned-issue deletion |
| History grouping and scroll-to-bottom pattern | Issue/date index, older-issue expansion, and return to latest |
| Mobile sidebar drawer | Access to every Header destination, with return to reading |
| Generic search, files, model, and microphone controls | Replace only where a confirmed Header capability exists; no arbitrary model picker or voice/file-upload claims |

References: [Chat UI](https://www.prompt-kit.com/chat-ui), [Full chat app](https://www.prompt-kit.com/c/full-chat-app), [Tool calling](https://www.prompt-kit.com/demo/tool-calling).

## Visual plan

Keep the current tokens: navy background `#0f172a`, deep background `#0b1120`, surface `#172034`, warm text `#f5f0e8`, orange `#e5842d`, and CTA red `#c44228`. Use existing secondary, border, hover, and success tokens for their current roles. Instrument Serif carries newsletter titles; DM Sans carries reading text and controls; JetBrains Mono carries dates and small process labels. Use the existing button and source-icon components. Keep landing-page sizing conventions for shared controls; give long-form newsletter text enough room to read comfortably.

The proposed signature is an expandable explanation of how an issue came together, using Header's source icons and goal context. Keep the rest of the workspace quiet. Detailed stages in the frontend demo must say they are simulated; actual integration should show only backend-supported status.

```text
Desktop
+-------------------+-----------------------------------+------------------+
| Header / Home     | Topic · schedule · settings       | Issue index      |
| New topic         +-----------------------------------+ (when opened)    |
| Search            | Sources -> Goal filter -> Issue   |                  |
| My topics         | Dated newsletter / reading area   | or topic settings|
| Subscriptions     | Citations and issue actions       |                  |
| Explore / Sources +-----------------------------------+------------------+
| Clear Tabs        | Goal composer · generation action                    |
| Follow-ups        |                                                       |
| Settings          |                                                       |
+-------------------+-------------------------------------------------------+

Mobile
+-----------------------------------+
| Menu · Topic · Settings           |
| Issue/date navigation             |
| Newsletter / process disclosure   |
| Issue actions                     |
| Goal composer                     |
+-----------------------------------+
```

The reference's familiar chat layout fits the requested workspace. To keep Header's purpose clear, full newsletters use reading typography and dated issue boundaries. Goal discussion stays compact. This preserves the reference's navigation and composer without making a long newsletter look like a short instant reply.

## Proposed behavior and unresolved decisions

| Area | Proposed handling | Decision status |
| --- | --- | --- |
| Entry | Open the sample topic workspace; Overview remains one click away | Assistant default, reversible |
| Composer | Send refines the goal; a separate Generate newsletter action starts a run | Implemented frontend default after instruction to proceed |
| Topic/goal hierarchy | Keep topic and goal as separate data objects; do not invent multiple-goal creation controls | Current UI exposure needs verification |
| Generation | Pending, completed, failed, and quota states; older issues remain readable | Proposed demo behavior; backend events still need mapping |
| Edits during a run | Apply changes to future runs; preserve the goal snapshot of the running issue | Assistant proposal |
| History | Latest issue first, dated older entries, issue index, return to latest | Assistant default, reversible |
| Goal settings | Dedicated panel for name, relevance, keywords, sources, length, sections, schedule, memory, visibility, and deletion | Planned |
| Ownership | Owned topics expose editing; subscriptions expose unsubscribe and customize | Checklist requirement |
| New issue indicators | Show generation time/status; do not claim persisted unread tracking | Read tracking unverified |
| Routing | `/dashboard/` entry, hash navigation, lazy-loaded module and scoped styles; Vercel entry rewrites configured | Implemented; hosting rewrite not deployed |
| Demo content | Synthetic topic, source groups, articles, issue history, and follow-ups; predefined output and explicit demo state | User requested |
| Unknown product behavior | Preserve a design destination, label the gap, and await supplied backend mapping or verify public documentation/UI | No silent scope deferral |

Conceptual process: select sources and a goal, collect relevant material, filter it against the goal, compose the configured newsletter, then read and act. This is an explanatory design model. It is not a verified sequence of backend job events or progress percentages.

## What the reference does not accommodate by itself

Prompt Kit's chat shell needs additions for Home, topic setup, schedules and section settings, source groups and imports, public subscriptions, filtered feeds, transparency, Clear Tabs, follow-ups, account settings, and plan restrictions. Mobile access and destructive-action confirmations must cover these additions too.

Populated experiment details, nested groups, multiple-goal UI, import partial failures, API-key lifecycle, billing transitions, and advanced Clear Tabs behavior still need verification. Synthetic examples can illustrate a proposed frontend, but cannot establish those as verified product behavior. No checklist requirement has been deferred by agreement.

## Complete requirement mapping

Each row below preserves the original checklist wording. "Planned" means a proposed screen or control, not implemented or tested coverage. "Verify" marks behavior for which the checklist lacks sufficient UI/state evidence. All account-changing actions remain local simulations in the frontend prototype.


### Dashboard and navigation

| Requirement | Proposed destination | Status |
| --- | --- | --- |
| List the user's own topics separately from subscribed topics. | Home and global sidebar/mobile drawer | Planned |
| Open a topic or goal from its dashboard card. | Home and global sidebar/mobile drawer | Planned |
| Display the latest newsletter's age/date and generation status. | Home and global sidebar/mobile drawer | Planned |
| Represent completed, in-progress, and failed newsletters. | Home and global sidebar/mobile drawer | Planned |
| Open and close dashboard search. | Home/sidebar > Search | Planned |
| Start topic creation from the desktop action and mobile floating button. | Home and global sidebar/mobile drawer | Planned |
| Unsubscribe from a followed topic. | Home and global sidebar/mobile drawer | Planned |
| Show follow-up summary, empty state, and link to all follow-ups. | Home > Follow-ups summary | Planned |
| Link to curated topic discovery. | Home and global sidebar/mobile drawer | Planned |
| Preserve desktop navigation: Dashboard, Explore, Sources, Clear Tabs, Follow-ups, Settings. | Home and global sidebar/mobile drawer | Planned |
| Preserve mobile access to every destination, including features reached through Settings. | Home and global sidebar/mobile drawer | Planned |
| Preserve active navigation state, back navigation, and landing-page access. | Home and global sidebar/mobile drawer | Planned |

### Topic creation

| Requirement | Proposed destination | Status |
| --- | --- | --- |
| Three-step progress with Back/Next navigation. | New topic wizard: name, goal, sources | Planned |
| Enter a topic name. | New topic wizard: name, goal, sources | Planned |
| Describe the learning goal and relevance criteria. | New topic wizard: name, goal, sources | Planned |
| Access assistance for articulating/refining the goal. | New topic wizard: name, goal, sources | Planned |
| Select existing personal or curated source groups. | New topic wizard: name, goal, sources | Planned |
| Create a source group from pasted URLs: group name, URL input, preview, create group. | New topic wizard: name, goal, sources | Planned |
| Request source recommendations based on the topic and goal. | New topic wizard: name, goal, sources | Planned |
| Reach OPML and FreshRSS imports from advanced options. | New topic wizard: name, goal, sources | Planned |
| Validate required inputs and disable unavailable actions. | New topic wizard: name, goal, sources | Planned |
| Create the topic with the selected goal and sources; represent plan restrictions and submission state. | New topic wizard: name, goal, sources | Planned |

### Topic/goal detail and editing

| Requirement | Proposed destination | Status |
| --- | --- | --- |
| Show topic name, expandable description, and public/private/curated indicators. | Topic workspace and goal settings panel | Planned |
| Show subscriber, source-group, and source counts where applicable. | Topic workspace and goal settings panel | Planned |
| Open the latest newsletter and newsletter history. | Topic workspace > issue/date index | Planned |
| Generate a newsletter on demand and show its progress/failure state. | Topic header > Generate newsletter and run status | Planned |
| Show automatic-schedule status. | Topic header schedule summary | Planned |
| List linked source groups and open their details. | Topic workspace and goal settings panel | Planned |
| Offer goal-based source discovery. | Topic workspace and goal settings panel | Planned |
| Show the filtered feed with entry counts, titles, source names, dates, previews, links, and pagination. | Topic workspace > Feed tab | Planned |
| Edit name, description, keywords, and linked source groups. | Topic workspace and goal settings panel | Planned |
| Offer goal refinement assistance. | Topic workspace and goal settings panel | Planned |
| Choose newsletter length: Brief, Standard, In-Depth in the goal editor. | Goal settings > Length | Planned |
| Configure newsletter sections: TL;DR, Read & Act, Key Insights, Emerging Patterns, Dissenting Views. | Goal settings > Sections | Planned |
| Reorder sections, enable/disable optional sections, and choose detail levels where supported. | Goal settings > Sections > order and detail controls | Planned |
| Keep Key Insights marked as required. | Goal settings > Sections > required indicator | Planned |
| Control public/private visibility. | Goal settings > Visibility | Planned |
| Enable/disable memory from previous newsletters. | Goal settings > Memory | Planned |
| Enable/disable scheduled newsletters; preserve the available timing controls. | Goal settings > Schedule | Planned |
| Save, cancel, and delete a goal, with ownership and plan restrictions. | Topic workspace and goal settings panel | Planned |

### Explore and subscriptions

| Requirement | Proposed destination | Status |
| --- | --- | --- |
| Browse curated/public topic cards with descriptions and counts. | Explore and Settings > Topics & subscriptions | Planned |
| Open a public topic and its latest newsletter/feed. | Explore and Settings > Topics & subscriptions | Planned |
| Subscribe, show subscribed state, and unsubscribe. | Explore and Settings > Topics & subscriptions | Planned |
| Share a public topic. | Explore and Settings > Topics & subscriptions | Planned |
| Customize a public topic into the user's own version. | Explore and Settings > Topics & subscriptions | Planned |
| Start an original topic from Explore. | Explore and Settings > Topics & subscriptions | Planned |
| Manage own scheduled topics and public subscriptions from Topics & Subscriptions. | Explore and Settings > Topics & subscriptions | Planned |
| Display paused schedule state and schedule enable/disable controls. | Explore and Settings > Topics & subscriptions | Planned |
| Preserve per-topic newsletter-length controls shown on the subscriptions page. | Explore and Settings > Topics & subscriptions | Planned |

### Newsletter reading

| Requirement | Proposed destination | Status |
| --- | --- | --- |
| Show generation status, date, reading-time estimate, source/article counts, and content date range. | Newsletter reader and issue action row | Planned |
| Link back to the originating goal/topic. | Newsletter reader and issue action row | Planned |
| Render the newsletter's configured sections and rich text. | Newsletter reader and issue action row | Planned |
| Show/hide inline citations and expand the source list. | Reader citation toggle and expandable sources | Planned |
| Open original source content. | Newsletter reader and issue action row | Planned |
| Open the newsletter transparency page: “What went into this newsletter.” | Issue actions > What went into this newsletter | Planned |
| Make an owned newsletter public and preserve sharing visibility controls. | Newsletter reader and issue action row | Planned |
| Delete an owned newsletter. | Newsletter reader and issue action row | Planned |
| Start a follow-up from a recommendation using “+ Follow up.” | Reader recommendation > Follow up; Follow-ups list | Planned |
| Capture a highlighted insight for later action. | Reader text selection > Capture; Follow-ups > Captured | Planned |
| Reach the feedback form. | Newsletter actions > Feedback | Planned |

### Sources and source groups

| Requirement | Proposed destination | Status |
| --- | --- | --- |
| Browse personal/public groups with names, descriptions, source counts, and visibility badges. | Sources > group list, group detail, and source picker | Planned |
| Create a group and edit its name, description, and visibility. | Sources > group list, group detail, and source picker | Planned |
| Clone a public group. | Sources > group list, group detail, and source picker | Planned |
| Show goals using a group. | Sources > group list, group detail, and source picker | Planned |
| List group members with source-type markers and links to source details. | Sources > group list, group detail, and source picker | Planned |
| Add sources by creating new ones, choosing existing ones, or adding an email source. | Sources > group list, group detail, and source picker | Planned |
| Paste multiple URLs and preview detected sources before adding them. | Sources > group list, group detail, and source picker | Planned |
| Support RSS/site feeds, Substack, YouTube channels, subreddits, and Pro-only X accounts. | Sources > group list, group detail, and source picker | Planned |
| Retain blog and podcast feeds within RSS support. | Sources > group list, group detail, and source picker | Planned |
| Search the source picker; distinguish available sources from sources already in the group. | Sources > group list, group detail, and source picker | Planned |
| Select multiple sources/select all and manage group membership. | Sources > group list, group detail, and source picker | Planned |
| Remove an individual source from a group. | Sources > group list, group detail, and source picker | Planned |
| Refresh all sources in a group. | Sources > group list, group detail, and source picker | Planned |
| Delete an owned group. | Sources > group list, group detail, and source picker | Planned |
| Show recent group entries with metadata, original links, and pagination. | Sources > group list, group detail, and source picker | Planned |

### Imports and email sources

| Requirement | Proposed destination | Status |
| --- | --- | --- |
| OPML/XML import: file selection, progress steps, destination selection, and results/error states. | Sources > Import > OPML wizard | Planned |
| FreshRSS: instance URL, username, API password, and connection validation. | Sources > Import > FreshRSS connection form | Planned |
| Preserve import grouping choices and success/partial-failure reporting. | Sources > Import and Settings > Email sources | Planned |
| Add an email source through a source group. | Sources > Import and Settings > Email sources | Planned |
| Manage newsletter forwarding addresses under Email sources. | Settings > Email sources | Planned |
| Show the no-email-sources state and route users to setup. | Settings > Email sources > empty state | Planned |

### Clear Tabs

| Requirement | Proposed destination | Status |
| --- | --- | --- |
| Set a topic name and learning objective. | Clear Tabs composer and History | Planned |
| Paste multiple URLs; display URL count and the 100-URL limit. | Clear Tabs > URL input and counter | Planned |
| Handle one-per-line, comma-separated, and whitespace-separated URLs; missing scheme guidance. | Clear Tabs composer and History | Planned |
| Choose Sorted by subject, A reading list, or A newsletter. | Clear Tabs composer and History | Planned |
| Clear pasted URLs, cancel, validate, and submit. | Clear Tabs composer and History | Planned |
| Show generation status and applicable daily-use limits. | Clear Tabs > generation status and quota notice | Planned |
| Open previous Clear Tabs submissions through History. | Clear Tabs composer and History | Planned |
| Preserve the Chrome extension entry point for sending open tabs. | Clear Tabs > Send open tabs link | Planned |

### Follow-ups, captured insights, and agent experiments

| Requirement | Proposed destination | Status |
| --- | --- | --- |
| Preserve the Follow-ups, Captured, and Agent experiments tabs and Beta indicator. | Follow-ups > Follow-ups, Captured, and Agent experiments | Planned |
| Show follow-up tracking initiated from newsletter actions. | Follow-ups > Follow-ups, Captured, and Agent experiments | Planned |
| Show captured insights and the path toward an experiment. | Follow-ups > Follow-ups, Captured, and Agent experiments | Planned |
| Show synced agent experiments. | Follow-ups > Follow-ups, Captured, and Agent experiments | Planned |
| Preserve distinct empty states with clear ways to get started. | Follow-ups > Follow-ups, Captured, and Agent experiments | Planned |
| Link to the Header skill and installation guidance. | Follow-ups > Follow-ups, Captured, and Agent experiments | Planned |
| Design populated detail/list states after inspecting a populated example; this account currently has none. | Follow-ups > detail views; require populated reference or mark proposal | Verify |

### Settings, plan, and resources

| Requirement | Proposed destination | Status |
| --- | --- | --- |
| Dark/light appearance switch. | Shared control in Settings > Appearance and landing navigation; persisted across both pages | Implemented in frontend demo |
| Account identity and sign out. | Settings > Account and sidebar account menu | Planned |
| Current plan, pricing, included features, and trial status. | Settings > appearance, account, plan, API keys, and resources | Planned |
| Upgrade entry point and paid/expired-trial restrictions. | Settings > appearance, account, plan, API keys, and resources | Planned |
| Preserve current plan limits: Free subscriptions and 3 Clear Tabs uses/day; Pro custom topics, source allowance, scheduling, manual generation, agent access, and X sources. | Settings > Plan; contextual feature/limit states | Planned |
| API Keys page, key-creation entry point, and API documentation link. | Settings > API keys | Planned |
| Settings links to subscriptions, source groups, Clear Tabs, email sources, and follow-ups. | Settings > appearance, account, plan, API keys, and resources | Planned |
| Documentation, Chrome extension, About, Discord, feedback, privacy policy, and terms links. | Settings > appearance, account, plan, API keys, and resources | Planned |

### Documented features needing UI/state verification

| Requirement | Proposed destination | Status |
| --- | --- | --- |
| Multiple goals per topic and relevance questions: confirm current UI exposure. | Topic workspace > goal context; verify goal-switching/creation exposure | Verify |
| Nested source groups: confirm current group-editor support. | Sources > group editor; verify nesting support | Verify |
| Individual source edit/delete/refresh/validation: inspect owner-specific detail controls. | Sources > source detail; verify owner controls | Verify |
| Import grouping and partial-failure results: inspect populated examples. | Sources > Import > results | Verify |
| Clear Tabs custom layouts, reruns, and per-link outcomes: confirm UI exposure. | Clear Tabs > result and History detail | Verify |
| API-key scope selection, one-time secret display, listing, and revocation: inspect without creating credentials. | Settings > API keys | Verify |
| Eligible trial start, billing portal, and post-trial/Pro-lapse states: verify on the appropriate account tier. | Settings > Plan | Verify |
| Agent experiment details and lifecycle: inspect populated examples. | Follow-ups > Agent experiments > detail | Verify |
| No named-AI-model picker has been verified for newsletters. Do not present it as an existing feature. | No model selector; capability remains unverified | Verify |

### Cross-cutting redesign checks

| Requirement | Proposed destination | Status |
| --- | --- | --- |
| Loading, empty, populated, in-progress, failed, and success states. | All screens and shared controls | Planned |
| Owner vs subscriber vs public-view permissions. | All screens and shared controls | Planned |
| Free, Pro, trial, expired-trial, and quota-reached states. | All screens and shared controls | Planned |
| Field validation, disabled actions, error feedback, and retry paths where supported. | All screens and shared controls | Planned |
| Confirmation/cancel flows for destructive or account-changing actions. | All screens and shared controls | Planned |
| Desktop/mobile navigation, long titles, long descriptions, and dense lists. | All screens and shared controls | Planned |
| Keyboard access, labels, focus visibility, contrast, and reduced-motion support. | All screens and shared controls | Planned |
| Frontend-only prototype actions must clearly distinguish demo behavior from real account operations. | All screens and shared controls | Planned |

Mapped 121 checklist items. This matrix remains the proposed destination map. Implemented coverage and browser evidence are recorded in `dashboard-redesign-checklist.md` and `dashboard-demo-verification.md`.

### Newsletter reader revision — 24 September 2026

The user's subsequent format correction supersedes the separate citation-toggle and section-card reader proposal above. Render the generated newsletter as one rich-text document, preserving its own heading order, paragraphs, lists, emphasis, and inline links. Named sections remain generation preferences, not frontend layout slots. The implemented reader accepts a stored Markdown body and supports capture/follow-up on arbitrary selected text. Source metadata and transparency remain separate issue-level controls.
