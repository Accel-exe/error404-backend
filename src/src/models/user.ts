import {PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

export const createUser = async (data: Prisma.UserCreateInput) => {
    const user = await prisma.user.create({
        data,
        select: {
            name: true,
            img: true,
        }
    })
    return user
}