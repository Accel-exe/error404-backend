import { Application } from "express";
import { checkToken } from "../middleware/autenticate.js";
import { verify } from "../controllers/token.js";

const tokenRoutes = (app: Application) => {
    app.get('/token/verify', checkToken, verify)
}

export default tokenRoutes