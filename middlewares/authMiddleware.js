const jwt = require('jsonwebtoken')
//const session = require('express-session')
const hashedSecret = require('../crypto/config')
//const users = require('../data/users')

const generateToken = (user) => {
    return jwt.sign({user:user.id}, hashedSecret,{expiresIn: '1h'})
}

const verifyToken = (req,res,next) => {
    const token = req.session.token;
    if(!token) {
        return res.status(401).json({message: 'Token not provided'})
    }
    jwt.verify(token, hashedSecret, (err, decoded) => {
        if(err) {
            return res.status(401).json({message: 'Token invalid', error:err.message});
        }
        req.user = decoded.user;
        next()
    })
}

module.exports = {generateToken,verifyToken}