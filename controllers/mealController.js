const ResHandler = require('../models/ResHandler.js')
const ObjHandler = require('../models/objectHandler')
const Meal = require('../models/meal.js')

// get list
exports.meal_list = async(req, res) => {
    try {
        const docs = await Meal.find({}).
            select('-__v').
            populate({
                path: 'menuCategory_id',
                select: 'categoryName'
            })
        if(docs.length == 0) {
            res.json(ResHandler.notFound(docs))
        } else {
            res.json(ResHandler.success(docs))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'meal_list'))
    }
}
// get by id
exports.meal_detail = async(req, res) => {
    const { id } = req.params

    try {
        const doc = await Meal.findById(id)
        if(doc) {
            res.json(ResHandler.success(doc))
        } else {
            res.json(ResHandler.notFound(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'meal_detail'))
    }
}
exports.meal_findByMenuCategoryId = async(req, res) => {
    const { menuCategory_id } = req.params

    try {
        const docs = await Meal.find({ menuCategory_id }).select('-__v')
        if(docs) {
            res.json(ResHandler.success(docs))
        } else {
            res.json(ResHandler.notFound({ menuCategory_id }))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'meal_findByMenuCategoryId'))
    }
}
// post create
exports.meal_create = async(req, res) => {
    const { menuCategory_id, mealName, mealPrice } = req.body
    const newMeal = new Meal({
        menuCategory_id,
        mealName,
        mealPrice
    })
    try {
        const doc = await newMeal.save()
        res.json(ResHandler.success(doc))
    } catch (err) {
        res.json(ResHandler.error(err, 'meal_create'))
    }
}
// delete by id
exports.meal_delete = async(req, res) => {
    const { id } = req.params
    try {
        const doc = await Meal.findByIdAndDelete(id)
        if(doc) {
            res.json(ResHandler.success(doc))
        } else {
            res.json(ResHandler.notFound(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'meal_delete'))
    }
}
// patch by id
exports.meal_update = async(req, res) => {
    const { id } = req.params
    const { mealName, mealPrice } = req.body
    let updateMeal = {
        mealName,
        mealPrice
    }
    updateMeal = ObjHandler.removeBlank(updateMeal)
    try {
        const doc = await Meal.findByIdAndUpdate(id, updateMeal, { new: true })
        if(doc) {
            res.json(ResHandler.success(doc))
        } else {
            res.json(ResHandler.notFound(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'meal_update'))
    }
}