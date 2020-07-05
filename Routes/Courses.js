const {Router} = require('express')
const Course = require('../models/Course')
const router = Router()

router.get('/', async (req, res) => {
    //let courses = await Courses.getAllData()
    let courses = await Course.find() //get all data if without params
    res.status(200)
    res.render('courses', {
        title: 'courses',
        isCourses: true,
        courses
    })
})

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id)
    res.render('course', {
        course,
        title: `Course ${course.title}`,
        layout: 'empty'
    })
})

router.get('/:id/edit', async (req, res) => {
    if(!req.query.allow){
        return res.redirect('/')
    }

    const course = await Course.findById(req.params.id)

    res.render('edit-course', {
        title: `Course ${course.title}`,
        course
    })
})

router.post('/edit', async (req, res) => {
    const {id} = req.body
    delete req.body.id
    await Course.findByIdAndUpdate(id, req.body)
    res.redirect('/courses')
})

router.post('/remove', async (req, res) => {
    const {id} = req.body
    await Course.deleteOne({
        _id: id
    })
    res.redirect('/courses')
})

module.exports = router