const ResHandler = require('../models/ResHandler.js')
const Restaurant = require('../models/restaurant.js')
const MenuCategory = require('../models/menuCategory.js')
const Meal = require('../models/meal.js')


exports.restaurant = async (req, res) => {
    try {
        const restaurantArray = await Restaurant.find().select('-__v')
        // 拷貝一份出來才能添加屬性
        const restaurantData = JSON.parse(JSON.stringify(restaurantArray))
        for (const obj of restaurantData) {
            const restaurant_id = obj._id
            const menuCategoryArray = await MenuCategory.find({ restaurant_id }).select('-__v -restaurant_id')
            obj.menuCategory = JSON.parse(JSON.stringify(menuCategoryArray))
            
            for (const obj2 of obj.menuCategory) {
                const menuCategory_id = obj2._id
                obj2.meal = await Meal.find({ menuCategory_id }).select('-__v -menuCategory_id')
            }
        }

        if (restaurantData) {
            res.json(ResHandler.success(restaurantData))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'doc_restaurant'))
    }
}
exports.menu = async(req, res) => {
    const { restaurant_id } = req.params

    try {
        let menuCategoryArray = await MenuCategory.find({ restaurant_id }).select('-__v -restaurant_id')
        menuCategoryArray = JSON.parse(JSON.stringify(menuCategoryArray))

        for (const obj of menuCategoryArray) {
            const menuCategory_id = obj._id
            obj.meal = await Meal.find({ menuCategory_id }).select('-__v -menuCategory_id')
        }
        res.json(ResHandler.success(menuCategoryArray))
    } catch (err) {
        res.json(ResHandler.error(err, 'doc_menu'))
    }
}