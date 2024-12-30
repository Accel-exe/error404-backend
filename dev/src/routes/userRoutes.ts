import {Application} from 'express'
import { create, update, find, list, del } from "../controllers/user.js"

const userRoutes = (app:Application) => {
    app.post('/user', create)
    app.put('/user/:id', update)
    app.get('/user/:id', find)
    app.get('/users', list)
    app.delete('/user/:id', del)
}

export default userRoutes