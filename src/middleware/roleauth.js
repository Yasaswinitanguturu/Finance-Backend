const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.headers['role']; 
        const userStatus = req.headers['status'] || 'active'; // Assume active if not sent

        if (!userRole) {
            return res.status(401).json({ error: "No role provided" });
        }
        if (userStatus === 'inactive') {
            return res.status(403).json({ error: "Access Denied: Your account is inactive." });
        }

        if (allowedRoles.includes(userRole)) {
            return next(); 
        } else {
            return res.status(403).json({ error: `Access Denied for ${userRole}` });
        }
    };
};
module.exports = authorize;