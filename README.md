# header-ui-ux-overhaul

Frontend-only remake of the joinheader.com landing page, using its original brand assets, fonts, color palette, and product terminology.

Disclaimer: This is a conceptual UI/UX redesign created solely for educational and portfolio purposes. I am not affiliated with, authorized by, or in any way officially connected to Header Inc. All trademarks and brand assets belong to their respective owners.

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

## Deploy with Vercel

Deploy a Git branch containing this app (including `package.json`), using the repository root as the Root Directory. The Vite preset, `npm ci`, `npm run build`, and `dist` output directory are configured in `vercel.json`. No environment variables are required.

The original `main` branch contains only the README until the landing-page branch is merged. Redeploying that original commit will fail because it has no `package.json`.

## Stack

React, TypeScript, Vite, Tailwind CSS 4, Framer Motion, and Lucide. The shadcn-compatible structure is configured in `components.json`; reusable components live in `src/components/ui`, with the `@/` alias pointing to `src`.

## Editing

- `src/App.tsx`: landing-page sections and navigation.
- `src/components/ui`: adapted components from the supplied design references.
- `src/styles.css`: unchanged Header brand tokens, layout, and responsive rules.
- `src/lib/content.ts`: public destinations, example topics, and the replaceable testimonial.
- `public/brand` and `public/fonts`: original assets served locally.
- `docs/reference`: unchanged public schema, original font stylesheet, and source-flow diagram.

The composer is an interactive local draft, with a copy-and-continue handoff to Header. All account actions and documentation links go to the existing website. No backend or signed-in page remake is included.

See [design reference](docs/design-reference.md) for asset provenance and component mapping, and [verification](docs/verification.md) for executed checks.
