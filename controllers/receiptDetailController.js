const ResHandler = require('../models/ResHandler.js')
const ObjHandler = require('../models/objectHandler')
const ReceiptDetail = require('../models/receiptDetail.js')

// get list
exports.receiptDetail_list = async (req, res) => {
    try {
        const docs = await ReceiptDetail.find({}).
            select('-__v').
            populate({
            path: 'orderReceipt_id',
            select: 'date totalPrice'
            })
            .populate({
                path: 'meal_id',
                select: 'mealName mealPrice'
            })
        if (docs.length == 0) {
            res.json(ResHandler.notFound(docs))
        } else {
            res.json(ResHandler.success(docs))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'receiptDetail_list'))
    }
}
// get by id
exports.receiptDetail_detail = async (req, res) => {
    const { id } = req.params

    try {
        const doc = await ReceiptDetail.findById(id).
            select('-__v').
            populate({
                path: 'orderReceipt_id',
                select: 'date totalPrice'
            })
            .populate({
                path: 'meal_id',
                select: 'mealName mealPrice'
            })
        if (doc) {
            res.json(ResHandler.success(doc))
        } else {
            res.json(ResHandler.notFound(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'receiptDetail_detail'))
    }
}
// post create
exports.receiptDetail_create = async (req, res) => {
    const { orderReceipt_id, meal_id, mealAmount } = req.body
    const newReceiptDetail = new ReceiptDetail({
        orderReceipt_id,
        meal_id,
        mealAmount
    })
    try {
        const doc = await newReceiptDetail.save()
        res.json(ResHandler.success(doc))
    } catch (err) {
        res.json(ResHandler.error(err, 'receiptDetail_create'))
    }
}
// delete by id
exports.receiptDetail_delete = async (req, res) => {
    const { id } = req.params
    try {
        const doc = await ReceiptDetail.findByIdAndDelete(id)
        if (doc) {
            res.json(ResHandler.success(doc))
        } else {
            res.json(ResHandler.notFound(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'receiptDetail_delete'))
    }
}
// patch by id (update mealAmount)
exports.receiptDetail_update = async (req, res) => {
    const { id } = req.params
    const { mealAmount } = req.body
    let updateReceiptDetail = {
        mealAmount
    }
    updateReceiptDetail = ObjHandler.removeBlank(updateReceiptDetail)
    try {
        const doc = await ReceiptDetail.findByIdAndUpdate(id, updateReceiptDetail, { new: true })
        if (doc) {
            res.json(ResHandler.success(doc))
        } else {
            res.json(ResHandler.notFound(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'receiptDetail_update'))
    }
}