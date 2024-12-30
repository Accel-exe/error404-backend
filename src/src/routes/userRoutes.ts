import {Application} from 'express'
import { create } from "../controllers/user.js"

const userRoutes = (app:Application) => {
    app.post('/user', create)
}

export default userRoutes