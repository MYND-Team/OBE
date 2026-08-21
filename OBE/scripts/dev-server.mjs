import * as esbuild from "esbuild";
import { createReadStream } from "node:fs";
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const assets = path.join(dist, "assets");
const port = Number(process.env.PORT || 5173);

await rm(dist, { recursive: true, force: true });
await mkdir(assets, { recursive: true });

const template = await readFile(path.join(root, "index.html"), "utf8");
let html = template.replace(
  '    <script type="module" src="/src/main.jsx"></script>',
  '    <script type="module" src="/assets/main.js"></script>'
);
html = html.replace(
  '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
  '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <link rel="stylesheet" href="/assets/main.css" />'
);

await writeFile(path.join(dist, "index.html"), html);

const context = await esbuild.context({
  entryPoints: [path.join(root, "src", "main.jsx")],
  bundle: true,
  splitting: true,
  format: "esm",
  outdir: assets,
  publicPath: "/assets",
  jsx: "automatic",
  jsxImportSource: "react",
  entryNames: "main",
  chunkNames: "chunks/[name]",
  assetNames: "media/[name]",
  sourcemap: "inline",
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
    "process.env.NODE_ENV": JSON.stringify("development")
  }
});

await context.rebuild();
await context.watch();

const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"]
]);

function cleanUrl(url) {
  const parsed = new URL(url, `http://127.0.0.1:${port}`);
  return decodeURIComponent(parsed.pathname);
}

const server = http.createServer(async (request, response) => {
  try {
    const pathname = cleanUrl(request.url);
    const requested = pathname === "/" ? "/index.html" : pathname;
    const file = path.normalize(path.join(dist, requested));
    const target = file.startsWith(dist) ? file : path.join(dist, "index.html");
    const exists = await stat(target).catch(() => null);
    const finalFile = exists?.isFile() ? target : path.join(dist, "index.html");
    const ext = path.extname(finalFile);

    response.writeHead(200, {
      "Content-Type": types.get(ext) || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    createReadStream(finalFile).pipe(response);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(error instanceof Error ? error.message : "Server error");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`OBÉ Spaces dev server running at http://127.0.0.1:${port}`);
});

const shutdown = async () => {
  await context.dispose();
  server.close(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
