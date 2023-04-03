const express = require('express')
const router = express.Router()
const {getLogs} = require ('../controllers/loggerController')
const {protect} = require ('../middleware/authMiddleware')

router.route('/').get(protect, getLogs)

module.exports = router