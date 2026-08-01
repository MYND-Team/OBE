import * as esbuild from "esbuild";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, "assets"), { recursive: true });

const result = await esbuild.build({
  entryPoints: [path.join(root, "src", "main.jsx")],
  bundle: true,
  splitting: true,
  format: "esm",
  outdir: path.join(dist, "assets"),
  publicPath: "/assets",
  jsx: "automatic",
  jsxImportSource: "react",
  entryNames: "[name]-[hash]",
  chunkNames: "chunks/[name]-[hash]",
  assetNames: "media/[name]-[hash]",
  minify: true,
  sourcemap: false,
  metafile: true,
  loader: {
    ".svg": "file",
    ".png": "file",
    ".jpg": "file",
    ".jpeg": "file",
    ".webp": "file",
    ".woff": "file",
    ".woff2": "file"
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production")
  }
});

const entry = Object.entries(result.metafile.outputs).find(
  ([, value]) => value.entryPoint && value.entryPoint.replaceAll("\\", "/").endsWith("src/main.jsx")
);

if (!entry) {
  throw new Error("Unable to locate bundled application entry.");
}

const [entryFile, entryMeta] = entry;
const jsPath = `/${path.relative(dist, entryFile).replaceAll("\\", "/")}`;
const cssPath = entryMeta.cssBundle
  ? `/${path.relative(dist, entryMeta.cssBundle).replaceAll("\\", "/")}`
  : null;

const template = await readFile(path.join(root, "index.html"), "utf8");
const tags = [
  cssPath ? `    <link rel="stylesheet" href="${cssPath}" />` : "",
  `    <script type="module" src="${jsPath}"></script>`
]
  .filter(Boolean)
  .join("\n");

const html = template.replace('    <script type="module" src="/src/main.jsx"></script>', tags);

await writeFile(path.join(dist, "index.html"), html);
await writeFile(
  path.join(dist, ".htaccess"),
  [
    "RewriteEngine On",
    "RewriteBase /",
    "RewriteRule ^index\\.html$ - [L]",
    "RewriteCond %{REQUEST_FILENAME} !-f",
    "RewriteCond %{REQUEST_FILENAME} !-d",
    "RewriteRule . /index.html [L]",
    ""
  ].join("\n")
);

console.log(`Built ${path.relative(root, dist)}`);
