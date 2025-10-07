export function loadCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveCache(key: string, data: any) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

const FAV_KEY = 'favorites:v1';

export function loadFavorites(): string[] {
  return loadCache<string[]>(FAV_KEY) || [];
}

export function saveFavorites(favs: string[]) {
  saveCache(FAV_KEY, favs);
}