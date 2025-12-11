import { timeAgo } from "./auth.controller.js";
import Counter from "../models/count.model.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";

const newpost = async (req, res, next) => {
    try {
        const { title, content, tags } = req.body;
        if (!title || !content) {
            return res
                .status(400)
                .json({ message: "Title or content empty !" });
        }
        const userid = req.user.userId;

        let tagArray = [];
        if (tags) {
            tagArray = tags
                .split(",") // Split "A, B, C" into ["A", " B", " C"]
                .map((tag) => tag.trim()) // Remove spaces: ["A", "B", "C"]
                .filter((tag) => tag !== ""); // Remove empty tags
        }
        const post = new Post({ title, content, user: userid ,tags: tagArray});
        await User.findByIdAndUpdate(userid, { $push: { posts: post._id } });

        const data = await post.save();
        res.redirect("/profile");
    } catch (error) {
        next(error);
    }
};

const updatapost = async (req, res, next) => {
    try {
        const postid = req.params.id;
        const { title, content } = req.body;
        await Post.findByIdAndUpdate(postid, { title, content }, { new: true });
        res.redirect("/profile");
    } catch (error) {
        next(error);
    }
};

const likePost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.userId;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        let liked;
        if (post.likes.includes(userId)) {
            // Unlike
            post.likes.pull(userId);
            liked = false;
        } else {
            // Like
            post.likes.push(userId);
            liked = true;
        }

        await post.save();
        res.status(200).json({ liked, likesCount: post.likes.length });
    } catch (err) {
        next(err);
    }
};

const explore = async (req, res, next) => {
    try {
        let counter = await Counter.findOne({ name: "totalVisits" });
        if (!counter) {
            counter = new Counter({ name: "totalVisits", count: 0 });
        }
        counter.count++;
        await counter.save();
        // const user = req.user.userId;
        let data = await Post.find().sort({ date: -1 }).populate("user");
        // console.log(data.length);
        // console.log(timeAgo(data[4].date));

        res.render("explore", { data, timeAgo, totalVisits: counter.count });
        // res.status(200).json({ liked, likesCount: post.likes.length });
    } catch (err) {
        next(err);
    }
};
const create = async (req, res, next) => {
    try {
        res.render("create");
        // res.status(200).json({ liked, likesCount: post.likes.length });
    } catch (err) {
        next(err);
    }
};

/* ----------------------------- delete the post ---------------------------- */
const postsdel = async (req, res) => {
    try {
        const postId = req.params.id;

        // Step 1: Delete the post
        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res
                .status(404)
                .json({ success: false, message: "Post not found" });
        }

        // Step 2: Remove post reference from user's array
        await User.findByIdAndUpdate(
            deletedPost.user, // Assuming your Post schema has "user: ObjectId"
            { $pull: { posts: postId } } // remove post from user's posts array
        );

        res.json({
            success: true,
            message: "Post deleted and removed from user posts",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
};

export { newpost, likePost, explore, updatapost, create, postsdel };
