import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import dbConnect from './mongodb.js';
import authRoutes from './routes/auth.js';
import resumeRoutes from './routes/resumes.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const app = express();
app.set('trust proxy', 1); // Trust Render's load balancer for secure cookies
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Connect to Database
dbConnect().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});