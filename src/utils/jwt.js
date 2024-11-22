import jwt from "jsonwebtoken"
import { configs } from "../config/index.js"

export const createToken= (user)=>{
    const payload={
        name: user.fullName,
        email: user.email,
        id: user._id,
        profile: user.profileImageURL,
        role: user.role
    }
    const token = jwt.sign(payload, configs.jwtKey);
    return token
}

export const verifyToken= (token)=>{
    if(!token) return null
    try {
        const payload = jwt.verify(token, configs.jwtKey);
        return payload
    } catch (error) {
        return null
    }
}