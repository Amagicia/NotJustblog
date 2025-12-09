import express from "express";
import Visitor from "../models/visiter.model.js";
const router = express.Router();

/* --------------------------------------------------
   1) API: Save unique visitor
---------------------------------------------------*/
router.post("/track", async (req, res) => {
    try {
        const { deviceId } = req.body || {};

        if (!deviceId) {
            return res.status(400).json({ success: false, message: "deviceId missing" });
        }

        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

        let visitor = await Visitor.findOne({ deviceId });

        if (!visitor) {
            visitor = await Visitor.create({ deviceId, ip });
        }

        res.json({
            success: true,
            message: "Tracked successfully",
            visitor
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


/* --------------------------------------------------
   2) API: Get all unique visitors + total count
---------------------------------------------------*/
router.get("/", async (req, res) => {
    try {
        const visitors = await Visitor.find().sort({ createdAt: -1 });
        const total = visitors.length;

        res.json({
            success: true,
            total,
            visitors
        });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


export default router;
