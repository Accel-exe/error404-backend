import { Prisma, PrismaClient, User } from "@prisma/client"
const prisma = new PrismaClient()

export const verifyEmail = async (email: string): Promise<any> => {
    const verify = await prisma.user.findUnique({
        where: {email},
        select: {
            email: true
        }
    })
    return verify
}