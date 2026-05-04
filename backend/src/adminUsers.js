const crypto = require('crypto');
const db = require('./db');

const DEFAULT_ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const VALID_ROLES = new Set(['owner', 'admin']);

function normalizeUsername(username) {
  return String(username || '').trim().toLowerCase();
}

function normalizeDisplayName(displayName, username) {
  const value = String(displayName || '').trim();
  return value || normalizeUsername(username);
}

function normalizeRole(role) {
  const value = String(role || '').trim().toLowerCase();
  return VALID_ROLES.has(value) ? value : 'admin';
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return `${salt}:${derived}`;
}

function verifyPassword(password, passwordHash) {
  const [salt, expectedHash] = String(passwordHash || '').split(':');
  if (!salt || !expectedHash) {
    return false;
  }

  const actualHash = crypto.scryptSync(String(password), salt, 64);
  const expectedBuffer = Buffer.from(expectedHash, 'hex');

  if (actualHash.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(actualHash, expectedBuffer);
}

async function ensureAdminUsersTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(120) NOT NULL UNIQUE,
      display_name VARCHAR(255) NOT NULL,
      password_hash TEXT NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'admin',
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_by INT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

async function ensureDefaultAdminUser() {
  const result = await db.query('SELECT COUNT(*)::int AS total FROM admin_users');
  const total = result.rows[0]?.total || 0;

  if (total > 0) {
    return;
  }

  await createAdminUser({
    username: DEFAULT_ADMIN_USERNAME,
    password: DEFAULT_ADMIN_PASSWORD,
    displayName: 'System Owner',
    role: 'owner',
  });
}

async function findAdminUserByUsername(username) {
  const normalizedUsername = normalizeUsername(username);
  if (!normalizedUsername) {
    return null;
  }

  const result = await db.query(
    `
      SELECT id, username, display_name, password_hash, role, is_active, created_by, created_at
      FROM admin_users
      WHERE username = $1
      LIMIT 1
    `,
    [normalizedUsername]
  );

  return result.rows[0] || null;
}

async function verifyAdminCredentials(username, password) {
  const user = await findAdminUserByUsername(username);

  if (!user || !user.is_active) {
    return null;
  }

  if (!verifyPassword(password, user.password_hash)) {
    return null;
  }

  return user;
}

async function createAdminUser(payload, createdBy = null) {
  const username = normalizeUsername(payload.username);
  const password = String(payload.password || '').trim();
  const displayName = normalizeDisplayName(payload.displayName, username);
  const role = normalizeRole(payload.role);

  if (!username || !password) {
    throw new Error('ADMIN_USER_INVALID_PAYLOAD');
  }

  const passwordHash = hashPassword(password);

  const result = await db.query(
    `
      INSERT INTO admin_users (username, display_name, password_hash, role, created_by)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, username, display_name AS "displayName", role, is_active AS "isActive", created_by AS "createdBy", created_at AS "createdAt"
    `,
    [username, displayName, passwordHash, role, createdBy]
  );

  return result.rows[0];
}

async function listAdminUsers() {
  const result = await db.query(`
    SELECT
      id,
      username,
      display_name AS "displayName",
      role,
      is_active AS "isActive",
      created_by AS "createdBy",
      created_at AS "createdAt"
    FROM admin_users
    ORDER BY created_at DESC, id DESC
  `);

  return result.rows;
}

module.exports = {
  createAdminUser,
  ensureAdminUsersTable,
  ensureDefaultAdminUser,
  findAdminUserByUsername,
  listAdminUsers,
  normalizeDisplayName,
  normalizeRole,
  normalizeUsername,
  verifyAdminCredentials,
};
