import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    try {
        let { name, username, age, email, phone, password } = req.body;
        if (!username || !name || !age || !phone || !email || !password) {
            return res.status(400).send("All fields required");
          }
        const user = await User.findOne({ email });
        // console.log("User  => ", user);

        if (user) {
            res.status(400).json({ message: "User is Registered" });
            return; // Add this to prevent further execution
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = new User({
            name,
            username,
            age,
            email,
            phone,
            password: hashedPassword,
        });
        // console.log("Newuser =>",newuser);
        // newuser.password = hashedPassword;
        const data = await newuser.save();
        // console.log("data =>",data);

        /* ----------------------- Using JWT for Authrization ----------------------- */
        const token = jwt.sign({ email: data.email, userId: data._id }, "abcd");
        res.cookie("Token", token);

        res.redirect(`/profile`);
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        const user = await User.findOne({ email });
        console.log("User  => ", user);

        if (!user) {
            res.status(400).json({ message: "User is Not Registered" });
            return; // Add this to prevent further execution
        }

        const ismatch = bcrypt.compare(password, user.password);

        if (!ismatch) {
            return res.status(400).json({ message: "Incorrect Password" });
            // res.redirect("/login"); // Add this to prevent further execution
        }

        /* ----------------------- Using JWT for Authrization ----------------------- */
        const token = jwt.sign({ email: user.email, userId: user._id }, "abcd");
        res.cookie("Token", token);
        
        res.redirect(`/profile`);
    } catch (error) {
        next(error);
    }
};

const logout = (req, res ) => {
    res.clearCookie("Token");   // token = cookie name
    res.redirect("/login");
    // res.json({ message: "Logged out successfully" });

};

const updateProfile = async (req, res,next ) => {
    try {
        
        const userId = req.params.data;
        const {name, username, age, phone, email}=req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, username, age, phone, email },
            { new: true }
        );
        const token = jwt.sign(
            { userId: updatedUser._id, email: updatedUser.email },
            "abcd",
            { expiresIn: "7d" }
        );
        res.cookie("Token", token);
        // res.json({ success: true, user: updatedUser });
        res.redirect("/profile"); // or the route that shows the profile


    } catch (error) {
        next(error)
    }

};

const profile = async (req, res ) => {

    // console.log("UserID +>>>>>>>>> ",req.user.userId);
    const user = req.user.userId;
    let data = await User.findById(req.user.userId).populate('posts');
    // console.log(user.posts[0].title);
    
    res.render("profile", { data,timeAgo ,user});
};

const loginR = (req, res) => {
    return res.render("login"); // login.ejs page open hoga
};
const Rregister = (req, res) => {
    return res.render("index"); // login.ejs page open hoga
};




function timeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    const intervals = [
        { label: "y", seconds: 31536000 },
        { label: "mo", seconds: 2592000 },
        { label: "d", seconds: 86400 },
      { label: "h", seconds: 3600 },
      { label: "m", seconds: 60 },
      { label: "s", seconds: 1 }
    ];
    
    for (const i of intervals) {
        const count = Math.floor(seconds / i.seconds);
        if (count > 0) {
        return `${count}${i.label} ago`;
    }
}
return "just now";
}
  
export { register,login, profile, logout,loginR ,Rregister,timeAgo,updateProfile};