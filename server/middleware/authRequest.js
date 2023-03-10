const jwt = require('jsonwebtoken') 
const User = require('../models/userModel')

const authRequest = async (req, res, next) => {
    const { authorization } = req.headers

    console.log(authorization)

    if(!authorization){
        return res.status(406).json({
            error: "Authentication failure."
        })
    }

    const token = authorization.split(' ')[1]

    try{    
        const {_id} = jwt.verify(token, process.env.SECRET_KEY)
        req.user = await User.findOne({_id}).select('_id')
        next()

    }catch (error){
        return res.status(401).json({
            error: "Invalid Authentication."
        })
    }
}


module.exports = authRequest