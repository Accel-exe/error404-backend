import {Application} from 'express'
import userRoutes from "./userRoutes.js";

const routes = (app:Application) => {
    userRoutes(app)
}

export default routes