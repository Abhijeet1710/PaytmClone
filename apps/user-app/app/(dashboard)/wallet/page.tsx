import prismaDB from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import * as _ from "lodash"
import { getBalance, getOnRampTransactions } from "../../lib/actions/utils";
import { TransactionsCard } from "../../../components/TransactionsCard";

export default async function() {
    const session = await getServerSession(authOptions);

    const balance = await getBalance(session?.user?.id);
    const transactions = await getOnRampTransactions();

    return <div className="w-screen">
        <div className="pl-4 text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Wallet
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <TransactionsCard transactions={transactions} title="Wallet Transactions" />
                </div>
            </div>
        </div>
    </div>
}