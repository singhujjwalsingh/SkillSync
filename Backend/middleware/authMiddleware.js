const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'skillsync-dev-super-secret-key-2026';

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication required. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired authentication session' });
    }
}

function checkRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        // Normalize role aliases
        let userRole = req.user.role;
        if (userRole === 'institution' || userRole === 'tpo') userRole = 'college_tpo';
        if (userRole === 'industry') userRole = 'recruiter';

        const normalizedAllowed = allowedRoles.map(r => {
            if (r === 'institution' || r === 'tpo') return 'college_tpo';
            if (r === 'industry') return 'recruiter';
            return r;
        });

        if (!normalizedAllowed.includes(userRole) && !normalizedAllowed.includes('admin')) {
            return res.status(403).json({ message: `Access denied. Role "${userRole}" lacks required permissions.` });
        }
        next();
    };
}

module.exports = { verifyToken, checkRole, JWT_SECRET };