import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prismaDB = new PrismaClient()

async function main() {
  const alice = await prismaDB.user.upsert({
    where: { number: '1111111111' },
    update: {},
    create: {
      number: '1111111111',
      password: await bcrypt.hash('alice', 10),
      name: 'alice',
      email: 'alice@gmail.com',
      Balance: {
        create: {
            amount: 20000,
            locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token__1",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await prismaDB.user.upsert({
    where: { number: '2222222222' },
    update: {},
    create: {
      number: '2222222222',
      password: await bcrypt.hash('bob', 10),
      name: 'bob',
      email: 'bob@gmail.com',
      Balance: {
        create: {
            amount: 2000,
            locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "token__2",
          provider: "HDFC Bank",
        },
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prismaDB.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prismaDB.$disconnect()
    process.exit(1)
  })