import express from 'express';
import { generateResumeContent } from '../ai-service.js';
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
router.post('/generate', auth, async (req, res) => {
    try {
        const { prompt, type } = req.body;
        if (!prompt)
            return res.status(400).json({ error: 'Prompt is required' });
        const content = await generateResumeContent({ prompt, type });
        res.json({ content });
    }
    catch (error) {
        console.error('AI Generation error:', error);
        res.status(500).json({ error: error.message });
    }
});
export default router;
