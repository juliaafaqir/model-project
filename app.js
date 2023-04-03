const express = require("express");
const dotenv = require("dotenv").config();
const {errorHandler} = require('./middleware/errorHandler')
const {logger} = require('./middleware/logger')
const { PrismaClient } = require('@prisma/client');
const cookieParser = require("cookie-parser");
const prisma = new PrismaClient()
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;

connectDB()
const app = express()

app.use(logger)

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use('/api/models', require('./routes/modelRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/logs', require('./routes/loggerRoutes'))

app.use(errorHandler)

const listener = app.listen(process.env.PORT || 5000, () => {
    console.log("App listening on port " + listener.address().port);
  })
