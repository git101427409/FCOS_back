const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReceiptDetailSchema = new Schema({
    orderReceipt_id: {
        type: Schema.Types.ObjectId,
        ref: 'OrderReceipt',
        required: true
    },
    meal_id: {
        type: Schema.Types.ObjectId,
        ref: 'Meal',
        required: true
    },
    mealAmount: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    }
})
ReceiptDetailSchema
.virtual('url')
.get(function() {
    return `/api/receiptDetail/${this._id}`
})

module.exports = mongoose.model('ReceiptDetail', ReceiptDetailSchema)