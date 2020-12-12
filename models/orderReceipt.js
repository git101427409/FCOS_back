const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderReceiptSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    totalPrice: {
        type: Number,
        default: 0,
        min: 0
    }
})
OrderReceiptSchema
.virtual('url')
.get(function(){
    return `/api/orderReceipt/${this._id}`
})

module.exports = mongoose.model('OrderReceipt', OrderReceiptSchema)