import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";

const newpost = async (req, res, next) => {
    try {
        const { title, content,tags } = req.body;
        if (!title || !content) {
           return res.status(400).json({ message: "Title or content empty !" });
        }
        const userid = req.user.userId;

        const post = new Post({ title, content, user: userid });
        await User.findByIdAndUpdate(
            userid,
            { $push: { posts: post._id } }
        );
        

        const data = await post.save();
        res.redirect('/profile')
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
import { timeAgo } from "./auth.controller.js"; 
const explore = async (req, res, next) => {
    try {
        // const user = req.user.userId;
        let data = await Post.find().sort({ date: -1 });
        console.log(data.length);
        console.log(timeAgo(data[4].date));
        
        res.render('explore',{data,timeAgo});
        // res.status(200).json({ liked, likesCount: post.likes.length });
    } catch (err) {
        next(err);
    }
};
const create = async (req, res, next) => {
    try {        
        res.render('create');
        // res.status(200).json({ liked, likesCount: post.likes.length });
    } catch (err) {
        next(err);
    }
};


export { newpost ,likePost,explore,create};
