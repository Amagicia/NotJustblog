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
