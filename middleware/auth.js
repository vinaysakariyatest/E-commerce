const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.decoded = decoded
        next()
    } catch (error) {
        console.log(error);
        return res.status(402).json({
            message: "Unauthorized access"
        })
    }
}