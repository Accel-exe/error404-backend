import { Prisma, PrismaClient, User } from "@prisma/client"
import { Response, Request, NextFunction } from "express"
import { createToken, verifyToken } from "../services/token.js"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const checkToken = (req: Request, res: Response, next: NextFunction): void | any => {
    const token: any = req.cookies.token
    if(!token) {return res.status(200).json({"err": "Token Inexistente"})}
    const verify = verifyToken(token)
    req.body = verify
    next()
}

export const loginToken = async (req:Request, res:Response, next:NextFunction): Promise<any | void> => {
    const verifyEmail = await prisma.user.findUnique({
        where: {email: req.body.email},
        select: {
            id: true,
            password: true
        }
    })
    if(!verifyEmail) {return res.status(200).json({"err": "Email Inexistente"})}
    const verifyPassword = await bcrypt.compare(req.body.password, verifyEmail.password)
    if (!verifyPassword) {return res.status(200).json({"err": "Password Incorreto}"})}
    req.body = {'id': verifyEmail.id}
    next()
}