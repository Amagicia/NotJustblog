import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/db.js"; // db connect here
connectDB()
    .then((res) => {
        app.listen(process.env.PORT || 5000, () => {
            console.log("Server running on", process.env.PORT);
        });
    })
    .catch((err) => {
        console.log("error AA gya bhai ", err);
    });



//     git add . 
// git commit -m "Fix DB connection and server setup"
//  git push origin main


// <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=<%= post.user.username %>&backgroundColor=transparent" 
// loading="lazy" 
// alt="Cartoon Avatar"
// onload="this.classList.remove('opacity-0')"
// class="w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:scale-110">
