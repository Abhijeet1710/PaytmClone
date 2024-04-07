import express from "express";
import prismaDB from "@repo/db/client";
import { TransactionStatuses } from "@repo/db/client";
import * as _ from "lodash"

const app = express();

app.use(express.json())

const PORT = 3003

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string;
        error: string[]
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount,
        error: req.body.error
    };
    try {
        if (!_.isNil(paymentInformation.error)) {

            const respOnRampUpdate = await prismaDB.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: TransactionStatuses.FAILED,
                }
            })

            res.status(200).json({
                statusCode: 200,
                message: `Captured As ${TransactionStatuses.FAILED}`
            })
            return
        }


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
                    status: TransactionStatuses.SUCCESSFUL,
                }
            })

            console.log("respOnRampUpdate Update : " + JSON.stringify(respOnRampUpdate))
        })

        res.status(200).json({
            statusCode: 200,
            message: `Captured as ${TransactionStatuses.SUCCESSFUL}`
        })
    } catch (e) {
        console.error(e);
        res.status(411).json({
            statusCode: 411,
            message: `Captured as ${TransactionStatuses.PENDING}`,
            error: "Error while processing webhook"
        })
    }
})

app.listen(PORT, () => console.log("Server Up and Running on https://localhost:" + PORT));