import express from "express";

import { isloggedin } from "../middleware/auth.middleware.js";
import { newpost ,likePost, create} from "../controller/post.controller.js";

const route = express.Router();

route.post("/",isloggedin,newpost);
route.post("/like/:postId", isloggedin, likePost);
route.get("/create", isloggedin, create);

export default route;
