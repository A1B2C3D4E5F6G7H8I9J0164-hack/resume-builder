import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Resume from "@/lib/models/Resume";
import { getUser } from "@/lib/get-user";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await dbConnect();
        const resume = await Resume.findById(id);
        if (!resume) return NextResponse.json({ error: "Resume not found" }, { status: 404 });
        return NextResponse.json({ resume });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const user = await getUser(req) as any;
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await dbConnect();
        const resume = await Resume.findOneAndDelete({ _id: id, userId: user.userId });
        if (!resume) return NextResponse.json({ error: "Resume not found or unauthorized" }, { status: 404 });

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
