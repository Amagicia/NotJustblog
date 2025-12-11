import express from "express";

import { isloggedin } from "../middleware/auth.middleware.js";
import { newpost ,likePost, updatapost,create} from "../controller/post.controller.js";
import { Post } from "../models/post.model.js";
const route = express.Router();

route.post("/",isloggedin,newpost);
route.post("/like/:postId", isloggedin, likePost);
route.get("/create", isloggedin, create);

// /update/69370c7a8585b8b948d51280
route.post("/update/:id", isloggedin, updatapost);


route.delete("/posts/:id", async (req, res) => {
    try {
        const postId = req.params.id;

        // Step 1: Delete the post
        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // Step 2: Remove post reference from user's array
        await User.findByIdAndUpdate(
            deletedPost.user,   // Assuming your Post schema has "user: ObjectId"
            { $pull: { posts: postId } } // remove post from user's posts array
        );

        res.json({ success: true, message: "Post deleted and removed from user posts" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});
export default route;
