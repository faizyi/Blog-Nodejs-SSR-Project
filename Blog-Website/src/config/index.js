import dotenv from "dotenv"
dotenv.config();

export const configs = {
    port : process.env.PORT,
    db: process.env.MONGO_URL,
    jwtKey: process.env.JWT_KEY
}