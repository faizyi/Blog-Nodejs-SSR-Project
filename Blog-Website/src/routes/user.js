import { Router } from "express";
import User from "../models/user.js";
const router = Router();


router.get("/signup", (req, res)=>{
    res.render("signup")
})
router.get("/signin", (req, res)=>{
    res.render("signin")
})

router.post("/signup", async(req, res)=>{
    const {fullName, email, password} = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect("/signin")
})

router.post("/signin", async(req, res)=>{
    const {email, password} = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password, res)
        console.log(token)
        return res.cookie("token", token).redirect("/")
    } catch (error) {
        return res.render("signin",{
            error: "Invalid Email or Password"
        })
    }

})

router.get("/logout", (req, res)=>{
    res.clearCookie("token").redirect("/")
})

export default router;