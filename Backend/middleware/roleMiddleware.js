const { checkRole } = require('./authMiddleware');

function requireRole(...roles) {
    return checkRole(...roles);
}

module.exports = { requireRole };