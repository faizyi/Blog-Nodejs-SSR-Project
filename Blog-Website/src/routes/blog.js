import { Router } from "express";
import multer from "multer";
import Blog from "../models/blog.js";
const router = Router();

// image
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        return cb(null, "./public/uploads")
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

router.post("/", upload.single("coverImageURL"), async (req, res)=>{
    const {title, description,} = req.body;
    const blog = await Blog.create({
        title,
        description,
        coverImageURL: `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`)
})

router.get("/blog/:id", async(req, res)=>{
    const blog = await Blog.findById(req.params.id)
    console.log(blog)
    return res.render("blog",{
        user: req.user,
        blog
    })
})

export default router;