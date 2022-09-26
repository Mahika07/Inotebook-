var jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();
const sshkey = process.env.sshkey || "mahikasharma@$000"
const fetchuser = (req, res, next) => {
    const token = req.header('authtoken');
    if (!token) {
        res.status(401).send("please authaincate a valid token")
    }
    try {
        const data = jwt.verify(token, sshkey);
        req.user = data.user;
        next();
    }
    catch (error) {
        res.status(401).send("please authaincate a valid token")
    }
}

module.exports = fetchuser