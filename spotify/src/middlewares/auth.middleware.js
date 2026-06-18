const jwt = require("jsonwebtoken");

function getToken(req) {
    if (req.cookies?.token) {
        return req.cookies.token;
    }

    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
        return authHeader.slice(7);
    }

    return null;
}

async function authArtist(req, res, next) {
    const token = getToken(req);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized — login first and send the token cookie or Authorization: Bearer <token>" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "Only artists can upload. Register or login with role: \"artist\"" })
        }

        req.user = decoded;
        next()
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized — invalid or expired token" })
    }
}

async function authUser(req, res, next) {
    const token = getToken(req);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "user") {
            return res.status(403).json({ message: "You don't have access" })
        }

        req.user = decoded;
        next()
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" })
    }
}

async function authAny(req, res, next) {
    const token = getToken(req);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" })
    }
}

module.exports = { authArtist, authUser, authAny }
