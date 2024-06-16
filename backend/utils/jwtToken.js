const jwt = require("jsonwebtoken");

const getJwtToken =  (user) => {
    return jwt.sign({user},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

// create Token and send in  cookies

const sendToken = async(user, res) => {
    const token = getJwtToken(user);
    const options = {
        expiresIn : new Date(
            Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.cookie("token", token, options)
    
}

module.exports = {
    getJwtToken,sendToken
}