# Header dashboard redesign — agent handoff prompt

You are continuing my Header UI redesign project. The landing page is already implemented. We are now planning the signed-in dashboard and its connected workflows. I will provide a separate visual design prompt/reference. Read this handoff and the linked project files first; if my new design prompt is not yet present, summarize your understanding and wait for it before designing or coding.

## 1. Locate the project and establish the current state

Repository: `/Users/ardatas/Documents/ChatGPT/header-ui-remake/header-ui-ux-overhaul`

Remote: `https://github.com/ardatas/header-ui-ux-overhaul.git`

The parent directory `/Users/ardatas/Documents/ChatGPT/header-ui-remake` is not the npm project root. Run project commands from the repository above.

First inspect any applicable `AGENTS.md`, `git status --short`, the current branch, and relevant diffs. Preserve existing work. At this handoff's creation on September 24, 2026:

- Local branch: `main`; HEAD: `3d171b2`.
- Modified files: `src/App.tsx`, `src/components/ui/gateway-flow.tsx`, `src/styles.css`. These contain the requested mobile-only flow-chart removal and the preserved navigation anchor.
- `docs/dashboard-redesign-checklist.md` is an untracked local requirements inventory. This handoff is also newly created locally. A fresh GitHub clone will not contain these files until they are committed; ask for the documents if you cannot access this workspace.
- The dashboard has not been implemented. Do not mistake the original Header account UI for our local application.
- A prior push of `3d171b2` to `main` received a successful Vercel production status on September 20. That is historical evidence, not proof of the current deployment or of unpublished local edits. The generated deployment URL required Vercel login when checked.

## 2. Read these files in order

All relative paths below resolve against the repository above.

1. `docs/dashboard-redesign-checklist.md` — primary functionality inventory for the signed-in redesign. Read the entire file, including documented-but-unverified capabilities and cross-cutting states. Its unchecked boxes mean “not yet covered in the redesign,” not “absent from Header.”
2. `README.md` and `package.json` — scope, commands, dependencies, and deployment setup.
3. `src/main.tsx` and `src/App.tsx` — current entry point and landing-page composition. There is currently no implemented dashboard or client-side routing system.
4. `src/styles.css`, `src/fonts.css`, `public/brand/`, and `public/fonts/` — existing brand tokens, typography, assets, and responsive behavior.
5. `src/components/ui/topic-composer.tsx` — existing prompt input, source attachment menu, and local-draft handoff. This is frontend-only; it does not save a topic into the real Header account.
6. `src/lib/content.ts`, `src/components/ui/button.tsx`, and `src/components/ui/source-icon.tsx` — existing examples, destinations, shared controls, and source marks.
7. `docs/design-reference.md` — original brand provenance and component-reference mapping. Some layout descriptions predate later edits; current source and this handoff take precedence for current behavior.
8. `docs/verification.md` — historical checks and revisions. Do not report these as tests you ran or assume every old description still matches the current design.
9. `vite.config.ts`, `tsconfig.json`, and `vercel.json` — aliases, build, and hosting configuration.

When resolving a product/schema question, consult `docs/reference/openapi.json` and the live public documentation at `https://joinheader.com/docs`. The local schema is a dated reference snapshot. Parse it selectively rather than printing its entire minified line. Keep existing API contracts intact; do not treat every API capability as an existing user-facing control.

## 3. Established scope and brand constraints

- This project is a frontend-only remake. Preserve the existing landing page while adding the signed-in experience through a deliberate entry/route.
- Keep Header's original logos, fonts, source icons, and palette. Interpret the new design reference through Header's identity.
- The existing stack is React, TypeScript, Vite, Tailwind, Framer Motion, and Lucide with a shadcn-compatible component directory. Check `package.json` for current versions and scripts.
- Brand typography is Instrument Serif for display, DM Sans for body, and JetBrains Mono for utility text. The existing orange token is `#E5842D`; use the project's tokens as the source of truth.
- Mobile and desktop both matter. Maintain functional navigation, accessible controls, keyboard focus, and readable long-form content.
- Use synthetic, non-sensitive demo records. Do not put my account's private topic descriptions, newsletters, email addresses, identifiers, or credentials into public fixtures or committed screenshots.
- Represent frontend demo behavior honestly. Do not generate real newsletters, modify subscriptions, create API keys, change billing, or edit/delete account records just to test a design.
- Review a new reference prompt for visual direction without importing unrelated product behavior or placeholder brand assets. My explicit instructions take precedence over reference boilerplate.

## 4. What we inspected in the real product

The original app is at `https://app.joinheader.com/dashboard`. On September 23 my session was already authenticated. Inspect fresh browser state if you need to revisit it; do not assume old tab IDs, bindings, or login state still exist. If login is needed, let me complete it through the browser.

The inspection was read-only. We opened forms and navigated the three-step creation wizard using temporary draft text, but did not submit a topic or save changes.

Important verified surfaces:

- Dashboard: own topics, subscriptions, newsletter age/status, search, topic creation, unsubscribe controls, follow-up summary, discovery entry point.
- Topic creation: name → goal description → sources, with Existing, New, and Recommend tabs.
- Topic/goal details: newsletter history, manual generation entry point, schedule status, source groups, filtered feed, and editing controls.
- Goal editor: name, description, keywords, source groups, Brief/Standard/In-Depth length, section ordering and detail, public/private visibility, memory, and scheduling.
- Newsletter sections: TL;DR, Read & Act, Key Insights, Emerging Patterns, Dissenting Views. Key Insights is required.
- Newsletter reading: citations, source links, transparency, sharing, deletion, capture/follow-up entry points.
- Explore: curated topics, subscriber/source counts, subscribe/unsubscribe, sharing, and customization.
- Sources: group creation/editing, clone controls, URL previews, existing-source selection, email-source entry, bulk membership management, refresh, recent entries, and imports.
- Clear Tabs: one-time URL batch, topic/objective, up to 100 URLs, three visible output modes, history, extension entry point.
- Follow-ups: Follow-ups, Captured, and Agent experiments tabs. These were empty on the inspected account, so populated detail behavior remains unverified.
- Settings: appearance, account, billing/trial status, subscriptions, email sources, API keys, resources, and sign out.

