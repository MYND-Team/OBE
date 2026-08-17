import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const port = Number(process.env.PORT || 5173);

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
  [".woff", "font/woff"],
  [".woff2", "font/woff2"]
]);

function cleanUrl(url) {
  const parsed = new URL(url, `http://127.0.0.1:${port}`);
  return decodeURIComponent(parsed.pathname);
}

async function resolveFile(pathname) {
  if (pathname === "/") return path.join(dist, "index.html");

  const direct = path.normalize(path.join(dist, pathname));
  if (direct.startsWith(dist) && (await stat(direct).catch(() => null))?.isFile()) {
    return direct;
  }

  if (!path.extname(pathname)) {
    const shell = path.normalize(path.join(dist, pathname, "index.html"));
    if (shell.startsWith(dist) && (await stat(shell).catch(() => null))?.isFile()) {
      return shell;
    }
  }

  return path.join(dist, "index.html");
}

const server = http.createServer(async (request, response) => {
  try {
    const pathname = cleanUrl(request.url);
    const finalFile = await resolveFile(pathname);
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
  console.log(`OBÉ Spaces static server running at http://127.0.0.1:${port}`);
});
