const express = require('express')
const { userRegister, userLogin } = require('../controllers/userController')
const router = express.Router()

router.post('/login', userLogin);

router.post('/signup', userRegister);

module.exports = router;