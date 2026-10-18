const BASE = import.meta.env.VITE_API_BASE_URL || "/api";

// Short-lived in-memory cache so navigating between admin pages is instant.
// Mutations (post/patch/put/del) clear it, so data never goes stale after an action.
const cache = new Map(); // path -> { t, data }
const TTL = 15_000;

async function request(path, options = {}) {
  const token = localStorage.getItem("irveda_token");
  const res = await fetch(BASE + path, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const err = new Error(data?.error || "Something went wrong");
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  get: async (path) => {
    const hit = cache.get(path);
    if (hit && Date.now() - hit.t < TTL) return hit.data;
    const data = await request(path);
    cache.set(path, { t: Date.now(), data });
    return data;
  },
  post: async (path, body) => {
    const data = await request(path, { method: "POST", body: JSON.stringify(body) });
    cache.clear();
    return data;
  },
  patch: async (path, body) => {
    const data = await request(path, { method: "PATCH", body: JSON.stringify(body) });
    cache.clear();
    return data;
  },
  put: async (path, body) => {
    const data = await request(path, { method: "PUT", body: JSON.stringify(body) });
    cache.clear();
    return data;
  },
  del: async (path) => {
    const data = await request(path, { method: "DELETE" });
    cache.clear();
    return data;
  },
};
