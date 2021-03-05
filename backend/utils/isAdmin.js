// import React from 'react';

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: 'Invalid Admin Token'})
    }
};

export default isAdmin;
