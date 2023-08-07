const jwt = require("jsonwebtoken");
const errorHandler = require("./error")
const checkAuth = (req, res, next) => {
    console.log(req, "req")
    const token =  req.headers.authorization?.split(" ")[1];;
    console.log("+++++++++++++Token Toklen++++++++++++",token, "tokentokenUser++++++++")
    if(!token) {
        return next(errorHandler({status: 401, message: "Unauthorized token not found"}))
    }
    return jwt.verify(token, 'secret_is_a_secret', (err, decoded) => {
        if(err) {
            return next(errorHandler({status: 500, message: "invalid Token"}))
        }
        req.user = decoded;
        return next()
    })
}
exports.checkAuth = checkAuth