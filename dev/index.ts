import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'

import { scrapyIcons } from './src/playwright/epic_seven/epic7db.js';
import routes from './src/routes/index.js';

const app = express()
const PORT = process.env.PORT || 9090

dotenv.config()
app.use(cors())
app.use(express.json())

scrapyIcons()
routes(app)

app.listen(PORT, () => console.log("API Rodando na porta http://localhost:9090"))