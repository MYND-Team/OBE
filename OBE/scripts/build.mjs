import * as esbuild from "esbuild";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, "assets"), { recursive: true });

await cp(path.join(root, "public"), dist, { recursive: true });

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

const baseHtml = template.replace('    <script type="module" src="/src/main.jsx"></script>', tags);

// Static per-route metadata. The React app still handles all client-side
// navigation; these are only pre-rendered <head> shells so crawlers and link
// previews (WhatsApp, Facebook) see the right title/description in view-source
// without executing JavaScript.
const homeTitle = "OBÉ Spaces | Spaces That Earn";
const homeDescription =
  "OBÉ Spaces turns your empty property into a fully furnished, guest ready rental in 30 days. Spaces That Earn.";

const routes = [
  {
    outFile: "index.html",
    canonical: "https://obespaces.com/",
    title: homeTitle,
    description: homeDescription
  },
  {
    outFile: "collections/index.html",
    canonical: "https://obespaces.com/collections",
    title: "Short Term Rental Furnishing Packages | OBÉ Spaces",
    description:
      "Browse OBÉ Spaces furnishing packages for short term rental property staging in Cairo, built around the guest your listing should win, delivered in 30 days."
  },
  {
    outFile: "collections/urban/index.html",
    canonical: "https://obespaces.com/collections/urban",
    title: "Urban Collection, Short Term Rental Furnishing New Cairo | OBÉ Spaces",
    description:
      "The Urban collection furnishes short term rental apartments in New Cairo for the city explorer guest, delivered guest ready in 30 days."
  },
  {
    outFile: "collections/shore/index.html",
    canonical: "https://obespaces.com/collections/shore",
    title: "Shore Collection, Furnish Short Term Rental Egypt | OBÉ Spaces",
    description:
      "The Shore collection furnishes coastal short term rental chalets and apartments for the getaway guest, delivered guest ready in 30 days."
  }
];

for (const route of routes) {
  let html = baseHtml;
  if (route.title !== homeTitle) {
    html = html.replaceAll(`<title>${homeTitle}</title>`, `<title>${route.title}</title>`);
    html = html.replaceAll(
      `content="${homeTitle}"`,
      `content="${route.title}"`
    );
  }
  if (route.description !== homeDescription) {
    html = html.replaceAll(`content="${homeDescription}"`, `content="${route.description}"`);
  }
  html = html.replaceAll('href="https://obespaces.com/"', `href="${route.canonical}"`);
  html = html.replaceAll('content="https://obespaces.com/"', `content="${route.canonical}"`);

  const outPath = path.join(dist, route.outFile);
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, html);
}

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

console.log(`Built ${path.relative(root, dist)} (${routes.length} pre-rendered routes)`);
