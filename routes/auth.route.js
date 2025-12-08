import express from "express";
import {
    login,
    register,
    profile,
    loginR,
    logout,
} from "../controller/auth.controller.js";
import { isloggedin } from "../middleware/auth.middleware.js";
import { explore } from "../controller/post.controller.js";

const route = express.Router();

route.get("/", explore);
route.get("/login", loginR);
route.get("/profile", isloggedin, profile);
route.get("/logout", isloggedin, logout);

route.post("/register", register);
route.post("/login", login);


export default route;
