import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchCoinPriceHistory } from "@/lib/services/coingecko-history";

const allowedDays = [1, 7, 30, 365];

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;

        const searchParams = req.nextUrl.searchParams;
        const daysParam = searchParams.get("days") ?? "7";
        const days = Number(daysParam);

        if (!allowedDays.includes(days)) {
            return NextResponse.json(
                {
                    error: "Ogiltig period. Använd 1, 7, 30 eller 365 dagar.",
                },
                { status: 400 }
            );
        }

        const asset = await prisma.asset.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                symbol: true,
                coingeckoId: true,
                isActive: true,
            },
        });

        if (!asset || !asset.isActive) {
            return NextResponse.json(
                { error: "Kryptovalutan hittades inte." },
                { status: 404 }
            );
        }


    }