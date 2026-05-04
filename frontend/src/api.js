const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';
const ADMIN_TOKEN_KEY = 'dbv_admin_token';

function parseJwtPayload(token) {
  try {
    const base64 = token.split('.')[1];
    if (!base64) {
      return null;
    }

    const normalized = base64.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(normalized));
  } catch (_error) {
    return null;
  }
}

async function request(path, options = {}) {
  const adminToken = window.localStorage.getItem(ADMIN_TOKEN_KEY);
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }

  return data;
}

export function getAdminToken() {
  const token = window.localStorage.getItem(ADMIN_TOKEN_KEY) || '';
  if (!token) {
    return '';
  }

  const payload = parseJwtPayload(token);
  if (!payload?.exp) {
    return token;
  }

  if (Date.now() >= payload.exp * 1000) {
    clearAdminToken();
    return '';
  }

  return token;
}

export function setAdminToken(token) {
  window.localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  window.localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function loginAdmin(payload) {
  return request('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function fetchHomeContent() {
  return request('/api/home-content');
}

export function createQuote(payload) {
  return request('/api/quotes', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function fetchAdminOverview() {
  return request('/api/admin/overview');
}

export function fetchAdminUsers() {
  return request('/api/admin/users');
}

export function createAdminUser(payload) {
  return request('/api/admin/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function fetchAdminQuotes() {
  return request('/api/admin/quotes');
}

export function updateAdminQuoteStatus(id, status) {
  return request(`/api/admin/quotes/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function fetchAdminFaqs() {
  return request('/api/admin/faqs');
}

export function createAdminFaq(payload) {
  return request('/api/admin/faqs', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateAdminFaq(id, payload) {
  return request(`/api/admin/faqs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteAdminFaq(id) {
  return request(`/api/admin/faqs/${id}`, {
    method: 'DELETE',
  });
}

export function fetchAdminNews() {
  return request('/api/admin/news');
}

export function createAdminNews(payload) {
  return request('/api/admin/news', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateAdminNews(id, payload) {
  return request(`/api/admin/news/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteAdminNews(id) {
  return request(`/api/admin/news/${id}`, {
    method: 'DELETE',
  });
}

export function fetchAdminInsuranceTypes() {
  return request('/api/admin/insurance-types');
}

export function createAdminInsuranceType(payload) {
  return request('/api/admin/insurance-types', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateAdminInsuranceType(id, payload) {
  return request(`/api/admin/insurance-types/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteAdminInsuranceType(id) {
  return request(`/api/admin/insurance-types/${id}`, {
    method: 'DELETE',
  });
}

export function fetchAdminContentEntity(entity) {
  return request(`/api/admin/content/${entity}`);
}

export function createAdminContentEntityItem(entity, payload) {
  return request(`/api/admin/content/${entity}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateAdminContentEntityItem(entity, id, payload) {
  return request(`/api/admin/content/${entity}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteAdminContentEntityItem(entity, id) {
  return request(`/api/admin/content/${entity}/${id}`, {
    method: 'DELETE',
  });
}

export function uploadAdminFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  return request('/api/admin/upload', {
    method: 'POST',
    body: formData,
  });
}
