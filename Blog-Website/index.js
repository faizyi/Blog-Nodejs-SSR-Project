import express from "express";
import path from "path"
import { fileURLToPath } from "url";
import { configs } from "./src/config/index.js";
import userRoutes from "./src/routes/user.js"
import connectToDB from "./src/connection/index.js";

const app = express();
const PORT = 6001;

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirName, "public")))
app.set("view engine", "ejs");
app.set("views", path.join(__dirName, "src", "views"))

connectToDB();

app.get("/", (req, res)=>{
    res.render('home')
})
app.use("/user", userRoutes)


app.listen(PORT, ()=>{
    console.log(`Server on Port ${PORT}`)
})