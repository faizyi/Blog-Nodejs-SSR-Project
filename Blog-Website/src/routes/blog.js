import { Router } from "express";
import multer from "multer";
import path from "path"
import Blog from "../models/blog.js";
const router = Router();

// image
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        return cb(null, path.resolve("./public/uploads"))
    },
    filename: (req, file, cb)=>{
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9);
        console.log(uniqueName)
        return cb(null, `${uniqueName}-${file.originalname}`)
    }
})

const upload = multer({storage: storage});



router.get("/addblog", (req, res)=>{
    res.render("addBlog",{
        user: req.user
    })
})

router.post("/", upload.single("coverImageURL"), (req, res)=>{
    const {title, description, coverImageURL} = req.body
    console.log(req.body)
    console.log(req.file)
    return res.redirect("/")
})

export default router;