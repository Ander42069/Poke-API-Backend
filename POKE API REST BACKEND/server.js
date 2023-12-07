require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

const pokemonsRouter = require('./routes/pokemons')
app.use('/pokemons', pokemonsRouter)

app.listen(3000, () => console.log('Server Started'))