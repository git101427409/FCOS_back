const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MenuCategorySchema = new Schema({
    restaurant_id: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    categoryName: {
        type: String,
        required: true,
        max: 60
    }
})
MenuCategorySchema
.virtual('url')
.get(function () {
    return `/api/menuCategory/${this._id}`
})

module.exports = mongoose.model('MenuCategory', MenuCategorySchema)