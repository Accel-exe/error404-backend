import { Request, Response } from "express";

export const verify = (req: Request, res: Response): void => {
    try {
        res.status(200).json({'data': req.body})
    }catch(err) {
        console.log("Erro ao verificar o token err: " + err)
    }
}