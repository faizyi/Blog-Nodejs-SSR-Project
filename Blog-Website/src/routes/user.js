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
    return res.redirect("/")
})

router.post("/signin", async(req, res)=>{
    const {email, password} = req.body;
    const user = await User.matchPassword(email, password)
    console.log(user);
    return res.redirect("/")

})

export default router;