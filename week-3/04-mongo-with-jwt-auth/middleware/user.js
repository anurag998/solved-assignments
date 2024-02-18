const jwt = require("jsonwebtoken");


const secretKey = "Anurag";

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    // const jwtReceived = req.headers.Authorization;
    const jwtReceived = req.header('authorization');
    console.log(jwtReceived);


    try{
        console.log("Decoding");
        const decoded = jwt.verify(jwtReceived, secretKey);
        console.log("Decoded");
        res.locals.username = decoded.username;
        console.log(decoded);
        next();
    }
    catch(err){
        res.status(403).json({
            msg: "Auth failed"
        });
    }
}

module.exports = userMiddleware;