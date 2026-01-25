import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    personalInfo: {
        fullName: String,
        email: String,
        phone: String,
        address: String,
        summary: String,
        role: String,
    },
    experience: [{
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        description: String,
    }],
    education: [{
        school: String,
        degree: String,
        startDate: String,
        endDate: String,
        description: String,
    }],
    skills: [String],
    projects: [{
        name: String,
        description: String,
        link: String,
    }],
    templateId: {
        type: String,
        default: 'template1',
    },
    themeColor: {
        type: String,
        default: '#3b82f6', 
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
