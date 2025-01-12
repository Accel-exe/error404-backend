import {PrismaClient, Prisma, User } from "@prisma/client"

const prisma = new PrismaClient()

export const createUser = async (data: Prisma.UserCreateInput): Promise<Omit<User, 'img' | 'password' | 'plataform'>> => {
    const user = await prisma.user.create({
        data,
        select: {
            id: true,
            role: true,
            name: true,
            email: true
        }
    })
    return user
}

export const updateUser = async (id:string, data:Prisma.UserUpdateInput): Promise<Pick<User, 'name' | 'img' | 'plataform'>> => {
    const user = await prisma.user.update({
        where: {id},
        data,
        select: {
            name: true,
            img: true,
            plataform :true
        }
    })
    return user
}

export const findUser = async (id:string): Promise<Omit<User, 'password'> | any> => {
    const user = await prisma.user.findUnique({
        where: {id},
        select: {
            id: true,
            role: true,
            name: true,
            img: true,
            email: true,
            plataform: true,
            password: false
        }
    })
    return user
}

export const listUsers = async (name:string): Promise<Array<Omit<User, 'password'>>> => {
    const user = await prisma.user.findMany({
        where: {
            name: {
                startsWith: name
            }
        },
        select: {
            id: true,
            role: true,
            name: true,
            img: true,
            email: true,
            plataform: true
        }
    })
    return user
}

export const deleteUser = async (id:string) :Promise<User> => {
    const user = await prisma.user.delete({where: {id}})
    return user
}