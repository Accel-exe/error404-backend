import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'

import routes from './src/routes/index.js';

import { scrapySkill } from './src/scrapy/epic_seven/epic7db.js';

const app = express()
const PORT = process.env.PORT || 9090

dotenv.config()
app.use(cors())
app.use(express.json())

scrapySkill()
routes(app)

app.listen(PORT, () => console.log("API Rodando na porta http://localhost:9090"))