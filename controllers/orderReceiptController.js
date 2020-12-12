const ResHandler = require('../models/ResHandler')
const ObjHandler = require('../models/objectHandler')
const OrderReceipt = require('../models/orderReceipt')

// get list
exports.orderReceipt_list = async(req, res) => {
    try {
        const docs = await OrderReceipt.find({}).
            select('-__v').
            populate({
                path: 'customer_id',
                select: 'name'
            })
        if(docs.length == 0) {
            res.json(ResHandler.notFound(docs))
        } else {
            res.json(ResHandler.success(docs))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'orderReceipt_list'))
    }
}
// get by id
exports.orderReceipt_detail = async (req, res) => {
    const { id } = req.params

    try {
        const doc = await OrderReceipt.findById(id).
            select('-__v').
            populate({
                path: 'customer_id',
                select: 'name'
            })
        if (doc) {
            res.json(ResHandler.success(doc))
        } else {
            res.json(ResHandler.notFound(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'orderReceipt_detail'))
    }
}
// post create
exports.orderReceipt_create = async (req, res) => {
    const { customer_id, date } = req.body
    const newOrderReceipt = new OrderReceipt({
        customer_id,
        date
    })
    try {
        const doc = await newOrderReceipt.save()
        res.json(ResHandler.success(doc))
    } catch (err) {
        res.json(ResHandler.error(err, 'orderReceipt_create'))
    }
}
// delete by id
exports.orderReceipt_delete = async (req, res) => {
    const { id } = req.params
    try {
        const doc = await OrderReceipt.findByIdAndDelete(id)
        if (doc) {
            res.json(ResHandler.success(doc))
        } else {
            res.json(ResHandler.notFound(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'orderReceipt_delete'))
    }
}
// patch by id (update totalPrice)
exports.orderReceipt_update = async (req, res) => {
    const { id } = req.params
    const { totalPrice } = req.body
    let updateOrderReceipt = {
        totalPrice
    }
    updateOrderReceipt = ObjHandler.removeBlank(updateOrderReceipt)
    try {
        const doc = await OrderReceipt.findByIdAndUpdate(id, updateOrderReceipt, { new: true })
        if (doc) {
            res.json(ResHandler.success(doc))
        } else {
            res.json(ResHandler.notFound(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'orderReceipt_update'))
    }
}