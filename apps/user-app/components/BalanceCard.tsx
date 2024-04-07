import { Card } from "@repo/ui/card";

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    return <Card title={"Wallet Balance"}>
        <div className="flex justify-between pb-2 mt-4">
            <div>
                Unlocked balance
            </div>
            <div>
                {amount} INR
            </div>
        </div>
        <div className="flex justify-between py-2">
            <div>
                Total Locked Balance
            </div>
            <div>
                {locked} INR
            </div>
        </div>
        <div className="flex justify-between py-2">
            <div>
                Total Balance
            </div>
            <div>
                {(locked + amount)} INR
            </div>
        </div>
    </Card>
}