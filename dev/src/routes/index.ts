import {Application} from 'express'
import userRoutes from "./user.js";
import tokenRoutes from './token.js';

const routes = (app:Application) => {
    userRoutes(app)
    tokenRoutes(app)
}

export default routes