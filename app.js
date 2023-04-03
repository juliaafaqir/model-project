const express = require("express");
const dotenv = require("dotenv").config();
const {errorHandler} = require ('./middleware/errorHandler')
const { PrismaClient } = require('@prisma/client');
const cookieParser = require("cookie-parser");
const prisma = new PrismaClient()
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use('/api/models', require('./routes/modelRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));

