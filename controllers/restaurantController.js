const ResHandler = require('../models/ResHandler.js')
const ObjHandler = require('../models/objectHandler')
const Restaurant = require('../models/restaurant.js')

// 回傳餐廳列表
exports.restaurant_list = async (req, res) => {
    try {
        const docs = await Restaurant.find().select('-__v')
        if (docs) {
            res.json(ResHandler.success(docs))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'restaurant_list'))
    }
}
// 依據id回傳餐廳的完整資訊
exports.restaurant_detail = async (req, res) => {
    const { id } = req.params

    try {
        const doc = await Restaurant.findById(id)
        if (doc) {
            res.json(ResHandler.success(doc))
        } else {
            res.json(ResHandler.notFound({ id }))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'restaurant_detail'))
    }
}
// 由post操作 增加一筆餐廳資料
exports.restaurant_create = async (req, res) => {
    const { name, address, phone } = req.body

    const newRestaurant = new Restaurant({
        name,
        address,
        phone
    })
    // console.log(newRestaurant)
    try {
        const doc = await newRestaurant.save()
        if (doc) {
            res.json(ResHandler.success(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'restaurant_create'))
    }
}
// 由post操作 一次增加多筆餐廳資料
exports.restaurant_createMany = async (req, res) => {

    // 傳入的arr是JSON格式字串 要記得轉換
    // console.log('typeof:', typeof arr)
    // console.log('isArray:', Array.isArray(arr))
    const arr = JSON.parse(req.body.arr)
    let names = []
    let repeatNames = []
    let errs = []
    let filterArr = []

    // 先檢查必填以及名稱不重複
    arr.forEach(obj => {
        if (obj.name && obj.address && obj.phone) {
            let repeat = false
            for (const name of names) {
                if (obj.name === name) {
                    repeatNames.push(obj.name)
                    repeat = true
                    break;
                }
            }
            if(!repeat) {
                filterArr.push({
                    name: obj.name,
                    address: obj.address,
                    phone: obj.phone
                })
                names.push(obj.name)
            }
        }
    });
    // Do USE a reverse for-loop to delete element
    for (let idx = filterArr.length - 1; idx >= 0; idx -= 1) {
        const obj = filterArr[idx];
        try {
            const doc = await Restaurant.findOne({ name: obj.name})
            if(doc) {
                repeatNames.push(obj.name)
                delete filterArr.splice(idx, 1)
            }
        } catch (err) {
            errs.push(err)
        }
        
    }
    if (errs.length > 0) {
        res.json(ResHandler.error(errs, 'restaurant_createMany_nameRepeatError'))
    } else {

        // 寫入資料庫
        try {
            const docs = await Restaurant.insertMany(filterArr)
            if (docs) {
                res.json(ResHandler.insertManySuccess(docs, repeatNames))
            }
        } catch (err) {
            res.json(ResHandler.error(err, 'restaurant_createMany'))
        }
    }

}
// 由delete操作 刪除一筆餐廳資料
exports.restaurant_delete = async (req, res) => {
    const { id } = req.params

    try {
        const doc = await Restaurant.findByIdAndDelete(id)
        if (doc) {
            res.json(ResHandler.success(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'restaurant_delete'))
    }
}
// 由patch操作 修改一筆餐廳資料
exports.restaurant_update = async (req, res) => {
    const { id } = req.params
    const { name, address, phone } = req.body
    let newRestaurant = {
        name,
        address,
        phone
    }
    newRestaurant = ObjHandler.removeBlank(newRestaurant)
    try {
        const doc = await Restaurant.findByIdAndUpdate(id, newRestaurant, { new: true })
        if (doc) {
            res.json(ResHandler.success(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'restaurant_update'))
    }
}