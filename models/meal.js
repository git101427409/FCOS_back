const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MealSchema = new Schema({
    menuCategory_id: {
        type: Schema.Types.ObjectId,
        ref: 'MenuCategory',
        required: true
    },
    mealName: {
        type: String,
        required: true,
        max: 60
    },
    mealPrice: {
        type: Number,
        required: true
    }
})
MealSchema
.virtual('url')
.get(function() {
    return `/api/meal/${this._id}`
})

module.exports = mongoose.model('Meal', MealSchema)