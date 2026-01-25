import express from 'express';
import { generateResumeContent } from '../ai-service.js';
import { verifyToken } from '../auth-helpers.js';
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/express.js';

const router = express.Router();

// Middleware to authenticate
const auth = (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ error: 'Invalid token' });

    req.user = decoded;
    next();
};

router.post('/generate', auth, async (req: any, res: Response) => {
    try {
        const { prompt, type } = req.body;
        if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

        const content = await generateResumeContent({ prompt, type });
        res.json({ content });
    } catch (error: any) {
        console.error('AI Generation error:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
