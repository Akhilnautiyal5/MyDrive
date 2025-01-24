const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        // return res.status(401).json({ message: "Unauthorized" });
        return res.redirect("/user/register")
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_STRING);
        req.user = decoded;
        
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = auth;