import express from "express";
import prismaDB from "@repo/db/client";
const app = express();

app.use(express.json())

const PORT = 3003

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        await prismaDB.$transaction(async (tx) => {
            const respBalUpdate = await tx.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            });

            console.log("Balance Update : " + JSON.stringify(respBalUpdate))
            
            const respOnRampUpdate = await tx.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })

            console.log("respOnRampUpdate Update : " + JSON.stringify(respOnRampUpdate))
        })

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

app.listen(PORT, () => console.log("Server Up and Running on https://localhost:"+PORT));