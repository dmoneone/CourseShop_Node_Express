const {Router} = require('express')
const Course = require('../models/Course')
const User = require('../models/User')
const router = Router()

router.get('/', async (req, res) => {
    res.json({test: 5})
    /*const card = await Basket.fetch()
    res.render('card', {
        title: 'Card',
        isCard: true,
        card
    })*/
})

router.post('/add', async (req, res) => {
    const course = await Course.findById(req.body.id)
    console.log(req.user)
    await req.user.addCourseToCart(course)
    res.redirect('/card')
})

router.delete('/remove/:id', async (req, res) => {
    /*id = req.params.id
    const card = await Basket.remove(id)
    res.status(200).json(card)*/
})

module.exports = router