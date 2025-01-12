import { Request, Response } from 'express'
import {createUser, updateUser, findUser, listUsers, deleteUser}  from '../models/user.js'
import { createToken } from '../services/token.js'

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await createUser(req.body)
        const token = createToken(user)
        res.status(200).json({'token': token})
    }catch(erro) {
        res.status(400).send(erro)
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await findUser(req.body.id)
        const token = createToken(user)
        res.status(200).json({'token': token})
    }catch(erro) {
        res.status(400).send(erro)
    }
}

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await updateUser(req.params.id, req.body)
        res.status(200).send(user)
    }catch(erro) {
        res.status(400).send(erro)
    }
}

export const find = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await findUser(req.params.id)
        res.status(200).send(user)
    }catch(erro) {
        res.status(400).send(erro)
    }
}

export const list = async (req: Request, res: Response): Promise<void> => {
    try {
        const name = typeof req.query.name === 'string' ? req.query.name : ''
        const user = await listUsers(name)
        res.status(200).send(user)
        }catch(erro) {
        res.status(400).send(erro)
    }
}

export const del = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await deleteUser(req.params.id)
        res.status(200).send(user)
    }catch(erro) {
        res.status(400).send(erro)
    }
}