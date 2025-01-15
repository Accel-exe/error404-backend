import { Request, Response, NextFunction } from "express"
import bcrypt from 'bcrypt'
import { createUserValidations, updateUserValidations } from "../validations/user.js"
import { Prisma, User, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createUserValidation = async (req:Request, res:Response, next:NextFunction): Promise<void | any> => {
    try {
        const yup = await createUserValidations.validate(req.body, {abortEarly: false})
        const user = await prisma.user.findMany({where: {email: req.body.email}})
        if (user[0]) {return res.status(200).json({'err': "ja existe um usuario com esse email: " + req.body.email})}
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashPassword

        next()
    }catch(err: any) {
        return res.status(200).json({"error": err.message})
    }
}

export const updateUserValidation = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
    await updateUserValidations.validate(req.body)
    next()
}