const express = require('express')
const router = express.Router()
const {protect} = require ('../middleware/authMiddleware')

const {
    getModels,
    getModelById, 
    setModel,
    updateModel,
    deleteModel
} = require('../controllers/modelController')

router.route('/').get(protect, getModels).post(protect, setModel)
router.route('/:id').get(protect, getModelById).put(protect, updateModel).delete(protect, deleteModel)

module.exports = router