import mongoose, { Schema } from "mongoose";
// import { User } from "./user.model.js";

const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: String,
    content: String,
    date: { type: Date, default: Date.now() },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tags: {
        type: [String], // Stores an array like ["Universe", "Star", "Nebula"]
        default: [],
    },
});

export const Post = mongoose.model("Post", postSchema);
