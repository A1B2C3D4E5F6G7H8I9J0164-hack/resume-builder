import express from 'express';
import Resume from '../models/Resume.js';
import { verifyToken } from '../auth-helpers.js';
const router = express.Router();
// Middleware to authenticate
const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({ error: 'Not authenticated' });
    const decoded = verifyToken(token);
    if (!decoded)
        return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
};
// Get all resumes for user
router.get('/', auth, async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user.userId }).sort({ updatedAt: -1 });
        res.json({ resumes });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Create resume
router.post('/', auth, async (req, res) => {
    try {
        const resumeData = req.body;
        const resume = await Resume.create({
            ...resumeData,
            userId: req.user.userId,
        });
        res.status(201).json({ resume });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Get single resume
router.get('/:id', async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume)
            return res.status(404).json({ error: 'Resume not found' });
        res.json({ resume });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Update resume
router.put('/:id', auth, async (req, res) => {
    try {
        const resume = await Resume.findOneAndUpdate({ _id: req.params.id, userId: req.user.userId }, req.body, { new: true });
        if (!resume)
            return res.status(404).json({ error: 'Resume not found or unauthorized' });
        res.json({ resume });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Delete resume
router.delete('/:id', auth, async (req, res) => {
    try {
        const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
        if (!resume)
            return res.status(404).json({ error: 'Resume not found or unauthorized' });
        res.json({ message: 'Resume deleted' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default router;
