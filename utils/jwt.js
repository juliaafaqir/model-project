const {sign, verify} = require('jsonwebtoken');

const generateToken = (user) => {
    const accessToken = sign(
        {id : user.id},
        process.env.JWT_SECRET
    );

    return accessToken
};

module.exports = { generateToken }