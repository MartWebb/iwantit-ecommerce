import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer xxxxxxxxx
        jwt.verify(token, process.env.JWT_SECRET || 'thisismysecret', (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ message: 'No Token' });
    }
};





export default isAuth;