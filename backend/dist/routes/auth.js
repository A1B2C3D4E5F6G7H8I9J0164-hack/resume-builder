import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken, verifyToken } from '../auth-helpers.js';
const router = express.Router();
// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing fields' });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = signToken({ userId: user._id });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: '/',
        });
        res.json({
            message: 'User registered successfully',
            user: { id: user._id, name: user.name, email: user.email },
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: error.message });
    }
});
// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Missing fields' });
        }
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = signToken({ userId: user._id });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: '/',
        });
        res.json({
            message: 'Logged in successfully',
            user: { id: user._id, name: user.name, email: user.email },
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Me (Get current user)
router.get('/me', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.status(401).json({ error: 'Not authenticated' });
        const decoded = verifyToken(token);
        if (!decoded || !decoded.userId)
            return res.status(401).json({ error: 'Invalid token' });
        const user = await User.findById(decoded.userId).select('-password');
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json({ user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Logout
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});
export default router;
