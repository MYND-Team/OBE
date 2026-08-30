import { checkPassword } from "./_github.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }
  try {
    const ok = checkPassword(req.body?.password);
    res.status(ok ? 200 : 401).json({ ok });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}
