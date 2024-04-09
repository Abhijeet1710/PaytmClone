import { TransactionsCard } from "../../../components/TransactionsCard";
import { getOnRampTransactions, getP2pTransactions } from "../../lib/actions/utils"

export default async function () {
    const p2pTrans = await getP2pTransactions(null)
    const walletTrans = await getOnRampTransactions(null)

    const allTrans = p2pTrans.concat(walletTrans)

    console.log("All Trans : " + JSON.stringify(allTrans));


    return <div className="w-screen">
        <div className="pl-4 text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            History
        </div>
        <div className="mt-4 md:mt-8 mx-4 md:mx-10 w-vx">
            <TransactionsCard transactions={allTrans} title="All Recent Transactions"/>
        </div>
    </div>
}