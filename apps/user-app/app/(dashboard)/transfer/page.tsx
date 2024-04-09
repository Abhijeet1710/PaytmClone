import prismaDB, { AmountFlow, TransactionStatuses } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { SendMoney } from "../../../components/SendMoneyCard";
import { authOptions } from "../../lib/auth";
import * as _ from "lodash"
import { BalanceCard } from "../../../components/BalanceCard";
import { getBalance, getP2pTransactions } from "../../lib/actions/utils";
import { TransactionsCard } from "../../../components/TransactionsCard";


export default async function () {
    const session = await getServerSession(authOptions);

    const balance = await getBalance(session?.user?.id);
    const p2pTransactions = await getP2pTransactions(session?.user?.id)

    return <div className="w-screen">
        <div className="pl-4 text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer to friend
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <SendMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <TransactionsCard transactions={p2pTransactions} title="Personal Transactions"/>
                </div>
            </div>
        </div>
    </div>
}