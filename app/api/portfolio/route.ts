import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getPricesWithCache } from "@/lib/helpers/prices";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error("JWT_SECRET saknas i .env");
}

const secret = new TextEncoder().encode(jwtSecret);

async function getUserIdFromToken(req: NextRequest) {
    // Läser JWT-token från HttpOnly-cookien.
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return null;
    }

    try {
        // Verifierar token och hämtar userId från payload.
        const { payload } = await jwtVerify(token, secret);

        if (typeof payload.userId !== "string") {
            return null;
        }

        return payload.userId;
    } catch {
        // Om token är ogiltig eller har gått ut returnerar vi null.
        return null;
    }
}

export async function GET(req: NextRequest) {
    try {
        // Kontrollerar att användaren är inloggad.
        const userId = await getUserIdFromToken(req);

        if (!userId) {
            return NextResponse.json(
                { error: "Du måste vara inloggad för att se portföljen." },
                { status: 401 }
            );
        }

        // Uppdaterar pris-cache om priset är gammalt eller saknas.
        await getPricesWithCache();

        // Hämtar användaren med saldo och alla innehav.
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                cashBalance: true,
                holdings: {
                    include: {
                        asset: {
                            include: {
                                priceCache: true,
                            },
                        },
                    },
                    orderBy: {
                        updatedAt: "desc",
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Användaren hittades inte." },
                { status: 404 }
            );
        }


    }
}