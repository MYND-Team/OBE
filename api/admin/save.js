import { checkPassword, getFile, putFile, COLLECTIONS_PATH } from "./_github.js";

function validate(collections) {
  if (!Array.isArray(collections) || collections.length === 0) {
    return "collections must be a non-empty array";
  }
  const slugs = new Set();
  for (const item of collections) {
    if (!item.slug || typeof item.slug !== "string" || !/^[a-z0-9-]+$/.test(item.slug)) {
      return `Invalid or missing slug: ${JSON.stringify(item.slug)}`;
    }
    if (slugs.has(item.slug)) return `Duplicate slug: ${item.slug}`;
    slugs.add(item.slug);
    if (!item.name || typeof item.name !== "string") return `Collection ${item.slug} is missing a name`;
    if (!item.image || typeof item.image !== "string") return `Collection ${item.slug} is missing a cover image`;
    if (!Array.isArray(item.rooms)) return `Collection ${item.slug} is missing a rooms array`;
    for (const room of item.rooms) {
      if (!room.label || typeof room.label !== "string") return `A room in ${item.slug} is missing a name`;
      if (!Array.isArray(room.images) || room.images.length === 0) {
        return `Room "${room.label}" in ${item.slug} needs at least one image`;
      }
    }
  }
  return null;
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
    const { collections, sha } = req.body || {};
    const validationError = validate(collections);
    if (validationError) {
      res.status(400).json({ ok: false, error: validationError });
      return;
    }
    if (!sha) {
      res.status(400).json({ ok: false, error: "Missing sha (reload the panel and try again)" });
      return;
    }

    const current = await getFile(COLLECTIONS_PATH);
    if (current && current.sha !== sha) {
      res.status(409).json({ ok: false, error: "Collections were changed elsewhere since you loaded the panel. Reload and re-apply your edit." });
      return;
    }

    const content = JSON.stringify(collections, null, 2) + "\n";
    const result = await putFile(COLLECTIONS_PATH, content, "Admin: update collections", sha);
    res.status(200).json({ ok: true, sha: result.content.sha });
  } catch (error) {
    res.status(error.status === 409 ? 409 : 500).json({ ok: false, error: error.message });
  }
}
