import { verifyToken } from "../utils/jwt.js";

export const checkForAuthCookie = (req, res, next)=>{
    try {
        const tokenCookie = req.cookies.token;
        if(!tokenCookie){
             return next()
        }
        const payload = verifyToken(tokenCookie);
        req.user = payload
        return next();
    } catch (error) {
        console.error("Authentication middleware error:", error.message);
        return res.status(500).send("Internal Server Error");
    }
}