# Verification

Executed locally on September 20, 2026.

## Build

- `npm run build`: TypeScript check and Vite production build passed.
- `npm install`: dependency audit reported zero vulnerabilities at installation.

## Browser checks

Tested in the Codex Chromium browser against the local Vite preview.

- Desktop hero, source flow, and integrations visually inspected at 1440px.
- Phone hero, source integrations, mobile navigation, and vertical source flow visually inspected at 390px.
- Narrow-phone layout inspected at 320px. Fixed overflow caused by the body minimum width.
- Document overflow checked at 320, 390, 768, 1024, and 1440px.
- Header logo and sponsor badge loaded without broken images. Display typography resolved to Instrument Serif.
- Internal anchors resolve to real section IDs.
- Clicking a suggested topic fills the composer. Empty input disables submission.
- Source picker opens; adding and removing a URL updates the draft.
- Topic draft opens a native modal. Fixed centering after Tailwind's reset removed default margins.
- Copy draft confirms success. Sign-up and login destinations are actual Header URLs.
- Next example changes the goal, newsletter content, and topic destination together.
- Mobile navigation opens, follows the selected anchor, and closes.
- FAQ disclosure expands to show the answer.
- Original terminal copy action was verified; this control was later replaced by the closing sign-up invitation.
- Browser console reports no warnings or errors during the checked interactions.

## Source section revision

- Rebuilt integrations using the supplied logo-network variant, with six source tiles and the original Header logo.
- Visually inspected revised integrations and numbered flow at desktop and phone widths.
- Rechecked document overflow at 320, 390, 768, 1024, and 1440px; none observed.
- Confirmed seven input connections and one newsletter connection; switching examples updates the goal and newsletter together.
- Locally hosted source icon fonts render correctly. Console check found no warnings or errors.
- Production build passed after the revision.

## Scroll sentence revision

- Replaced the word-by-word opacity reveal with a pinned sentence and vertically stacked keyword column.
- Verified desktop page scrolling changes the keyword and color while the sentence prefix keeps the same viewport position within the sticky interval.
- Visually inspected the mobile keyword sequence and checked narrow-screen overflow.
- Removed the eyebrow, arrow, rule, and explanatory paragraph from this section.
- Production build passed. Reduced-motion users receive a static sentence without the long scroll interval.

## Automatic goal examples

- Matched the public original site's 10-second hold and 350ms fade cadence.
- Browser verification confirmed automatic goal/newsletter changes and synchronized counter updates.
- Manual selection advances once and stops automatic cycling, as on the original site.
- No browser warnings or errors were reported in a fresh preview tab; production build passed.
- Reduced-motion preference disables automatic cycling and uses immediate manual changes.

## Interactive source network revision

- Centered the heading and network; removed colored accents from this section.
- Added OPML and FreshRSS as network nodes with contextual links to their existing documentation anchors.
- Verified source selection, single active connection, selected detail copy, and both import destinations in the browser.
- Inspected desktop and 390px mobile layouts; increased narrow-phone row spacing after the 320px inspection exposed crowded labels.
- Production build passed after the update.

## Final terminal sign-up revision

- Moved the terminal below the FAQs as the last main section, replacing the previous closing headline and removing its earlier duplicate placement.
- Enlarged and centered the terminal; sign-up, login, and documentation anchors point to existing Header pages.
- Visually checked desktop and mobile layouts and verified a single terminal instance.
- Production build passed.

## Restored initial flowing-points effect

- Replaced solid source wires and single large beads with 21 layered dotted streams converging into the goal, based on the supplied Gateway Flow reference.
- Increased neutral dot visibility and desktop spacing; retained automatic example rotation and the newsletter output arrow.
- Desktop browser inspection confirmed the dotted animation is running and no horizontal overflow is present.
- Production build passed.

## Actual first-version flow restoration

- Git history contains README/planning commits only; the first frontend implementation was recovered from this task's recorded file-creation patch.
- Restored its exact 32-path geometry (`M 0 y C 275 y, 335 240, 540 240 S 890 y, 1200 y`) and original particle cadence, replacing the later measured wires and 21-path approximation.
- Adjusted visibility from 0.8px to 1.6px dotted strokes, and 1.6px to 2.3px moving points, using neutral brand text color.
- Kept the numbered stages, current cards, automatic topic switching, and mobile vertical flow.
- Desktop rendered flow inspected; production build passed.

## Flow layout reconciliation

- Replaced the oversized original background with a dedicated `FlowStreams` component that measures source/goal/newsletter edges and clips all dotted paths to the two gutters.
- A shared desktop grid row gives the source list, goal, and newsletter identical top/bottom coordinates; verified at 1440px and 1024px.
- Checked manual example switching and observed the stream boundaries update with the content.
- Phone layout at 390px remains a readable vertical sequence without horizontal overflow.
- Production build passed. This supersedes the full-width restoration above.

Reduced-motion behavior is implemented through Framer Motion's preference handling, `useReducedMotion`, and CSS media queries; OS-level reduced motion was not toggled during this browser session. The site has not been checked on physical iOS/Android devices or Safari, and is not deployed.

No production account writes, purchases, subscriptions, or backend integration tests were performed.
