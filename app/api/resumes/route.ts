import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Resume from "@/lib/models/Resume";
import { getUser } from "@/lib/get-user";

export async function GET(req: Request) {
    try {
        const user = await getUser(req) as any;
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await dbConnect();
        const resumes = await Resume.find({ userId: user.userId }).sort({ updatedAt: -1 });
        return NextResponse.json({ resumes });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const user = await getUser(req) as any;
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await dbConnect();
        const data = await req.json();

        const resume = await Resume.create({
            ...data,
            userId: user.userId,
        });

        return NextResponse.json({ resume });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
