import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    coverImageURL:{
        type: String,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "users"
    }
},{timestamps: true});


const Blog = model("blogs", blogSchema);
export default Blog;