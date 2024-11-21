import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    content:{
        type: String,
        required: true
    },
    blogId:{
        type: Schema.Types.ObjectId,
        ref: "blogs"
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "users"
    }
},{timestamps: true});


const Comment = model("comments", commentSchema);
export default Comment;