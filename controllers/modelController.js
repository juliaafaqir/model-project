const asyncHandler = require('express-async-handler')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// @desc Get models
// @routes GET /api/models
//@access Private
const getModels = asyncHandler(async (req, res) => {
    const models = await prisma.model.findMany()
    
    res.status(200).json(models)
})

// @desc Get model by ID
// @routes GET /api/models/:id
//@access Private
const getModelById = asyncHandler(async (req, res) => {
    const model = await prisma.model.findUnique({
        where: { id: parseInt(req.params.id)}
      })

        if (!model) {
        res.status(400)
        throw new Error('Model not found')
    }
    
    res.status(200).json(model)
})

// @desc Set models
// @routes SET /api/models
//@access Private
const setModel = asyncHandler(async (req, res) => {
        if(!req.body.name) {
            res.status(400)
            throw new Error('Please add a model name')
        } 
        
        const model = await prisma.model.create({
            data :{ 
                name : req.body.name}
            })

        res.status(201).json(model)
})

// @desc Update models
// @routes UPDATE /api/models/:id
//@access Private
const updateModel = asyncHandler(async (req, res) => { 
    if(!req.body.name) {
        res.status(400)
        throw new Error('Please add a model name')
    } 
    const model = await prisma.model.findUnique({
        where: { id: parseInt(req.params.id)}
      }) 

    if (!model) {
        res.status(400)
        throw new Error('Model not found')
    }

    const updatedModel = await prisma.model.update({
        where: { id: parseInt(req.params.id)},
        data: {name:req.body.name}
      })
        res.status(201).json(updatedModel)

})

// @desc Delete goals
// @routes DELETE /api/goals/:id
//@access Private
const deleteModel = asyncHandler(async (req, res) => {
    const model = await prisma.model.findUnique({
        where: { id: parseInt(req.params.id)}
      })  

    if (!model) {
        res.status(400)
        throw new Error('Model not found')
    }

    const deletedGoal = await prisma.model.delete({
        where: { id: parseInt(req.params.id),},
      })
        res.status(200).json({ id: req.params.id})
})

module.exports = {
    getModels,
    getModelById, 
    setModel,
    updateModel,
    deleteModel
}