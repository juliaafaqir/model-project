// const {sign, verify} = require('jsonwebtoken')
const {generateToken} = require('../utils/jwt')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// @desc Register new user
// @routes POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if user exists 
    const userExists = await prisma.user.findUnique({
        where: { email: req.body.email}
        })

        if(userExists) {
            res.status(400)
            throw new Error('User already registred')
        }

    // Hash password
    // const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, 10)

    // create user
    const user = await prisma.user.create({
        data :{ 
        name,
        email,
        password: hashedPassword
        }
    })

    if (user) {
        res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        // token: generateToken(user)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc authenticate a user
// @routes POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email,password} = req.body

    // check for user email
    const user = await prisma.user.findUnique({
        where : {email : email}
    })

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken =  generateToken(user)
        res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
        })
        
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            // token: generateToken(user)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Get user data
// @routes GET  /api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
    const {id, name, email} = await prisma.user.findUnique({
        where: {id: parseInt(req.user.id)}
    })
    res.status(200).json({
        id,
        name,
        email
    })
})

// // Generate JWT
// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, {
//         expiresIn: '30d',
//     })
//  }
module.exports = {
    registerUser,
    loginUser,
    getMe
}