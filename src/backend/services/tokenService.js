const jwt = require('jsonwebtoken')
const tokenModel = require('../models/tokenModel')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(
            payload,
            process.env.SECRETACCES,
            {
                expiresIn: '30m'
            }
        )

        const refreshToken = jwt.sign(
            payload,
            process.env.SECRETREFRESH,
            {
                expiresIn: '30d'
            }
        )

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, device, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId, device: device });
        
        if (tokenData) {
            tokenData.refresh = refreshToken;
            return tokenData.save();
        }

        const token = await tokenModel.create({
            user: userId,
            device: device,
            refresh: refreshToken
        })

        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({refresh: refreshToken})
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({refresh: refreshToken})
        return tokenData
    }

    validateRefresh(refreshToken) {
        try {
            const userData = jwt.verify(refreshToken, process.env.SECRETREFRESH)
            return userData
        } catch (error) {
            return null
        }
    }

    validateAccess(accessToken) {
        try {
            const userData = jwt.verify(accessToken, process.env.SECRETACCES)
            return userData
        } catch (error) {
            return null
        }
    }
}

module.exports = new TokenService()