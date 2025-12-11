import jwt from "jsonwebtoken";
/* ---------------------- Function for protected routes --------------------- */
const isloggedin = (req, res, next) => {
    // console.log(req.cookies.Token)
    try {
        const token = req.cookies.Token;
        // console.log(token);

        if (!token) {
            res.redirect('/login')
        }
        const decode = jwt.verify(token, "abcd");
        req.user = decode;
        console.log(decode);
        
        res.set("Cache-Control", "no-store");  
        next();
        
        // console.log("Res ", req.user);
    } catch (err) {
        // return res.redirect("/login");
        // res.redirect('login')

        return res.status(401).json({ message: "Invalid or expired token",Error:err });
    }
    
};

export { isloggedin };
