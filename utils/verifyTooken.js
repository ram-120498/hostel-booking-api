import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js"

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"Please login first"));
    }

    jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err) return next(createError(403, "Invalid Token"));
        req.user = user;
        next()
    });
};

//verify user
export const verifyUser = (req, res, next)=>{
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
            } else {
            return next(createError(403, "You are not Authorized!"));
        }
    });
}; 

//verify admin
export const verifyAdmin = (req, res, next)=>{
    verifyToken(req, res, next, ()=>{
        if(req.user.isAdmin){
            next()
            } else {
            return next(createError(403, "You are not Authorized!"));
        }
    });
}; 