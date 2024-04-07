import { AddMoney } from "../../../components/AddMoneyCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { SendCard } from "../../../components/SendCard";
import { SendMoney } from "../../../components/SendMoneyCard";

export default function() {
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
                    <OnRampTransactions transactions={[]} />
                </div>
            </div>
        </div>
</div>
}