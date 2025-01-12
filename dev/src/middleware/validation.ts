import { Request, Response, NextFunction } from "express"
import bcrypt from 'bcrypt'
import { createUserValidations, updateUserValidations } from "../validations/user.js"

export const createUserValidation = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
    await createUserValidations.validate(req.body)
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    req.body.password = hashPassword

    next()
}

export const updateUserValidation = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
    await updateUserValidations.validate(req.body)
    next()
}