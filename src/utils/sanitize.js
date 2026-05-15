import DOMPurify from 'dompurify';

export function sanitize(str) {
  if (typeof str !== 'string') return '';
  return DOMPurify.sanitize(str.trim(), { ALLOWED_TAGS: [] });
}

export function validateEmail(email) {
  if (!email) return '';
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Invalid email address';
}

export function validatePhone(phone) {
  if (!phone) return '';
  const cleaned = phone.replace(/[\s()+-]/g, '');
  return /^[\d]{7,15}$/.test(cleaned) ? '' : 'Invalid phone number';
}

export function validateUrl(url) {
  if (!url) return '';
  try {
    new URL(url);
    return '';
  } catch {
    return 'Invalid URL';
  }
}
