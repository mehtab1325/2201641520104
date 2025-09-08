// Replace this stub with the real logging middleware from your Pre-Test Setup.
// The test forbids using console.log; replace the implementation below with your middleware's call.
export function logEvent(eventName, payload = {}) {
  const key = 'url_shortener_logs';
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.push({ eventName, payload, ts: Date.now() });
  localStorage.setItem(key, JSON.stringify(existing));
}
