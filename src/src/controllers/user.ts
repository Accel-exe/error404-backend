import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import {createUser}  from '../models/user.js'

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashPassword
        const user = await createUser(req.body)
        res.status(200).send(user)
    }catch(erro) {
        res.status(400).send(erro)
    }
} 