import { checkPassword, getFile, putFile, SITE_CONTENT_PATH } from "./_github.js";

const REQUIRED_KEYS = ["header", "home", "footer", "collectionsPage"];

function validate(content) {
  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return "content must be an object";
  }
  for (const key of REQUIRED_KEYS) {
    if (!(key in content)) return `content is missing required section "${key}"`;
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
    const { content, sha } = req.body || {};
    const validationError = validate(content);
    if (validationError) {
      res.status(400).json({ ok: false, error: validationError });
      return;
    }
    if (!sha) {
      res.status(400).json({ ok: false, error: "Missing sha (reload the panel and try again)" });
      return;
    }

    const current = await getFile(SITE_CONTENT_PATH);
    if (current && current.sha !== sha) {
      res.status(409).json({ ok: false, error: "Site content was changed elsewhere since you loaded the panel. Reload and re-apply your edit." });
      return;
    }

    const body = JSON.stringify(content, null, 2) + "\n";
    const result = await putFile(SITE_CONTENT_PATH, body, "Admin: update site content", sha);
    res.status(200).json({ ok: true, sha: result.content.sha });
  } catch (error) {
    res.status(error.status === 409 ? 409 : 500).json({ ok: false, error: error.message });
  }
}
