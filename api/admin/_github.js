const REPO = "MYND-Team/OBE";
const BRANCH = "main";
export const COLLECTIONS_PATH = "OBE/src/collections.json";

function authHeaders() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not configured");
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json"
  };
}

export function checkPassword(password) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD is not configured");
  return typeof password === "string" && password.length > 0 && password === expected;
}

export async function getFile(repoPath) {
  const url = `https://api.github.com/repos/${REPO}/contents/${repoPath}?ref=${BRANCH}`;
  const res = await fetch(url, { headers: authHeaders() });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub GET ${repoPath} failed: ${res.status} ${await res.text()}`);
  const body = await res.json();
  return { sha: body.sha, content: Buffer.from(body.content, "base64") };
}

export async function putFile(repoPath, content, message, sha) {
  const url = `https://api.github.com/repos/${REPO}/contents/${repoPath}`;
  const payload = {
    message,
    content: Buffer.isBuffer(content) ? content.toString("base64") : Buffer.from(content).toString("base64"),
    branch: BRANCH
  };
  if (sha) payload.sha = sha;
  const res = await fetch(url, { method: "PUT", headers: authHeaders(), body: JSON.stringify(payload) });
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(`GitHub PUT ${repoPath} failed: ${res.status} ${text}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}
