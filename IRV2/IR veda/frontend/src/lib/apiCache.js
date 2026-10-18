const API = import.meta.env.VITE_API_BASE_URL || '/api'
const PREFIX = 'irveda_cache:'

export function readCache(path) {
  try {
    const hit = JSON.parse(localStorage.getItem(PREFIX + path))
    return hit ? hit.data : null
  } catch {
    return null
  }
}

function writeCache(path, data) {
  try {
    localStorage.setItem(PREFIX + path, JSON.stringify({ t: Date.now(), data }))
  } catch { /* storage full — ignore */ }
}

// Stale-while-revalidate: cached data is returned instantly, the network
// refreshes the cache in the background for the next visit.
export function cachedGet(path, { ttl = 10 * 60 * 1000 } = {}) {
  const key = PREFIX + path
  let hit = null
  try { hit = JSON.parse(localStorage.getItem(key)) } catch { hit = null }

  const revalidate = fetch(API + path)
    .then(res => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
    .then(data => { writeCache(path, data); return data })

  if (hit && Date.now() - hit.t < ttl) {
    // Fresh — revalidate quietly in the background anyway
    revalidate.catch(() => {})
    return Promise.resolve(hit.data)
  }
  if (hit) {
    // Stale — serve instantly, refresh cache in background
    revalidate.catch(() => {})
    return Promise.resolve(hit.data)
  }
  return revalidate
}

export function prefetch(path, opts) {
  return cachedGet(path, opts).catch(() => null)
}
