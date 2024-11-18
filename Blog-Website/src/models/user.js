import {createHmac, randomBytes} from "crypto"
import { Schema, model } from "mongoose";
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageURL:{
        type: String,
        default: "/userImage/User-avatar.svg.png"
    },
    role:{
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
    
},{timestamps: true});


userSchema.pre("save", function(next){
    try {
        const user = this;
        console.log(user)
        if(!user.isModified("password")) return;
        const salt = randomBytes(16).toString();
        const hash = createHmac("sha256", salt).update(user.password).digest("hex");
        this.salt = salt;
        this.password = hash;
        next();
    } catch (error) {
        console.log(error)
    }

})

userSchema.static("matchPassword", async function(email, password){
    try {
        const user = await this.findOne({email});
        if(!user) console.log("Invalid Something")
        const salt = user.salt;
        const hashPassword = user.password;
        const userPassword = createHmac("sha256", salt).update(password).digest("hex");
        if(hashPassword !== userPassword) console.log("Invalid Something")
        return {...user._doc, password: undefined, salt: undefined}
    } catch (error) {
        console.log(error)
    }
})

const User = model("users", userSchema);
export default User;