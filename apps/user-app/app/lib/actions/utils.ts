import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prismaDB from "@repo/db/client";
import * as _ from "lodash"

export async function getBalance(id: number) {
    const session = await getServerSession(authOptions);
    if(_.isNil(session)) return { amount: 0, locked: 0 }

    const balance = await prismaDB.balance.findFirst({
        where: {
            userId: Number(id)
        }
    });

    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}