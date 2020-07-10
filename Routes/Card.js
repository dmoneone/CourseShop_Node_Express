const {Router} = require('express')
const Course = require('../models/Course')
const router = Router()

const mapItems = (items) => {
    return items.map(c => ({
        title: c.courseId.title,
        count: c.count,
        id: c.courseId._id,
        price: c.courseId.price
    }))
}

function getTotalPrice(items) {
    return items.reduce((sum, current) => {
        return sum += current.price * current.count
    }, 0)
}

router.get('/', async (req, res) => {
    const user = await req.user
                    .populate('cart.items.courseId')
                    .execPopulate()

    const cart = mapItems(user.cart.items)
    cart.totalPrice = getTotalPrice(cart)

    res.render('card', {
        title: 'Card',
        isCard: true,
        cart
    })
})

router.post('/add', async (req, res) => {
    const course = await Course.findById(req.body.id)
    await req.user.addCourseToCart(course)
    res.redirect('/card')
})

router.delete('/remove/:id', async (req, res) => {
    /*id = req.params.id
    const card = await Basket.remove(id)
    res.status(200).json(card)*/
})

module.exports = router