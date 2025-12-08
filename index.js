
import app from "./app.js";
import { connectDB } from "./config/db.js";

connectDB(); // DB Connect

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
