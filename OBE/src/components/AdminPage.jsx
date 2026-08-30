import { useEffect, useState } from "react";

const PASSWORD_KEY = "obe_admin_password";

async function callApi(path, body) {
  const res = await fetch(`/api/admin/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json().catch(() => ({ ok: false, error: "Bad response from server" }));
  if (!res.ok || !data.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f2ea",
    color: "#211f14",
    fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
    padding: "2rem"
  },
  card: {
    maxWidth: 420,
    margin: "10vh auto",
    background: "#fff",
    borderRadius: 12,
    padding: "2rem",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
  },
  input: {
    width: "100%",
    padding: "0.65rem 0.8rem",
    borderRadius: 8,
    border: "1px solid #d8d3c2",
    fontSize: "1rem",
    marginBottom: "0.75rem",
    fontFamily: "inherit"
  },
  button: {
    padding: "0.65rem 1.2rem",
    borderRadius: 8,
    border: "none",
    background: "#333721",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "0.95rem"
  },
  buttonSecondary: {
    padding: "0.55rem 1rem",
    borderRadius: 8,
    border: "1px solid #333721",
    background: "transparent",
    color: "#333721",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "0.88rem"
  },
  buttonDanger: {
    padding: "0.4rem 0.8rem",
    borderRadius: 8,
    border: "1px solid #a5433a",
    background: "transparent",
    color: "#a5433a",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "0.8rem"
  },
  label: {
    display: "block",
    fontSize: "0.78rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    color: "#6b6753",
    marginBottom: "0.3rem",
    marginTop: "1rem"
  },
  collectionCard: {
    background: "#fff",
    borderRadius: 12,
    padding: "1.25rem",
    marginBottom: "1rem",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    display: "flex",
    gap: "1rem",
    alignItems: "center"
  },
  thumb: {
    width: 90,
    height: 60,
    objectFit: "cover",
    borderRadius: 8,
    background: "#eee",
    flexShrink: 0
  },
  roomBox: {
    border: "1px solid #e3ded0",
    borderRadius: 10,
    padding: "1rem",
    marginBottom: "1rem"
  },
  imageRow: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    marginTop: "0.5rem"
  },
  imageThumbWrap: {
    position: "relative",
    width: 72,
    height: 72
  },
  imageThumb: {
    width: 72,
    height: 72,
    objectFit: "cover",
    borderRadius: 8,
    border: "1px solid #e3ded0"
  },
  removeBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: "#a5433a",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "0.7rem",
    lineHeight: "20px",
    textAlign: "center",
    padding: 0
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
    gap: "0.75rem"
  },
  banner: (kind) => ({
    padding: "0.65rem 1rem",
    borderRadius: 8,
    marginBottom: "1rem",
    fontSize: "0.9rem",
    background: kind === "error" ? "#f9dcd8" : "#dcecd9",
    color: kind === "error" ? "#7c2b23" : "#2c5c2a"
  })
};

function LoginGate({ onAuthed }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setChecking(true);
    setError("");
    try {
      await callApi("login", { password });
      sessionStorage.setItem(PASSWORD_KEY, password);
      onAuthed(password);
    } catch (err) {
      setError(err.message);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={submit}>
        <h1 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>OBÉ Admin</h1>
        {error && <div style={styles.banner("error")}>{error}</div>}
        <label style={styles.label}>Password</label>
        <input
          style={styles.input}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoFocus
        />
        <button style={styles.button} type="submit" disabled={checking}>
          {checking ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}

function RoomEditor({ room, slug, onChange, onUploading }) {
  const update = (patch) => onChange({ ...room, ...patch });

  const addImages = async (files) => {
    onUploading(true);
    try {
      const newPaths = [];
      for (const file of Array.from(files)) {
        const dataUrl = await fileToDataUrl(file);
        const ext = (file.name.match(/\.[a-zA-Z0-9]+$/)?.[0] || ".jpg").toLowerCase();
        const filename = `${room.id || "room"}-${Date.now()}-${newPaths.length}${ext}`;
        const password = sessionStorage.getItem(PASSWORD_KEY);
        const result = await callApi("upload", { password, slug, filename, dataUrl });
        newPaths.push(result.path);
      }
      update({ images: [...(room.images || []), ...newPaths] });
    } finally {
      onUploading(false);
    }
  };

  const removeImage = (path) => {
    update({ images: room.images.filter((img) => img !== path) });
  };

  return (
    <div style={styles.roomBox}>
      <label style={styles.label}>Button name</label>
      <input
        style={styles.input}
        value={room.label || ""}
        onChange={(event) => update({ label: event.target.value })}
      />
      <label style={styles.label}>Images ({room.images?.length || 0})</label>
      <div style={styles.imageRow}>
        {(room.images || []).map((img) => (
          <div style={styles.imageThumbWrap} key={img}>
            <img src={img} alt="" style={styles.imageThumb} />
            <button
              type="button"
              style={styles.removeBadge}
              onClick={() => removeImage(img)}
              title="Remove image"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <input
        style={{ marginTop: "0.6rem" }}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        onChange={(event) => event.target.files.length && addImages(event.target.files)}
      />
    </div>
  );
}

function CollectionEditor({ collection, onChange, onDelete, onClose, onUploading }) {
  const update = (patch) => onChange({ ...collection, ...patch });

  const updateRoom = (index, nextRoom) => {
    const rooms = [...collection.rooms];
    rooms[index] = nextRoom;
    update({ rooms });
  };

  const replaceCover = async (file) => {
    onUploading(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      const ext = (file.name.match(/\.[a-zA-Z0-9]+$/)?.[0] || ".jpg").toLowerCase();
      const password = sessionStorage.getItem(PASSWORD_KEY);
      const result = await callApi("upload", {
        password,
        slug: collection.slug,
        filename: `cover-${Date.now()}${ext}`,
        dataUrl
      });
      update({ image: result.path });
    } finally {
      onUploading(false);
    }
  };

  return (
    <div style={{ ...styles.card, maxWidth: 640, margin: "0 auto 2rem" }}>
      <div style={styles.topBar}>
        <h2 style={{ fontSize: "1.2rem" }}>{collection.name || "New collection"}</h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="button" style={styles.buttonDanger} onClick={onDelete}>
            Delete collection
          </button>
          <button type="button" style={styles.buttonSecondary} onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      <label style={styles.label}>Name</label>
      <input style={styles.input} value={collection.name || ""} onChange={(e) => update({ name: e.target.value })} />

      <label style={styles.label}>Description</label>
      <textarea
        style={{ ...styles.input, minHeight: 90, resize: "vertical" }}
        value={collection.text || ""}
        onChange={(e) => update({ text: e.target.value })}
      />

      <label style={styles.label}>First image (cover)</label>
      {collection.image && <img src={collection.image} alt="" style={{ ...styles.thumb, width: 160, height: 100 }} />}
      <input
        style={{ display: "block", marginTop: "0.5rem" }}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(e) => e.target.files[0] && replaceCover(e.target.files[0])}
      />

      <h3 style={{ marginTop: "1.5rem", fontSize: "1rem" }}>Room packages (buttons)</h3>
      {collection.rooms.map((room, index) => (
        <RoomEditor
          key={room.id || index}
          room={room}
          slug={collection.slug}
          onChange={(next) => updateRoom(index, next)}
          onUploading={onUploading}
        />
      ))}
    </div>
  );
}

function AdminPanel({ password, onAuthError }) {
  const [collections, setCollections] = useState(null);
  const [sha, setSha] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadError, setLoadError] = useState("");

  const load = async () => {
    setLoadError("");
    try {
      const data = await callApi("get", { password });
      setCollections(data.collections);
      setSha(data.sha);
    } catch (err) {
      if (err.message === "Wrong password") {
        onAuthError();
        return;
      }
      setLoadError(err.message);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async (nextCollections) => {
    setSaving(true);
    setStatus(null);
    try {
      const result = await callApi("save", { password, collections: nextCollections, sha });
      setCollections(nextCollections);
      setSha(result.sha);
      setStatus({ kind: "ok", text: "Saved and pushed to GitHub. The live site will update shortly." });
    } catch (err) {
      setStatus({ kind: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const updateCollection = (index, next) => {
    const copy = [...collections];
    copy[index] = next;
    setCollections(copy);
  };

  const addCollection = () => {
    const name = prompt("New collection name?");
    if (!name) return;
    const slug = slugify(name);
    if (!slug || collections.some((c) => c.slug === slug)) {
      alert("Pick a different name — that slug already exists or is invalid.");
      return;
    }
    const blank = {
      slug,
      name,
      tagline: "",
      text: "",
      image: "",
      packages: [{ id: "standard", label: "Essential", price: "Contact us for pricing" }],
      styles: [],
      bedroomOptions: [],
      addOns: [],
      rooms: [
        { id: "living-dining", label: "Living & Dining Room", images: [], description: "", details: [] },
        { id: "master-bedroom", label: "Master Bedroom", images: [], description: "", details: [] },
        { id: "guest-bedroom", label: "Guest Bedroom", images: [], description: "", details: [] }
      ]
    };
    setCollections([...collections, blank]);
    setEditingIndex(collections.length);
  };

  const deleteCollection = (index) => {
    const target = collections[index];
    if (!confirm(`Delete "${target.name}"? This saves immediately.`)) return;
    const next = collections.filter((_, i) => i !== index);
    setEditingIndex(null);
    save(next);
  };

  if (loadError) {
    return (
      <div style={styles.page}>
        <div style={styles.banner("error")}>{loadError}</div>
        <button style={styles.button} onClick={load}>Retry</button>
      </div>
    );
  }

  if (!collections) {
    return <div style={styles.page}>Loading…</div>;
  }

  if (editingIndex !== null && collections[editingIndex]) {
    return (
      <div style={styles.page}>
        {status && <div style={{ ...styles.banner(status.kind), maxWidth: 640, margin: "0 auto 1rem" }}>{status.text}</div>}
        {uploading && <div style={{ ...styles.banner("ok"), maxWidth: 640, margin: "0 auto 1rem" }}>Uploading image…</div>}
        <CollectionEditor
          collection={collections[editingIndex]}
          onChange={(next) => updateCollection(editingIndex, next)}
          onDelete={() => deleteCollection(editingIndex)}
          onClose={() => setEditingIndex(null)}
          onUploading={setUploading}
        />
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "right" }}>
          <button style={styles.button} disabled={saving || uploading} onClick={() => save(collections)}>
            {saving ? "Saving…" : "Save & push to GitHub"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={styles.topBar}>
          <h1 style={{ fontSize: "1.4rem" }}>Collections</h1>
          <button style={styles.button} onClick={addCollection}>+ Add collection</button>
        </div>
        {status && <div style={styles.banner(status.kind)}>{status.text}</div>}
        {collections.map((collection, index) => (
          <div style={styles.collectionCard} key={collection.slug}>
            {collection.image ? (
              <img src={collection.image} alt="" style={styles.thumb} />
            ) : (
              <div style={styles.thumb} />
            )}
            <div style={{ flex: 1 }}>
              <strong>{collection.name}</strong>
              <div style={{ fontSize: "0.85rem", color: "#6b6753" }}>
                {collection.rooms.length} room package{collection.rooms.length === 1 ? "" : "s"}
              </div>
            </div>
            <button style={styles.buttonSecondary} onClick={() => setEditingIndex(index)}>
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminPage() {
  const [password, setPassword] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(PASSWORD_KEY);
    if (stored) setPassword(stored);
  }, []);

  if (!password) {
    return <LoginGate onAuthed={setPassword} />;
  }

  return (
    <AdminPanel
      password={password}
      onAuthError={() => {
        sessionStorage.removeItem(PASSWORD_KEY);
        setPassword(null);
      }}
    />
  );
}
