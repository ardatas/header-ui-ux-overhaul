# Header dashboard demo

Implemented September 24, 2026. Frontend only; not deployed in this session.

## What is available

The landing page is preserved, including its pre-existing mobile-only flow removal and `#how-it-works` anchor. Two small links lead into `/dashboard/`. The dashboard is lazy-loaded and uses its own `.hd-*` styles; the shared brand tokens, fonts, source marks, and logo remain in use.

The Prompt Kit reference informed the history/sidebar structure, scrollable content, compact actions, mobile drawer, and bottom composer. Header's main content is a dated newsletter. The source-to-goal-to-newsletter strip opens the relevant context. Goal refinement updates future context; Generate newsletter plays a five-second simulated run and adds a predefined issue. Older issues retain their goal, length, and sections.

Working local interactions include:

- Topic navigation, overview, search, dated issue history, source feed, and goal view.
- Three-step topic creation, sample goal assistance, sample source recommendations, individual source selection, and topic editing/deletion.
- Length, section toggles and ordering, required Key Insights, keywords, demo scheduling, memory, and visibility.
- Simulated generation, continued navigation while generating, success, failure/retry, and reached-limit feedback.
- Synthetic source previews, citation controls, transparency, local sharing visibility, demo-link copy, issue deletion, capture buttons, and follow-ups.
- Explore follow/unfollow and customization; source creation, group-name filtering/renaming, source selection/removal, and simulated refresh.
- Browser-local OPML parsing with previews and malformed-entry reporting. A FreshRSS sample connection is explicitly simulated and asks for no credentials.
- Clear Tabs URL normalization/validation, the 100-URL cap, three sample output presentations, simulated generation, stored history, and Free daily-use counting.
- Follow-up completion/reopening, captured insights, conversion to follow-ups, and an honest empty agent-experiments destination.
- Shared landing/dashboard light/dark appearance, demo plans, generation outcome controls, subscription preferences, synthetic email-source setup, and external resource links.

Demo changes use localStorage. Pending generation is session-only. Sample source names, article text, identity, and newsletter content are fictional. No account changes, network content fetching, generated credentials, emails, or purchases take place.

## Verification performed

- `npm run build`: TypeScript and production bundle passed. Dashboard code splitting removed the earlier 500 kB chunk warning.
- Desktop browser inspection of the reader and issue context at 1280×720 and 1440×900, plus mobile inspection at 390×844 and narrow-phone inspection at 320×740.
- Measured document/main widths on the checked 320px, 390px, 768px, and 1440px views: no horizontal overflow.
- Refined a goal and completed a simulated run; the issue count increased and the new issue stored the refinement.
- Switched topics and selected an older dated issue; changing newsletter settings did not change that historical issue's title or retained sections.
- Opened a citation preview, captured an insight, added a follow-up, marked it complete, and verified the saved entry in Captured.
- Completed all three topic-creation steps; the resulting topic showed a first-issue empty state.
- Added a source with a missing URL scheme and verified it appeared in the library.
- Clear Tabs rejected an invalid address, accepted two valid links, showed a disabled pending form, produced the sample reading list, and saved it in History.
- Triggered a failed newsletter run, navigated away, returned to its error, retried, and observed a successful completion notification on another screen.
- Checked mobile navigation, light appearance, Free-plan topic-creation restrictions, and generation-limit feedback.

- Verified the landing-page flow remains visible on desktop, hidden at 390px, and retains its anchor. Both new dashboard links are present; followed the hero link into the dashboard.
- Reset all test changes through Settings and verified the topic deep link after a full reload.
- `npm run typecheck`, strict unused-local/parameter checking, and `git diff --check` passed.
- Fresh production preview on port 4173 rendered without console warnings or errors. Earlier development hot-reload logs were not used as evidence of the final bundle.

Browser checks use Chromium emulation, not physical iOS/Android devices. Current checks do not establish production hosting or backend compatibility.

## Coverage limits

The updated checklist is conservative: a compound requirement stays unchecked when only part is implemented. The original handoff and historical landing-page verification have not been overwritten.

