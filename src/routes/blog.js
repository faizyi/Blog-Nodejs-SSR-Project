import { Router } from "express";
import multer from "multer";
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
import { checkAuthorization } from "../middlewares/index.js";
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



router.get("/addblog", checkAuthorization, (req, res)=>{
    res.render("addBlog",{
        user: req.user
    })
})

router.post("/", checkAuthorization, upload.single("coverImageURL"), async (req, res)=>{
    const {title, description,} = req.body;
    const blog = await Blog.create({
        title,
        description,
        coverImageURL: `/uploads/${req.file.filename}`,
        createdBy: req.user.id
    })
    return res.redirect(`/blog/${blog._id}`)
})

router.get("/blog/:id", async(req, res)=>{
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    const comments = await Comment.find({blogId:req.params.id }).populate("createdBy")
    return res.render("blog",{
        user: req.user,
        blog,
        comments
    })
})

router.post("/blog/comment/:id", async(req, res)=>{
    const {content} = req.body;
    await Comment.create({
        content,
        blogId: req.params.id,
        createdBy: req.user.id
    })
    return res.redirect(`/blog/${req.params.id}`)
})



export default router;