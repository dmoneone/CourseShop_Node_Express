const {Router} = require('express')
const Course = require('../models/Course')
const Basket = require('../models/Basket')
const router = Router()

router.get('/', async (req, res) => {
    const card = await Basket.fetch()
    res.render('card', {
        title: 'Card',
        isCard: true,
        card
    })
})

router.post('/add', async (req, res) => {
    const course = await Course.getDataById(req.body.id)
    await Basket.add(course)
    res.redirect('/card')
})

router.delete('/remove/:id', async (req, res) => {
    id = req.params.id
    const card = await Basket.remove(id)
    res.status(200).json(card)
})

module.exports = router