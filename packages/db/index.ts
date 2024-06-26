import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma: ReturnType<typeof prismaClientSingleton> = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

export enum TransactionStatuses {
  FAILED = "Failed",
  SUCCESSFUL = "Successful",
  PENDING = "Pending"
}

export enum AmountFlow {
  CREDITED = "Credited",
  DEBITED = "Debited"
}