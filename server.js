require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

require('./routes/auth.routes')(app)
require('./routes/country.routes')(app)

const PORT = process.env.PORT || 8000
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`)
  
})
