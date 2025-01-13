import { Request, Response } from 'express'
import {createUser, findUser}  from '../models/user.js'
import { createToken } from '../services/token.js'

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await createUser(req.body)
        const token = createToken(user)
        res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'none'})
        res.status(200).json({'user': user})
    }catch(erro) {
        res.status(400).json({"error": erro})
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await findUser(req.body.id)
        const token = createToken(user)
        res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'none'})
        res.status(200).json({'user': user})
    }catch(erro) {
        res.status(400).json({'error': erro})
    }
}

export const get = async(req: Request, res: Response): Promise<void> => {
    try {
        const user = await findUser(req.body.id)
        res.status(200).json({'user': user})
    }catch(err) {
        res.status(400).json({'error': err})
    }
}