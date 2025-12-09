import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
    deviceId: { type: String, unique: true },
    ip: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Visitor", visitorSchema);
