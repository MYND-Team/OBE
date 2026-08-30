import { checkPassword, getFile, COLLECTIONS_PATH } from "./_github.js";

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
    const file = await getFile(COLLECTIONS_PATH);
    if (!file) {
      res.status(404).json({ ok: false, error: "collections.json not found in repo" });
      return;
    }
    const collections = JSON.parse(file.content.toString("utf8"));
    res.status(200).json({ ok: true, collections, sha: file.sha });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}