- Source groups are currently source-name collections. Public/private group ownership, cloning, nested groups, per-group membership independent of the library, individual source editing, full bulk URL detection, and group feed pagination need further work. Removing a source also removes its preview from older demo issues; the UI explains this before confirmation.
- Topic creation selects individual sources; it does not yet embed the complete group-creation/import workflow. Recommendations and goal assistance are fixed examples.
- The model keeps topic and goal fields together for this demo. Multiple goals, relevance questions, real scheduler timing/time zones, section detail levels, and a populated experiment lifecycle need verified contracts before deeper design.
- The filtered feed is illustrative and unpaginated. Capturing accepts any selected newsletter passage or a pasted/written note. Newsletter feedback and a separate full original-article reader are not implemented; synthetic citations open a labelled preview.
- Public topic sharing is a local demo route. Local custom topics and edits do not transfer to other browsers. No real publication occurs.
- Clear Tabs uses predefined content and supplied URLs. It does not fetch, semantically group, or summarize the pages; reruns and per-link processing outcomes remain outstanding.
- OPML parsing is implemented but the file-upload path has not been browser-tested in this session. FreshRSS, forwarding, schedule delivery, API-key management, billing/trial expiry, and agent sync are not integrated.
- The prototype includes Pro, Free, and Trial sample states. Exact source allowances, trial countdowns, expiry/lapse behavior, and pricing are not asserted; current plans link to Header.
- Destructive issue/topic/source/reset flows confirm first. Follow-up removal is an immediate local action with a reset explanation; per-item undo is not implemented.
- Vercel routing was subsequently tested against production; see the trailing-slash correction below.

## Newsletter format correction — 24 September 2026

The user requested the current Header newsletter format: one generated text document, without treating citations, Emerging Patterns, Dissenting Views, or other headings as separate UI components.

- Compared the public [Agentic Coding issue](https://joinheader.com/b/agentic-coding-sep-23-2026-ee5a7c9f-fa5c-4b68-9f52-58b4271b595f) with the local reader. Its body uses ordinary headings, paragraphs, bold text, lists, and links. Only the format was reused; demo prose remains synthetic.
- `NewsletterBody.tsx` renders one Markdown string through `react-markdown` and `remark-gfm`. It does not identify or split named sections. Default URL filtering and HTML skipping remain enabled.
- Removed section cards, numbered insight layouts, extracted takeaway blocks, and the citation visibility toggle. Source links remain in the generated text. Topic section preferences still control the mock generator, independently of the renderer.
- Each issue stores its generated Markdown. Existing locally saved issues receive a body during migration, preserving other saved work and historical issue settings.
- Capture and follow-up actions accept selected text or an editable note instead of relying on predefined insight objects.
- Verified production build, 1440px desktop and 390px phone layouts, inline source preview, selection-to-capture, saved capture after reload, and historical issue rendering. The 390px document width remained 390px; the Markdown body stayed within its column. Production preview had no console warnings or errors.

This remains a frontend demo; no backend response adapter or live generation was introduced.

## Topic context and shared appearance — 24 September 2026

- The composer names its active topic, offers topic-specific refinement examples, and states that changes apply only to that topic's future issues. Drafts and update notices are kept separately per topic for the current session.
- Replaced the vague ownership label beneath the topic title with a readable newsletter schedule and source count. Unscheduled topics say "Newsletter on demand"; followed topics retain an explicit following label.
- Landing navigation and dashboard appearance settings reuse the same accessible segmented control. The selected palette persists across reloads and navigation between the landing page and dashboard. Existing dashboard appearance preferences remain a fallback when no shared preference is stored.
- Light mode uses the dashboard's existing palette; landing typography, assets, content, and mobile source-flow visibility remain intact. Primary-button text, X icons, and the sources panel receive appropriate light-mode contrast.

Verification for this revision: production build, strict TypeScript unused checks, and whitespace checks passed. Browser checks confirmed separate Agentic coding / Thoughtful design drafts, the updated schedule, desktop and 390px dashboard layout, 390px and 320px landing navigation without horizontal overflow, light-mode reload persistence, and shared appearance in both navigation directions. Browser console reported no warnings or errors. Temporary viewport overrides were reset.

## Production dashboard routing correction — 24 September 2026

The production landing button pointed to `/dashboard/`, which returned Vercel `404 NOT_FOUND`, while `/dashboard` returned the current app bundle with HTTP 200. Vite preview returned 200 for both and therefore concealed the production-only failure.

Added `scripts/check-dashboard-routes.mjs` and ran it against the public production domain before the fix: the landing page and `/dashboard` passed; `/dashboard/` failed with HTTP 404. The test rejects login/error HTML as well as unsuccessful HTTP responses, and covers a query-string variant.

Set `trailingSlash: false` using [Vercel's documented redirect behavior](https://vercel.com/docs/project-configuration/vercel-json#trailingslash) and made landing/share links use `/dashboard`. Existing slash-ending links redirect to the canonical route. This needs live route and browser validation after deployment, not only a successful build status.
