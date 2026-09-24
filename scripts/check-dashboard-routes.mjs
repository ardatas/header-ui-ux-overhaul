import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

// Test the deployed router, not Vite's permissive development fallback.
const base = process.argv[2];
assert(base, "Usage: node scripts/check-dashboard-routes.mjs <deployment-url>");
for (const path of [
  "/",
  "/dashboard",
  "/dashboard/",
  "/dashboard/?route-check=1",
]) {
  const url = new URL(path, base).href;
  process.stdout.write(`Checking ${url} ... `);
  const html = execFileSync(
    "curl",
    [
      "--fail",
      "--silent",
      "--show-error",
      "--location",
      "--max-time",
      "20",
      url,
    ],
    { encoding: "utf8" },
  );
  assert.match(
    html,
    /<div id="root"><\/div>/,
    "Expected the Header app, not a login/error page",
  );
  assert.match(
    html,
    /src="\/assets\/index-[^"]+\.js"/,
    "Expected the built application entry",
  );
  console.log("OK");
}
