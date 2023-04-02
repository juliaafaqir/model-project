const express = require('express')
const router = express.Router()

const {
    getModels,
    getModelById, 
    setModel,
    updateModel,
    deleteModel
} = require('../controllers/modelController')

router.route('/').get(getModels).post(setModel)
router.route('/:id').get(getModelById).put(updateModel).delete(deleteModel)

module.exports = router