const ResHandler = require('../models/ResHandler.js')
const ObjHandler = require('../models/objectHandler')
const menuCategory = require('../models/menuCategory.js')

// get 回傳全部 菜單分類列表
exports.menuCategory_list = async (req, res) => {
    try {
        const docs = await menuCategory.find().
            select('-__v').
            populate({
                path: 'restaurant_id',
                select: 'name'
            })
        if (docs) {
            res.json(ResHandler.success(docs))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'menuCategory_list'))
    }
}
// get 依據id回傳 菜單分類的完整資訊
exports.menuCategory_detail = async (req, res) => {
    const { id } = req.params

    try {
        const doc = await menuCategory.findById(id)
        if (doc) {
            res.json(ResHandler.success(doc))
        } else {
            res.json(ResHandler.notFound({ id }))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'menuCategory_detail'))
    }
}
// get 依據restaurant_id回傳 菜單分類
exports.menuCategory_findByRestaurantId = async (req, res) => {
    const { restaurant_id } = req.params

    try {
        const docs = await menuCategory.find({ restaurant_id }).select('-__v')
        if(docs) {
            res.json(ResHandler.success(docs))
        } else {
            res.json(ResHandler.notFound({ restaurant_id }))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'menuCategory_findByRestaurantId'))
    }
}
// 由post操作 增加一筆 菜單分類
exports.menuCategory_create = async (req, res) => {
    const { restaurant_id, categoryName } = req.body

    const newMenuCategory = new menuCategory({
        restaurant_id,
        categoryName
    })
    try {
        const doc = await newMenuCategory.save()
        if (doc) {
            res.json(ResHandler.success(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'menuCategory_create'))
    }
}
// 由delete操作 刪除一筆 菜單分類
exports.menuCategory_delete = async (req, res) => {
    const { id } = req.params

    try {
        const doc = await menuCategory.findByIdAndDelete(id)
        if (doc) {
            res.json(ResHandler.success(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'menuCategory_delete'))
    }
}
// 由patch操作 修改一筆 菜單分類
exports.menuCategory_update = async (req, res) => {
    const { id } = req.params
    // 分類名稱
    const { categoryName } = req.body
    let newMenuCategory = {
        categoryName
    }
    newMenuCategory = ObjHandler.removeBlank(newMenuCategory)
    try {
        const doc = await menuCategory.findByIdAndUpdate(id, newMenuCategory, { new: true })
        if (doc) {
            res.json(ResHandler.success(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'menuCategory_update'))
    }
}