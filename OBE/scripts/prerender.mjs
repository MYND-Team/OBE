import * as esbuild from "esbuild";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const ssrOutDir = path.join(root, ".ssr-tmp");

const routes = [
  { url: "/", outFile: "index.html" },
  { url: "/collections", outFile: "collections/index.html" },
  { url: "/collections/urban", outFile: "collections/urban/index.html" },
  { url: "/collections/shore", outFile: "collections/shore/index.html" }
];

const ssrEntrySource = `
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import App from "${path.join(root, "src", "App.jsx").replaceAll("\\", "/")}";

export function renderRoute(url) {
  return renderToStaticMarkup(
    React.createElement(StaticRouter, { location: url }, React.createElement(App))
  );
}
`;

async function buildSsrBundle() {
  await rm(ssrOutDir, { recursive: true, force: true });
  await mkdir(ssrOutDir, { recursive: true });

  await esbuild.build({
    stdin: {
      contents: ssrEntrySource,
      resolveDir: root,
      loader: "jsx"
    },
    bundle: true,
    platform: "node",
    format: "esm",
    outdir: ssrOutDir,
    entryNames: "ssr-bundle",
    outExtension: { ".js": ".mjs" },
    // Asset content itself is irrelevant for SSR (we only need the import to
    // resolve to a string), but the string must match the real hashed path
    // the client build already wrote to dist/assets/media, so mirror its
    // asset naming exactly.
    assetNames: "media/[name]-[hash]",
    publicPath: "/assets",
    jsx: "automatic",
    jsxImportSource: "react",
    packages: "external",
    loader: {
      ".svg": "file",
      ".png": "file",
      ".jpg": "file",
      ".jpeg": "file",
      ".webp": "file",
      ".woff": "file",
      ".woff2": "file",
      ".css": "empty"
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify("production")
    },
    logLevel: "silent"
  });
}

function injectIntoRoot(html, renderedMarkup) {
  return html.replace(
    '<div id="root"></div>',
    `<div id="root">${renderedMarkup}</div>`
  );
}

async function run() {
  await buildSsrBundle();
  const { renderRoute } = await import(pathToFileURL(path.join(ssrOutDir, "ssr-bundle.mjs")).href);

  for (const route of routes) {
    const filePath = path.join(dist, route.outFile);
    const html = await readFile(filePath, "utf8");
    const markup = renderRoute(route.url);
    const merged = injectIntoRoot(html, markup);
    await writeFile(filePath, merged);
  }

  await rm(ssrOutDir, { recursive: true, force: true });
  console.log(`Prerendered ${routes.length} routes with real content`);
}

run().catch(async (error) => {
  await rm(ssrOutDir, { recursive: true, force: true }).catch(() => {});
  console.error("Prerender failed:", error);
  process.exit(1);
});
