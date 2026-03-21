const tokenService = require("../services/tokenService")

function authMidleware(req, res, next) {
    try {
        const authorization = req.headers.authorization
        if(!authorization) {
            return res.status(401).json({
                error: "unauthoraize",
                message: "користувач не авторизован"
            })
        }

        const accesToken = authorization.split(' ')[1]
        if(!accesToken) {
            return res.status(401).json({
                error: "unauthoraize",
                message: "користувач не авторизован"
            })
        }

        const userData = tokenService.validateAccess(accesToken)
        if(!userData) {
            return res.status(401).json({
                error: "unauthoraize",
                message: "користувач не авторизован"
            })
        }

        req.user = userData
        next()
    } catch (error) {
        return res.status(401).json({
            error: "unauthoraize",
            message: "користувач не авторизован"
        })
    }
}

module.exports = authMidleware