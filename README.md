# header-ui-ux-overhaul

Frontend-only remake of the joinheader.com landing page and a signed-in dashboard demo, using its original brand assets, fonts, color palette, and product terminology.

Disclaimer: This is a conceptual UI/UX redesign created solely for educational and portfolio purposes. I am not affiliated with, authorized by, or in any way officially connected to Header Inc. All trademarks and brand assets belong to their respective owners.

The landing page’s **Open demo dashboard** button opens `/dashboard`. Dark mode is the default; a deliberate appearance selection is remembered across the landing page and dashboard.

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

Use `main` for production deployments. Older README-only commits do not contain the app and cannot be built.

## Stack

React, TypeScript, Vite, Tailwind CSS 4, Framer Motion, and Lucide. The shadcn-compatible structure is configured in `components.json`; reusable components live in `src/components/ui`, with the `@/` alias pointing to `src`.

## Editing

- `src/App.tsx`: landing-page sections and navigation.
- `src/components/ui`: adapted components from the supplied design references.
- `src/styles.css`: unchanged Header brand tokens, layout, and responsive rules.
- `src/lib/content.ts`: public destinations, example topics, and the replaceable testimonial.
- `src/dashboard/`: dashboard screens, demo fixtures, forms, and scoped styles.
- `docs/dashboard-demo-verification.md`: current dashboard checks and remaining coverage.
- `public/brand` and `public/fonts`: original assets served locally.
- `docs/reference`: unchanged public schema, original font stylesheet, and source-flow diagram.

The composer is an interactive local draft, with a copy-and-continue handoff to Header. All account actions and documentation links go to the existing website. The dashboard at `/dashboard` is a separate interactive frontend demo. It uses synthetic newsletters and sources, simulates generation, and stores demo changes in this browser. No account, generation service, billing, or email backend is connected. Use Settings → Reset demo data to restore its sample content. Pending generation is session-only and stops on a full page reload.

See [design reference](docs/design-reference.md) for asset provenance and component mapping, and [verification](docs/verification.md) for executed checks.

## Dashboard preview

Open `http://127.0.0.1:5173/dashboard` while the dev server is running. The landing page also links to the demo. Hash navigation supports links such as `/dashboard#topic/agentic-coding`; Vercel redirects `/dashboard/` to `/dashboard` and rewrites the canonical route to the app entry. The dashboard loads separately from the landing page.

After a production deployment, check both dashboard URL forms against the actual host:

```sh
node scripts/check-dashboard-routes.mjs https://header-ui-ux-overhaul.vercel.app
```

Vite preview accepts routes that the production host may reject, so a local preview alone does not validate these redirects.
