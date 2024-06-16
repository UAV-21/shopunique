const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = async(req, res, next) => {
    const { token } = req.cookies;
    
    if(!token){
        return res.status(401).send({
            status:false,
            message: "Please login to access this resource"
        });
    }
    const decodeToken = jwt.verify(token,process.env.JWT_SECRET_KEY);

    req.user = decodeToken;
    next();
}