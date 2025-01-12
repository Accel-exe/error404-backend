import {Application} from 'express'
import { create,login, update, find, list, del } from "../controllers/user.js"
import { createUserValidation, updateUserValidation } from '../middleware/validation.js'
import { loginToken } from '../middleware/autenticate.js'

const userRoutes = (app:Application) => {
    app.post('/user', createUserValidation, create)
    app.get('/user/login', loginToken, login)
    app.put('/user', updateUserValidation, update)
    app.get('/user', find)
    app.get('/users', list)
    app.delete('/user/:id', del)
}

export default userRoutes