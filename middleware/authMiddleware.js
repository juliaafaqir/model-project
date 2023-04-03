const {generateToken} = require('../utils/jwt')
const {sign, verify} = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies['access-token']

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }

    try{
        const validToken = verify(token, process.env.JWT_SECRET)
        if (validToken) {
            req.authenticated = true

            //Get user from the token
            req.user = await prisma.user.findUnique({
                where : { id : validToken.id}
            })
            return next()
        }
    } catch(error){
        console.log(error.message)
        res.status(401)
        throw new Error('Not authorized')
    }
})

module.exports = { protect }