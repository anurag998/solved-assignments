// Middleware for handling auth
const jwt = require("jsonwebtoken");

const secretKey = "Anurag";

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected


    // const jwtReceived = req.headers.Authorization;
    const jwtReceived = req.header('authorization');
    console.log(jwtReceived);

    try{
        const decoded = jwt.verify(jwtReceived, secretKey);
        next();
    }
    catch(err){
        res.status(403).json({
            msg: "Auth failed"
        });
    }

}

module.exports = adminMiddleware;