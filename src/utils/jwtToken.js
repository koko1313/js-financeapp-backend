import jwt from 'jsonwebtoken';

export const generateJWTToken = (user) => {
    return jwt.sign(user, process.env.JWT_TOKEN_SECRET, { expiresIn: '60s' });
}

export const decodeJWTToken = (req, res, next) => {
    const auth = req.headers.authorization;
    const jwtToken = auth && auth.split(' ')[1];

    jwt.verify(jwtToken, process.env.JWT_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(401).send({ message: "Invalid or expired JWT token" });
        } else {
            req.user = user; // attach the user to the req, so we can use it in the next function after middleware
            next();
        }
    });
}