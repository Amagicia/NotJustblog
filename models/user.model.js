import mongoose,{ Schema } from "mongoose";

const userSchema = new Schema({
    username: String,
    name: String,
    age: Number,
    email: String,
    posts:[
        { type:Schema.Types.ObjectId,ref:"Post"}
    ],
    password: String,
    phone: Number,
});

export const User = mongoose.model("User", userSchema);
