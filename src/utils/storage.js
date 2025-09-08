// simple localStorage-based persistence model
const STORAGE_KEY = 'url_shortener_data_v1';

export function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { urls: {} };
  try { return JSON.parse(raw); } catch(e) { return { urls: {} }; }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getUrl(shortcode) {
  const data = loadData();
  return data.urls[shortcode] || null;
}

export function putUrl(obj) {
  const data = loadData();
  data.urls = data.urls || {};
  data.urls[obj.shortcode] = obj;
  saveData(data);
}

export function deleteUrl(shortcode) {
  const data = loadData();
  if (data.urls && data.urls[shortcode]) {
    delete data.urls[shortcode];
    saveData(data);
  }
}

export function listUrls() {
  const data = loadData();
  return Object.values(data.urls || {});
}

export function addClick(shortcode, click) {
  const u = getUrl(shortcode);
  if (!u) return;
  u.clicks = u.clicks || [];
  u.clicks.push(click);
  putUrl(u);
}
