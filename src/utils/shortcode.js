// helper to generate a short, URL-friendly shortcode
export function generateShortcode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i = 0; i < length; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

// validate custom shortcode: alphanumeric and between 3 and 12 chars
export function isValidShortcode(code) {
  return /^[A-Za-z0-9]{3,12}$/.test(code);
}
