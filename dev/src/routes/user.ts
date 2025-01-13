import {Application} from 'express'
import { create, login, get } from "../controllers/user.js"
import { createUserValidation, updateUserValidation } from '../middleware/validation.js'
import { loginToken, checkToken } from '../middleware/autenticate.js'

const userRoutes = (app:Application) => {
    app.post('/user', createUserValidation, create)
    app.post('/user/login', loginToken, login)
    app.get('/user', checkToken, get)
}

export default userRoutes