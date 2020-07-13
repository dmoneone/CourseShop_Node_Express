const {Router} = require('express')
const auth = require('../middlewares/auth')
const Order = require('../models/Order')
const router = Router()

router.get('/', auth, async (req, res) => {
    const orders = await Order.find({
       'user.userId': req.user._id
    }).populate('user.userId').populate('courses.course')
    orders[0].courses.forEach((item) => console.log(item))
    console.log(orders)

    console.log(orders.map(order => ({
        ...order._doc,
        totalPrice: order.courses.reduce((sum, current) => {
            return sum += current.course.price * current.count
        }, 0)
    }))  )
    res.status(200)
    res.render('orders', {
        title: 'orders',
        isOrder: true,
        orders: orders.map(order => ({
            ...order._doc,
            totalPrice: order.courses.reduce((sum, current) => {
                return sum += current.course.price * current.count
            }, 0)
        }))   
    })
})

router.post('/', auth, async (req, res) => {
    try{
        const user = req.user
        const courses = await user.populate('cart.items.courseId').execPopulate()

        let order = new Order({
            user: {
                name: user.name,
                userId: user._id
            },
            courses: courses.cart.items.map(item => ({
                course: item.courseId,
                count: item.count
            }))
        })

        await order.save()
        await user.clearCart()

        res.status(200)
        res.redirect('/orders')
    } catch(e) {
        throw e
    }
})

module.exports = router