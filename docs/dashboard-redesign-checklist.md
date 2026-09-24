# Dashboard and signed-in app redesign checklist

Inventory date: September 23, 2026. Frontend demo coverage updated September 24, 2026. Checked boxes indicate local demo coverage, not live backend integration or proof of production behavior. Unchecked boxes mean full coverage remains outstanding; some have partial demo implementations. See `dashboard-demo-verification.md` for limitations.

Based on read-only inspection of the signed-in application. Controls were inspected; account-changing actions such as generation, subscription changes, deletion, imports, billing, and key creation were not executed. No account records or credentials are copied here.

## Dashboard and navigation

- [x] List the user's own topics separately from subscribed topics.
- [x] Open a topic or goal from its dashboard card.
- [x] Display the latest newsletter's age/date and generation status.
- [x] Represent completed, in-progress, and failed newsletters.
- [x] Open and close dashboard search.
- [ ] Start topic creation from the desktop action and mobile floating button.
- [x] Unsubscribe from a followed topic.
- [x] Show follow-up summary, empty state, and link to all follow-ups.
- [x] Link to curated topic discovery.
- [x] Preserve desktop navigation: Dashboard, Explore, Sources, Clear Tabs, Follow-ups, Settings.
- [x] Preserve mobile access to every destination, including features reached through Settings.
- [x] Preserve active navigation state, back navigation, and landing-page access.

## Topic creation

- [x] Three-step progress with Back/Next navigation.
- [x] Enter a topic name.
- [x] Describe the learning goal and relevance criteria.
- [x] Access assistance for articulating/refining the goal.
- [ ] Select existing personal or curated source groups.
- [ ] Create a source group from pasted URLs: group name, URL input, preview, create group.
- [x] Request source recommendations based on the topic and goal.
- [ ] Reach OPML and FreshRSS imports from advanced options.
- [x] Validate required inputs and disable unavailable actions.
- [x] Create the topic with the selected goal and sources; represent plan restrictions and submission state.

## Topic/goal detail and editing

- [ ] Show topic name, expandable description, and public/private/curated indicators.
- [ ] Show subscriber, source-group, and source counts where applicable.
- [x] Open the latest newsletter and newsletter history.
- [x] Generate a newsletter on demand and show its progress/failure state.
- [x] Show automatic-schedule status.
- [ ] List linked source groups and open their details.
- [ ] Offer goal-based source discovery.
- [ ] Show the filtered feed with entry counts, titles, source names, dates, previews, links, and pagination.
- [ ] Edit name, description, keywords, and linked source groups.
- [x] Offer goal refinement assistance.
- [x] Choose newsletter length: Brief, Standard, In-Depth in the goal editor.
- [x] Configure newsletter sections: TL;DR, Read & Act, Key Insights, Emerging Patterns, Dissenting Views.
- [ ] Reorder sections, enable/disable optional sections, and choose detail levels where supported.
- [x] Keep Key Insights marked as required.
- [x] Control public/private visibility.
- [x] Enable/disable memory from previous newsletters.
- [ ] Enable/disable scheduled newsletters; preserve the available timing controls.
- [ ] Save, cancel, and delete a goal, with ownership and plan restrictions.

## Explore and subscriptions

- [ ] Browse curated/public topic cards with descriptions and counts.
- [ ] Open a public topic and its latest newsletter/feed.
- [x] Subscribe, show subscribed state, and unsubscribe.
- [ ] Share a public topic.
- [x] Customize a public topic into the user's own version.
- [x] Start an original topic from Explore.
- [x] Manage own scheduled topics and public subscriptions from Topics & Subscriptions.
- [x] Display paused schedule state and schedule enable/disable controls.
- [x] Preserve per-topic newsletter-length controls shown on the subscriptions page.

## Newsletter reading

- [ ] Show generation status, date, reading-time estimate, source/article counts, and content date range.
- [x] Link back to the originating goal/topic.
- [x] Render the newsletter's configured sections and rich text.
- [ ] Show/hide inline citations and expand the source list. Current design keeps generated citations inline; the separate visibility toggle was removed at the user’s request.
- [ ] Open original source content.
- [x] Open the newsletter transparency page: “What went into this newsletter.”
- [x] Make an owned newsletter public and preserve sharing visibility controls.
- [x] Delete an owned newsletter.
- [x] Start a follow-up from a recommendation using “+ Follow up.”
- [x] Capture a highlighted insight for later action.
- [ ] Reach the feedback form.

## Sources and source groups

