const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 60
    },
    phone: {
        type: String,
        required: true,
        max: 12
    }
})
CustomerSchema
.virtual('url')
.get(function() {
    return `/api/customer/${this._id}`
})

module.exports = mongoose.model('Customer', CustomerSchema)