const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


module.exports = (req, res, next) => {
    try{
        const header = req.headers.authorization
    
        if(header == null){
            return res.status(401).json({message : "Invalid"});
        }

        const token = header.split(" ")[1];
       
        const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);
        const userId = decodedToken.userId;
    
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    }catch(error){
      console.log(error);
        res.status(403).json({
            message : "Echec Authentification",
            error : error 
        });
    }
};