- [ ] Browse personal/public groups with names, descriptions, source counts, and visibility badges.
- [ ] Create a group and edit its name, description, and visibility.
- [ ] Clone a public group.
- [ ] Show goals using a group.
- [x] List group members with source-type markers and links to source details.
- [ ] Add sources by creating new ones, choosing existing ones, or adding an email source.
- [ ] Paste multiple URLs and preview detected sources before adding them.
- [x] Support RSS/site feeds, Substack, YouTube channels, subreddits, and Pro-only X accounts.
- [x] Retain blog and podcast feeds within RSS support.
- [ ] Search the source picker; distinguish available sources from sources already in the group.
- [ ] Select multiple sources/select all and manage group membership.
- [ ] Remove an individual source from a group.
- [x] Refresh all sources in a group.
- [ ] Delete an owned group.
- [ ] Show recent group entries with metadata, original links, and pagination.

## Imports and email sources

- [ ] OPML/XML import: file selection, progress steps, destination selection, and results/error states.
- [ ] FreshRSS: instance URL, username, API password, and connection validation.
- [ ] Preserve import grouping choices and success/partial-failure reporting.
- [ ] Add an email source through a source group.
- [ ] Manage newsletter forwarding addresses under Email sources.
- [ ] Show the no-email-sources state and route users to setup.

## Clear Tabs

- [ ] Set a topic name and learning objective.
- [ ] Paste multiple URLs; display URL count and the 100-URL limit.
- [x] Handle one-per-line, comma-separated, and whitespace-separated URLs; missing scheme guidance.
- [x] Choose Sorted by subject, A reading list, or A newsletter.
- [ ] Clear pasted URLs, cancel, validate, and submit.
- [x] Show generation status and applicable daily-use limits.
- [x] Open previous Clear Tabs submissions through History.
- [x] Preserve the Chrome extension entry point for sending open tabs.

## Follow-ups, captured insights, and agent experiments

- [x] Preserve the Follow-ups, Captured, and Agent experiments tabs and Beta indicator.
- [x] Show follow-up tracking initiated from newsletter actions.
- [ ] Show captured insights and the path toward an experiment.
- [ ] Show synced agent experiments.
- [x] Preserve distinct empty states with clear ways to get started.
- [x] Link to the Header skill and installation guidance.
- [ ] Design populated detail/list states after inspecting a populated example; this account currently has none.

## Settings, plan, and resources

- [x] Dark/light appearance switch.
- [x] Account identity and sign out.
- [ ] Current plan, pricing, included features, and trial status.
- [ ] Upgrade entry point and paid/expired-trial restrictions.
- [ ] Preserve current plan limits: Free subscriptions and 3 Clear Tabs uses/day; Pro custom topics, source allowance, scheduling, manual generation, agent access, and X sources.
- [ ] API Keys page, key-creation entry point, and API documentation link.
- [ ] Settings links to subscriptions, source groups, Clear Tabs, email sources, and follow-ups.
- [ ] Documentation, Chrome extension, About, Discord, feedback, privacy policy, and terms links.

## Documented features needing UI/state verification

These are documented capabilities, not confirmed end-to-end UI flows. Source: [Header documentation](https://joinheader.com/docs).

- [ ] Multiple goals per topic and relevance questions: confirm current UI exposure.
- [ ] Nested source groups: confirm current group-editor support.
- [ ] Individual source edit/delete/refresh/validation: inspect owner-specific detail controls.
- [ ] Import grouping and partial-failure results: inspect populated examples.
- [ ] Clear Tabs custom layouts, reruns, and per-link outcomes: confirm UI exposure.
- [ ] API-key scope selection, one-time secret display, listing, and revocation: inspect without creating credentials.
- [ ] Eligible trial start, billing portal, and post-trial/Pro-lapse states: verify on the appropriate account tier.
- [ ] Agent experiment details and lifecycle: inspect populated examples.
- [ ] No named-AI-model picker has been verified for newsletters. Do not present it as an existing feature.

## Cross-cutting redesign checks

- [x] Loading, empty, populated, in-progress, failed, and success states.
- [ ] Owner vs subscriber vs public-view permissions.
- [ ] Free, Pro, trial, expired-trial, and quota-reached states.
- [ ] Field validation, disabled actions, error feedback, and retry paths where supported.
- [ ] Confirmation/cancel flows for destructive or account-changing actions.
- [ ] Desktop/mobile navigation, long titles, long descriptions, and dense lists.
- [ ] Keyboard access, labels, focus visibility, contrast, and reduced-motion support.
- [x] Frontend-only prototype actions must clearly distinguish demo behavior from real account operations.

Do not embed personal account content in public demo fixtures. The current demo uses synthetic content. Remaining unchecked requirements are not silently removed from scope; they need further design or behavior verification beyond this first frontend implementation.
