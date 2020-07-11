const {Router} = require('express')
const router = Router()
const Course = require('../models/Course')

router.get('/', (req, res) => {
    res.status(200)
    res.render('add', {
        title: 'add',
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    //const course = new Course(req.body.title, req.body.price, req.body.img)
    try {
        const course = new Course({
            title: req.body.title,
            price: req.body.price,
            img: req.body.img,
            userId: req.user
        })
        await course.save() //in database save
        res.redirect('/courses')
    } catch(e) {
        console.log(e)
    }
})

module.exports = router