"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowRoles = allowRoles;
function allowRoles(...roles) {
    return (req, res, next) => {
        const user = req.body.user;
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!roles.includes(user.userRole)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient role' });
        }
        next();
    };
}
