import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await db.query.courses.findMany();

    return NextResponse.json(data);
}