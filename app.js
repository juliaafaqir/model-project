const express = require("express");
const dotenv = require("dotenv").config();
const {errorHandler} = require ('./middleware/errorMiddleware')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json())

app.listen(port, () => console.log(`Server started on port ${port}`));

