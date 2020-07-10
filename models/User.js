const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true
                }
            }
        ]
    }
})

userSchema.methods.addCourseToCart = function(course) {
    const clonedItems = [...this.cart.items]
    const ind = clonedItems.findIndex((item => {
        return item.courseId.toString() === course._id.toString()
    }))

    if(ind >= 0) {
        clonedItems[ind].count++
    } else {
        clonedItems.push({
            count: 1,
            courseId: course._id
        })
    }

    this.cart = {items: clonedItems}
    return this.save()
}

userSchema.methods.removeItemFromCart = function(id) {
    let clonedItems = [...this.cart.items]
    let ind = clonedItems.findIndex(c => c.courseId.toString() === id.toString())

    if(clonedItems[ind].count === 1) {
        clonedItems = clonedItems.filter(c => c.courseId.toString() !== id.toString())
    } else {
        clonedItems[ind].count--
    }

    this.cart = {items: clonedItems}
    return this.save()
}

module.exports = model('User', userSchema)