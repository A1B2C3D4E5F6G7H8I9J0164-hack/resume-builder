import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Resume from "@/lib/models/Resume";

export async function GET() {
    try {
        await dbConnect();
        
        const resumes = await Resume.find({ isPublic: true })
            .populate('userId', 'name')
            .sort({ createdAt: -1 });
        return NextResponse.json({ resumes });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
