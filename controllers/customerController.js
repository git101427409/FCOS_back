const ResHandler = require('../models/ResHandler.js')
const ObjHandler = require('../models/objectHandler')
const Customer = require('../models/customer.js')

// get list
exports.customer_list = async (req, res) => {
    try {
        const docs = await Customer.find({}).select('-__v')
        if(docs.length == 0) {
            res.json(ResHandler.notFound(docs))
        } else {
            res.json(ResHandler.success(docs))     
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'customer_list'))
    }
}
// get by id
exports.customer_detail = async (req, res) => {
    const { id } = req.params

    try {
        const doc = await Customer.findById(id)
        if(doc) {
            res.json(ResHandler.success(doc))
        } else {
            res.json(ResHandler.notFound(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'customer_detail'))
    }
}
// post create
exports.customer_create = async (req, res) => {
    const { name, phone } = req.body
    const newCustomer = new Customer({
        name,
        phone
    })
    try {
        const doc = await newCustomer.save()
        res.json(ResHandler.success(doc))
    } catch (err) {
        res.json(ResHandler.error(err, 'customer_create'))
    }
}
// delete by id
exports.customer_detele = async (req, res) => {
    const { id } = req.params

    try {
        const doc = await Customer.findByIdAndDelete(id)
        if(doc) {
            res.json(ResHandler.success(doc))
        } else {
            res.json(ResHandler.notFound(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'customer_delete'))
    }
}
// patch by id
exports.customer_update = async (req, res) => {
    const { id } = req.params
    const { name, phone } = req.body
    let newCustomer = {
        name,
        phone
    }
    newCustomer = ObjHandler.removeBlank(newCustomer)
    try {
        const doc = await Customer.findByIdAndUpdate(id, newCustomer, { new: true })
        if(doc) {
            res.json(ResHandler.success(doc))
        } else {
            res.json(ResHandler.notFound(doc))
        }
    } catch (err) {
        res.json(ResHandler.error(err, 'customer_update'))
    }
}
