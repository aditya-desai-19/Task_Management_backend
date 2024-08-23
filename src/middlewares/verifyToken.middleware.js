//@ts-check
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../controllers/user.controllers.js';

const verifyToken = () => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ msg: 'Please authenticate yourself' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }

            req.user = user;
            next();
        });
    }
}


const restrictUser = (roles) => {
    return (req, res, next) => {
        const user = { ...req.user.user };
        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        next();
    }
}

export { verifyToken, restrictUser }