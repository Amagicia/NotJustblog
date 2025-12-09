// Import Express
import express, { json } from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
import cookieParser from "cookie-parser";
import Counter from "./models/count.model.js";


// Middleware
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs"); // Replace 'ejs' with your preferred engine

/* --------------------------------- Routes --------------------------------- */
import auth from "./routes/auth.route.js";
import newpost from "./routes/post.route.js"
app.use("/",auth)
app.use("/newpost",newpost)

app.get("/api/total-visits", async (req, res) => {
    const counter = await Counter.findOne({ name: "totalVisits" });
    res.json({ count: counter ? counter.count : 0 });
});


app.use((err, req, res, next) => {
    res.status(400).json({
        success: false,
        error: err.message
    });
});

export default app;
