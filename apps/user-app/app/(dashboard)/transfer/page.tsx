import prismaDB from "@repo/db/client";
import { getServerSession } from "next-auth";
import { SendMoney } from "../../../components/SendMoneyCard";
import { authOptions } from "../../lib/auth";
import * as _ from "lodash"
import { OnRampTransactions } from "../../../components/OnRampTransactions";

async function getP2pTransactions() {
    const session = await getServerSession(authOptions);
    if(_.isNil(session)) return []
    
    const p2pTxnsDeb = await prismaDB.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });

    const p2pTxnsCred = await prismaDB.p2pTransfer.findMany({
        where: {
            toUserId: Number(session?.user?.id)
        }
    });

    const p2pTxns = p2pTxnsCred.concat(p2pTxnsDeb)

    return p2pTxns.map((t: any) => {
        console.log("P@P TXNS "+JSON.stringify(t));
    })
}

export default async function() {
    const p2pTransactions = await getP2pTransactions()
    return <div className="w-screen">
    <div className="pl-4 text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer to friend
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <SendMoney />
            </div>
            <div>
                <div className="pt-4">
                    {/* <OnRampTransactions transactions={p2pTransactions} /> */}
                </div>
            </div>
        </div>
</div>
}