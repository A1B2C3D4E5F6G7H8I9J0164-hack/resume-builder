import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signToken, verifyToken } from "../auth-helpers.js";
const router = express.Router();
const COOKIE_NAME = "token";
// ✅ Cookie options for cross-site auth (Vercel + Render)
const cookieOptions = {
    httpOnly: true,
    secure: true, // ✅ must be true on Vercel/Render
    sameSite: "none", // ✅ must be none for cross-site
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: "/",
};
// Register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing fields" });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = signToken({ userId: user._id });
        res.cookie(COOKIE_NAME, token, cookieOptions);
        return res.json({
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email },
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ error: error.message });
    }
});
// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Missing fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = signToken({ userId: user._id });
        res.cookie(COOKIE_NAME, token, cookieOptions);
        return res.json({
            message: "Logged in successfully",
            user: { id: user._id, name: user.name, email: user.email },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: error.message });
    }
});
// Me (Get current user)
router.get("/me", async (req, res) => {
    try {
        const token = req.cookies?.[COOKIE_NAME];
        if (!token) {
            return res.status(401).json({ error: "Not authenticated" });
        }
        const decoded = verifyToken(token);
        if (!decoded?.userId) {
            return res.status(401).json({ error: "Invalid token" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json({ user });
    }
    catch (error) {
        console.error("Me error:", error);
        return res.status(500).json({ error: error.message });
    }
});
// Logout
router.post("/logout", (req, res) => {
    res.clearCookie(COOKIE_NAME, {
        path: "/",
        sameSite: "none",
        secure: true,
    });
    return res.json({ message: "Logged out successfully" });
});
export default router;
