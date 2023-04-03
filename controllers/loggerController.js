const asyncHandler = require('express-async-handler')
const {errorHandler} = require('../middleware/errorHandler')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const Log = require('../models/loggerModel')

// @desc Log HTTP requests 
// @routes GET /api/logs
//@access Private
const getLogs = asyncHandler(async (req, res, next) => {
    
    const current_datetime = new Date();
    const formatted_date =
      current_datetime.getFullYear() +
      "-" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getDate() +
      " " +
      current_datetime.getHours() +
      ":" +
      current_datetime.getMinutes()
      const method = req.method;
      const url = req.url;
      const status = res.statusCode;
      const ipAddress = req.socket.remoteAddress;
      const log = `[${formatted_date}] ${method}:${url} ${status} ${ipAddress}`;
    console.log(log);
    const addLogs = await Log.create({
        logs: log
    })

    let {page, size} = req.query
    if (!page){
        page= 1;
    }  
    if (!size) {
        size= 10;
    }  
    const limit = parseInt(size)
    const skip = (page-1) * size

    const getLogs = await Log.find().limit(limit).skip(skip)
    res.status(200).json(getLogs);
    next();
  })

module.exports = {
    getLogs, 
}