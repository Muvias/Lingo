import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";

export async function GET() {
    if (!isAdmin()) throw new NextResponse("Unauthorized", { status: 401 });

    const data = await db.query.challengeOptions.findMany();

    return NextResponse.json(data);
}

export async function POST(req: Request) {
    if (!isAdmin()) throw new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();

    const data = await db.insert(challengeOptions).values({
        ...body
    }).returning();

    return NextResponse.json(data[0]);
}