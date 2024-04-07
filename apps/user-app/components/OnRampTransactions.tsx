import { Card } from "@repo/ui/card"
import { TransactionStatuses } from "@repo/db/client"
import { AmtCreditedIcon, AmtDebitedIcon } from "../app/(dashboard)/layout"


const getClassNameByTransactionStatus = (status: string) => {
    switch(status) {
        case TransactionStatuses.PENDING: 
            return "text-yellow-500"
        case TransactionStatuses.FAILED: 
            return "text-red-500"
        case TransactionStatuses.SUCCESSFUL: 
            return "text-green-500"
    }
}

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }

    console.log("All Trans"+ JSON.stringify(transactions));
    
    return <Card title="Recent Wallet Transactions">
        <div className="pt-2">
            {transactions.map(t => <div key={t.time.toDateString()} className="flex justify-between mt-4">
                <div>
                    <div className="text-sm">
                        Status: <span className={getClassNameByTransactionStatus(t.status)}> {t.status} </span>
                    </div>
                    <div className="text-slate-600 text-xs">
                    {t.time.toDateString()}, {t.time.toLocaleTimeString()}
                    </div>
                </div>
                <div className="flex justify-center">
                    <span className="mr-2">+ Rs {t.amount}</span>
                    <span className={getClassNameByTransactionStatus(t.status)}>{<AmtCreditedIcon/>}</span>
                </div>

            </div>)}
        </div>
    </Card>
}