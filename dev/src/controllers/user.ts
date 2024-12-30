import { Request, Response } from 'express'
import { createUserValidations, updateUserValidations } from '../validations/user.js'
import bcrypt from 'bcrypt'
import {createUser, updateUser, findUser, listUsers, deleteUser}  from '../models/user.js'

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        await createUserValidations.validate(req.body)
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashPassword
        const user = await createUser(req.body)
        res.status(200).send(user)
    }catch(erro) {
        res.status(400).send(erro)
    }
} 

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        await updateUserValidations.validate(req.body)
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