import express from "express";

import { isloggedin } from "../middleware/auth.middleware.js";
import { newpost ,likePost, updatapost,create,postsdel} from "../controller/post.controller.js";
const route = express.Router();

route.post("/",isloggedin,newpost);
route.post("/like/:postId", isloggedin, likePost);
route.get("/create", isloggedin, create);

// /update/69370c7a8585b8b948d51280
route.post("/update/:id", isloggedin, updatapost);

route.delete("/posts/:id", postsdel);
export default route;
