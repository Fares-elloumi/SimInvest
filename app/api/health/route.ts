import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const userCount = await prisma.user.count();

        return NextResponse.json({
            status: "ok",
            database: "connected",
            userCount,
        });
    } catch (error) {
        console.error("Database health check failed:", error);

        return NextResponse.json(
            {
                status: "error",
                database: "not connected",
            },
            { status: 500 }
        );
    }
}