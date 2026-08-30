import { checkPassword, getFile, putFile } from "./_github.js";

const MAX_BYTES = 8 * 1024 * 1024;

function sanitizeSegment(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9-]/g, "");
}

function sanitizeFilename(value) {
  const base = String(value || "").toLowerCase().replace(/[^a-z0-9.-]/g, "");
  if (!/\.(jpg|jpeg|png|webp)$/.test(base)) return null;
  return base;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }
  try {
    if (!checkPassword(req.body?.password)) {
      res.status(401).json({ ok: false, error: "Wrong password" });
      return;
    }

    const slug = sanitizeSegment(req.body?.slug);
    const filename = sanitizeFilename(req.body?.filename);
    const dataUrl = req.body?.dataUrl;

    if (!slug) {
      res.status(400).json({ ok: false, error: "Missing or invalid slug" });
      return;
    }
    if (!filename) {
      res.status(400).json({ ok: false, error: "Filename must end in .jpg, .jpeg, .png, or .webp" });
      return;
    }
    const match = typeof dataUrl === "string" && dataUrl.match(/^data:image\/[a-zA-Z+]+;base64,(.+)$/);
    if (!match) {
      res.status(400).json({ ok: false, error: "dataUrl must be a base64 image data URL" });
      return;
    }
    const base64 = match[1];
    const buffer = Buffer.from(base64, "base64");
    if (buffer.length === 0 || buffer.length > MAX_BYTES) {
      res.status(400).json({ ok: false, error: "Image must be non-empty and under 8MB" });
      return;
    }

    const repoPath = `OBE/public/collections/${slug}/${filename}`;
    const existing = await getFile(repoPath);
    await putFile(repoPath, buffer, `Admin: upload image ${slug}/${filename}`, existing?.sha);

    res.status(200).json({ ok: true, path: `/collections/${slug}/${filename}` });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}
