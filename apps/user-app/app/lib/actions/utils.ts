import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prismaDB, { AmountFlow } from "@repo/db/client";
import * as _ from "lodash"
import { AnyRecord } from "dns";

let session : any = null

export async function getBalance(id: number) {
    session = (_.isNil(session)) ? await getServerSession(authOptions) : session
    
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

export async function getP2pTransactions(userId: number | null) {
    if(_.isNil(userId)) {
        session = (_.isNil(session)) ? await getServerSession(authOptions) : session
        userId = session?.user?.id
    }
    
    if(!userId) return []

    const p2pTxnsDeb = await prismaDB.p2pTransfer.findMany({
        where: {
            fromUserId: Number(userId)
        }
    });

    const p2pTxnsCred = await prismaDB.p2pTransfer.findMany({
        where: {
            toUserId: Number(userId)
        }
    });
    // {"id":1,"amount":3000,"timestamp":"2024-04-09T06:54:16.708Z","fromUserId":2,"toUserId":1}
    const p2pTxns = [...
        p2pTxnsCred.map((credTrans) => {
            console.log("Cred : " + JSON.stringify(credTrans))

            return {
                isP2p: true,
                fromUserId: credTrans.fromUserId,
                time: credTrans.timestamp,
                amount: credTrans.amount,
                status: AmountFlow.CREDITED,
                credited: true,
                debited: false,
                provider: "NONE"
            }
        }), ...p2pTxnsDeb.map((debTrans) => {
            console.log("Deb : " + JSON.stringify(debTrans))
            return {
                isP2p: true,
                toUserId: debTrans.toUserId,
                time: debTrans.timestamp,
                amount: debTrans.amount,
                status: AmountFlow.DEBITED,
                credited: false,
                debited: true,
                provider: "NONE"
            }

        })]

    return p2pTxns
}


export async function getOnRampTransactions(userId: number | null) {
    if(_.isNil(userId)) {
        session = (_.isNil(session)) ? await getServerSession(authOptions) : session
        userId = session?.user?.id
    }
    
    if(!userId) return []

    const txns = await prismaDB.onRampTransaction.findMany({
        where: {
            userId: Number(userId)
        }
    });

    console.log("Wallet Trans : "+ JSON.stringify(txns));
    
    return txns.map(t => ({
        isWallet: true,
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}
