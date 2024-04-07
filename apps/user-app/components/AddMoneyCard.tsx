"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];


export async function creditMoneyIntoWallet(provider: string, amount: number, redirectUrl: string | undefined) {
    if (amount < 1000) {
        alert("Amount to credit into the wallet should be minimum 1000 INR.")
        return
    }

    const resp = await createOnRampTransaction(provider, amount)

    if (resp.statusCode == 200) {
        alert(resp.message)
        window.location.href = redirectUrl || "";
    } else {
        alert(resp.message)
    }
}

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0)
    return <Card title="Add Money to the Wallet">
        <div className="w-full mt-2">
            <TextInput inputType="number" label={"Amount"} placeholder={"Amount"} onChange={(val) => {
                setValue(Number(val))
            }} />
            <div className="py-4 text-left">
                Bank
            </div>
            <Select onSelect={(value) => {
                setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
            }} options={SUPPORTED_BANKS.map(x => ({
                key: x.name,
                value: x.name
            }))} />
            <div className="flex justify-center pt-4">
                <Button onClick={async () => {
                    await creditMoneyIntoWallet(provider, value, redirectUrl)
                }}> Add Money </Button>
            </div>
        </div>
    </Card>
}

