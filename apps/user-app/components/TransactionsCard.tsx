import { Card } from "@repo/ui/card"
import { AmountFlow, TransactionStatuses } from "@repo/db/client"
import { AmtCreditedIcon, AmtDebitedIcon } from "../app/(dashboard)/layout"


const getClassNameByTransactionStatus = (status: string) => {
    switch(status) {
        case TransactionStatuses.PENDING: 
            return "text-yellow-500"
        case TransactionStatuses.FAILED: 
            return "text-red-500"
        case TransactionStatuses.SUCCESSFUL: 
            return "text-green-500"
        case AmountFlow.CREDITED: 
            return "text-green-500"
        case AmountFlow.DEBITED: 
            return "text-green-500"
        default:
            return "text-red-500"
    }
}

export const TransactionsCard = ({
    transactions,
    title,
}: {
    transactions: any[],
    title: string
}) => {
    if (!transactions.length) {
        return <Card title={title}>
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }

    // console.log("All Trans"+ JSON.stringify(transactions));
    
    return <Card title={title}>
        <div className="pt-2">
            {transactions.map(t => <div key={t.time.toDateString()} className="flex justify-between mt-4 pb-4 border-b">
                <div>
                    <div className="text-sm">
                        Status: <span className={getClassNameByTransactionStatus(t.status)}> {t.status} </span>
                        {t.isP2p &&  <span>{t.credited ? `From : User Id: 0${t.fromUserId}` : `To User Id: 0${t.toUserId}`}</span>}
                        {t.isWallet &&  <span>{`From : ${t.provider}`}</span>}
                    </div>
                    <div className="text-slate-600 text-xs">
                    {t.time.toDateString()}, {t.time.toLocaleTimeString()}
                    </div>
                </div>
                <div className="flex justify-center">
                    <span className="mr-2"> {t.credited ? "+" : "-"} INR {t.amount}</span>
                    <span className={getClassNameByTransactionStatus(t.status)}>
                        {t.isP2p ? t.credited ? <AmtCreditedIcon/> : <AmtDebitedIcon/> : <AmtCreditedIcon />}
                    </span>
                </div>

            </div>)}
        </div>
    </Card>
}