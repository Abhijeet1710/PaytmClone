"use server";

import prismaDB, { TransactionStatuses } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";


export async function createOnRampTransaction(provider: string, amount: number) {
    // Ideally the token should come from the banking provider (hdfc/axis)
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            statusCode: 401,
            message: "Unauthenticated request"
        }
    }
    const token = (Math.random() * 1000).toString();

    await prismaDB.onRampTransaction.create({
        data: {
            provider,
            status: TransactionStatuses.PENDING,
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount
        }
    });

    return {
        statusCode: 200,
        message: "Transaction in Pending Status"
    }
}
