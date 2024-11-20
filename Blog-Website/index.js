import express from "express";
import cookieParser from "cookie-parser"
import path from "path"
import multer from "multer";
import { fileURLToPath } from "url";
import { configs } from "./src/config/index.js";
import userRoutes from "./src/routes/user.js"
import blogRoutes from "./src/routes/blog.js"
import connectToDB from "./src/connection/index.js";
import { checkForAuthCookie } from "./src/middlewares/index.js";
import Blog from "./src/models/blog.js";

const app = express();
const PORT = 6001;

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(express.static(path.join(__dirName, "public")))
app.set("view engine", "ejs");
app.set("views", path.join(__dirName, "src", "views"))
app.use(checkForAuthCookie)

connectToDB();

app.get("/", async (req, res)=>{
    const Blogs = await Blog.find({});
    console.log(req.user)
    res.render('home',{
        user : req.user,
        allBlogs: Blogs
    })
})
app.use("/user", userRoutes)
app.use("/", blogRoutes)


app.listen(PORT, ()=>{
    console.log(`Server on Port ${PORT}`)
})