import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function exists(p) {
  return fs.existsSync(path.resolve(process.cwd(), p));
}

test("project smoke", () => {
  // core files
  assert.ok(exists("package.json"));
  assert.ok(exists("vite.config.js"));
  assert.ok(exists("eslint.config.js"));

  // app entry
  assert.ok(exists("index.html"));
  assert.ok(exists("src/main.js"));

  // AdSense / crawler basics
  assert.ok(exists("public/ads.txt"));
  assert.ok(exists("public/robots.txt"));
  assert.ok(exists("public/sitemap.xml"));
});
