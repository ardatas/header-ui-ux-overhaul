# Header landing-page remake

## Scope

Frontend-only landing page. No authentication SDK, account writes, newsletter generation, billing, or API calls are wired into the implementation. Existing Header pages handle sign-up, login, topic browsing, documentation, imports, and follow-ups. The signed-in application is a later phase.

The composer keeps its draft in component memory. Its handoff dialog lets the visitor copy that draft before opening Header. It does not claim to transfer or save a topic to an account. Newsletter examples are labeled illustrative; they are not live research results.

## Original product inspected on September 20, 2026

- [Landing page](https://joinheader.com/): positioning, source-to-goal-to-newsletter diagram, pricing copy, testimonial, source types, logo, and sponsor badge.
- [About](https://joinheader.com/about): bring trusted creators, reduce the time spent sorting, and link readers back to original work.
- [Documentation](https://joinheader.com/docs): topics contain goals and source groups; goals define relevance and scheduling; newsletters synthesize across sources.
- [Blog](https://joinheader.com/blog): browser companion and Pro-only X source support.
- Signed-in dashboard, topic-creation entry screen, source groups, Explore, Clear Tabs, and Follow-ups. Account-specific records are not included in this repository.

The public documentation distinguishes product terminology (newsletter) from existing API terminology (briefing). The API schema is saved unchanged in `reference/openapi.json`: OpenAPI 3.1.0, 111 paths, 141 component schemas. This snapshot is reference material, not a new backend contract.

## Brand retained

The Header logo and Google for Startups badge are original, unmodified files exported from the public page. The existing Font Awesome 6.5.1 source marks are retained in local brand and solid fonts; podcast and blog glyphs use that same icon family. Source accent colors match the original source diagram. Lucide is used for utility icons.

| Role              | Original value                       |
| ----------------- | ------------------------------------ |
| Display           | Instrument Serif, regular and italic |
| Body              | DM Sans                              |
| Utility           | JetBrains Mono                       |
| Background        | `#0f172a`                            |
| Deep background   | `#0B1120`                            |
| Surface           | `#172034`                            |
| Elevated surface  | `#1e293b`                            |
| Hover surface     | `#253349`                            |
| Primary text      | `#F5F0E8`                            |
| Secondary text    | `#B8B0A2`                            |
| Muted brand token | `#6B6560`                            |
| Border            | `#252E3F`                            |
| Hover border      | `#354158`                            |
| Orange            | `#E5842D`                            |
| Orange hover      | `#EE9A4A`                            |
| Primary CTA       | `#C44228`                            |
| CTA hover         | `#D4523A`                            |
| Success           | `#34D399`                            |

The muted brand color is retained as a token but not used for essential small text on dark backgrounds. Fonts are self-hosted using the exact files referenced by the original page's Google Fonts stylesheet. `reference/original-fonts.css` retains that original stylesheet; `src/fonts.css` changes only the font URLs to local paths.

## Component references and adaptations

| Supplied reference        | Implementation                                 | Adaptation                                                                                                                                                                                                                                                                                                              |
| ------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BashTool (supplied twice) | `src/components/ui/bash-tool.tsx`              | Keeps the terminal header, prompt, output area, and footer. Now serves as the enlarged, centered closing sign-up invitation with direct sign-up, login, and documentation links.                                                                                                                                        |
| Ruixen Moon Chat          | `src/components/ui/topic-composer.tsx`         | Keeps growing textarea, attachment control, submit control, and suggestion chips. Replaces generic AI actions with Header goals and supported sources.                                                                                                                                                                  |
| Gateway Flow              | `src/components/ui/gateway-flow.tsx`           | Keeps the initial flowing-point visual, fitted to measured card edges rather than a full-page background. Neutral dotted streams are clipped to the two gutters. A shared desktop grid row aligns all three panels; numbered stages, automatic topic rotation, and the mobile vertical sequence are retained.           |
| Testimonial v2            | `src/components/ui/testimonial-v2.tsx`         | Uses one quiet rounded card with the existing Hande A. testimonial, verbatim. No invented reviewers, portraits, or repeated testimonial columns.                                                                                                                                                                        |
| Integrations              | `src/components/ui/integrations-component.tsx` | Uses the supplied IntegrationsNetwork variant: a centered network with Header orange interaction accents and six source tiles plus OPML and FreshRSS imports. Hover, keyboard focus, or selection highlights the connection and exposes contextual documentation links. The original Header logo is displayed in color. |
| Scroll design             | `src/components/ui/scroll-story.tsx`           | Refined to the requested stacked-keyword effect: the sentence stays pinned while only the keyword column scrolls. Active words change between orange, lilac, blue, and green; surrounding labels and explanatory copy are removed.                                                                                      |

The original source-flow SVG is retained in `reference/original-source-flow.svg` for comparison. The semantic sequence and newsletter sections are unchanged: sources → goal filter → newsletter; What's new → Why it matters → What to do.

## Curated topic metadata

The three topic cards use the original catalog's source/subscriber icon row, replacing the previous source-name lists. Counts are static snapshots of the public catalog (`/api/v2/topics/public/catalog`) read on September 20, 2026: Agentic Coding 57 sources / 33 subscribers; New Music 0 / 5; Beginner Investor 346 / 5. No runtime API integration is added.

## Structure

An editorial hero with a topic composer and the curiosity strip leads into the pinned, scroll-driven keyword statement, then the animated source flow. The rest of the page moves through source integrations, public topic examples, Clear Tabs and Follow-ups, the existing testimonial, the centered sign-up terminal, and FAQs as the final section before the footer.

All CTA destinations live in `src/lib/content.ts` or are existing public Header URLs. No placeholder `#` destinations, fake form submissions, or arbitrary upload types are used.

## Accessibility and responsiveness

- Layouts cover narrow phones, larger phones, tablets, and desktop.
- Native anchors, labeled inputs, native dialog focus handling, and native FAQ disclosures.
- Visible keyboard focus and skip-to-content link.
- Mobile disclosure navigation closes after selecting a section.
- Reduced-motion preference disables particles, cursor blinking, and keyword scrolling; a static statement remains readable.
- Original images have intrinsic dimensions; decorative images and paths are hidden from accessibility output where appropriate.

See `verification.md` for executed checks and their limits.
