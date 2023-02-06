const mongoose = require('mongoose')
const User = require('../models/userModel')
const validator = require('email-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Create new user

const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '1d' })
}

const userRegister = async (req, res) => {
    try{
        const { emailAddress, password } = req.body
        console.log({emailAddress, password})

        if(!validator.validate(emailAddress)){
            return res.status(406).json({
                error: "Invalid Email address."
            })
        }

        if(password.length < 6){
            return res.status(406).json({
                error: "Invalid Password (Atleast 6 characters required)"
            })
        }

        const exists = await User.findOne({ emailAddress })

        if(exists){
            return res.status(406).json({
                error: "The email has already been registered."
            })
        }

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(password, salt)

        console.log(hash)

        //const user = await User.create({ emailAddress, password })

        const user = await User.create({emailAddress, password:hash})
        
        const token = generateToken(user._id)

        return res.status(201).json({
            token: token 
        })
    }catch (error) {
        res.status(406).json({
            error: error.message
        })
    }
    
}

const userLogin = async (req, res) => {
    try{
        const { emailAddress, password } = req.body

        if(!validator.validate(emailAddress)){
            return res.status(406).json({
                error: "Invalid Email address."
            })
        }

        const exists = await User.findOne({ emailAddress })

        if(!exists){
            return res.status(404).json({
                error: "Account not found."
            })
        }
        
        if(await bcrypt.compare( password, exists.password)){
            const token = generateToken(exists._id);
            return res.status(200).json({
                token: token
            })
        }
        

        return res.status(406).json({
            error: "Passwords didn't match."
        })

    
        
    }catch (error) {
        res.status(406).json({
            error: error
        })
    }
    
}

module.exports = {
    userLogin, userRegister
}