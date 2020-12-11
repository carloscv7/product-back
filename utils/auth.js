const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.veryToken = (req, res, next) =>{
    const {token} = req.cookies;
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if(error){
            return res.status(401).json({error});
        }
        User.findById(decoded.id)
            .then((user) =>{
                req.user = user;
                next();
            });
    });
}

exports.checkRole = (roles) => {
    return (req, res, next) => {
        const {role} = req.user;
        if(roles.includes(role)){
            return next();
        }else{
            return res.status(403).json({msg: "No tienes permiso para realizar esta acción"})
        }
    }
}

exports.clearRes = (data) => {
    const {password, __v, createdAt, updatedAt, ...cleanedData} = data;
    return cleanedData; 
}