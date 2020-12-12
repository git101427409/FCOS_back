const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 90
    },
    phone: {
        type: String,
        required: true,
        max: 13
    },
    address: {
        type: String,
        required: true,
        max: 100
    }
})

RestaurantSchema
.virtual('url')
.get(function(){
    return `/api/restaurant/${this._id}`
})

module.exports = mongoose.model('Restaurant', RestaurantSchema)