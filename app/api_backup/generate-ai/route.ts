import { NextResponse } from "next/server";
import { generateResumeContent } from "@/lib/ai-service";
import { getUser } from "@/lib/get-user";

export async function POST(req: Request) {
    try {
        const user = await getUser(req);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        const result = await generateResumeContent(data);

        return NextResponse.json({ result });
    } catch (error: any) {
        console.error("AI Generation Route Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
