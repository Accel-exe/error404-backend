import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'


import routes from './src/routes/index.js';

const app = express()
const PORT = process.env.PORT || 9090

dotenv.config()
app.use(cors({origin: 'http://localhost:3000', methods: ['GET', 'POST', 'PUT', 'DELETE'] ,credentials: true}))
app.use(express.json())
app.use(cookieParser())

routes(app)

app.listen(PORT, () => console.log("API Rodando na porta http://localhost:9090"))