Use the checklist for the full item-by-item inventory. Distinguish “a control was visible” from “its backend operation was tested.”

## 5. My proposed design direction

I suggested a workspace similar to Codex:

- Users can define goals through a chat-like input.
- Newsletters appear in the main workspace.
- Users can scroll through previous newsletters.

My concern: Header does not behave like an instant-answer chatbot. A conventional chat presentation could feel slow or unresponsive while a newsletter is being generated. Solve that expectation mismatch as part of the design.

The following were the previous assistant's recommendations, NOT final approved decisions:

- Borrow the workspace layout: topic sidebar, central newsletter timeline, topic settings, and goal composer.
- Treat the center as a reading timeline with dated newsletter issues, rather than filling it with chat bubbles.
- Use compact older issues, an issue/date index, and a return-to-latest action so long histories remain navigable.
- Keep goal refinement distinct from generation. The recommended default was: Send refines the goal; “Generate newsletter” explicitly starts generation.
- Show immediate, useful confirmation of a goal change and explain that it applies to future newsletters.
- Preserve the context of historical issues instead of silently rewriting them when goals change.
- Show an honest generation state. Only present detailed stages or progress percentages if the backend supports them; demo states must be clearly understood as simulated.
- Let people read older issues or switch topics while generation is pending.

Example proposed confirmation:

> Goal updated: focus on practical examples; exclude product announcements.
> Applies to future newsletters.
> Generate now · Keep scheduled delivery

Natural-language goal editing, clarification dialogue, and immediate assistant replies are proposed interactions. They are not verified existing backend features. A named-AI-model picker has also NOT been verified; do not offer arbitrary models as if Header supports them.

## 6. Open decisions to resolve against my design prompt

| Decision | Requirement at risk |
| --- | --- |
| Home overview versus opening directly into a topic | Own topics, subscriptions, status, and follow-up overview must remain accessible. |
| Topic versus goal hierarchy | Multiple goals per topic are documented, but UI exposure needs confirmation. Avoid locking the architecture into an unsupported assumption. |
| Meaning of Send | Distinguish goal refinement, clarification, source attachment, and newsletter generation. |
| Requests during generation | Define pending, completed, failed, and limit-reached states and what the composer permits during a run. |
| Newsletter-history navigation | Scrolling must remain usable across many issues; define ordering, dates, expanded/collapsed states, and latest-issue navigation. |
| Goal and newsletter settings | Place schedule, length, sections, detail, keywords, memory, visibility, and delete actions without forcing everything through chat. |
| Source management | Include groups, previews, recommendations, email forwarding, imports, bulk actions, and ownership differences. |
| Owned versus subscribed topics | Show which actions are available, and preserve subscribe, unsubscribe, share, and customize paths. |
| Newsletter action placement | Make citations, transparency, sharing, capture, follow-up, and deletion discoverable. |
| Secondary workflows | Give Explore, Sources, Clear Tabs, Follow-ups, and Settings suitable destinations. |
| Generated versus unread | Read tracking was not verified. A “new issue” indicator must not silently claim a persisted unread state. |
| Mobile workspace | Define navigation, keyboard/composer behavior, long-issue reading, and settings-panel access. |

Suggested information architecture, still provisional: Home; Topic workspace; Topic settings panel; Explore; Sources; Clear Tabs; Follow-ups; Settings.

## 7. Preserve the completed landing-page decisions

Treat current code as authoritative. In particular, preserve the shortened hero guidance, hidden curiosity strip, centered single testimonial, closing signup terminal, FAQ placement, original brand assets, and white source-flow connections. The local mobile change hides the flow section at widths up to 700px and keeps `#how-it-works` as a valid zero-height anchor leading toward Sources; desktop flow remains visible. Do not discard those dirty changes while starting dashboard work.

## 8. How to proceed once I provide the design reference

1. Summarize how the reference translates to Header, noting any conflict with confirmed functionality or asynchronous newsletter behavior.
2. Map every checklist requirement to a screen, panel, control, or state. Mark items as covered, needing verification, or explicitly deferred by agreement. Treat frontend prototype coverage separately from backend integration.
3. Resolve material open decisions early; use reasonable defaults for reversible styling choices. Keep assistant proposals distinguishable from my decisions.
4. When implementation is requested, keep the landing page intact and introduce the dashboard with scoped styles and reusable components. Decide route/deep-link handling deliberately; verify Vercel fallback behavior if adding browser routes.
5. Build meaningful frontend interactions with representative synthetic data and the required empty/error/pending states. Avoid buttons that appear functional but silently do nothing.
6. Verify the changed flows in the browser on desktop and mobile, run the relevant build/checks, and update the checklist with precise coverage and limitations.
7. Use the existing Vercel workflow when publishing is requested. Verify the exact deployed commit and resulting status; a local build does not prove production deployment.

For your first response, confirm the files you read, summarize the current direction and main unresolved decisions, and wait for my design prompt if it is not attached. Do not begin another broad landing-page redesign.
