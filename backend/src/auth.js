const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';

function createAdminToken(user) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      username: user.username,
      displayName: user.displayName || user.display_name || user.username,
    },
    JWT_SECRET,
    {
      expiresIn: '24h',
    }
  );
}

function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) {
    return res.status(401).json({
      message: 'Admin authentication required.',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminUser = decoded;
    return next();
  } catch (_error) {
    return res.status(401).json({
      message: 'Admin token is invalid or expired.',
    });
  }
}

module.exports = {
  createAdminToken,
  requireAdminAuth,
};
