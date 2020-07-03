const {Router} = require('express')
const Courses = require('../models/Course')
const Course = require('../models/Course')
const router = Router()

router.get('/', async (req, res) => {
    let courses = await Courses.getAllData()
    courses = JSON.parse(courses)
    res.status(200)
    res.render('courses', {
        title: 'courses',
        isCourses: true,
        courses
    })
})

router.get('/:id', async (req, res) => {
    const course = await Course.getDataById(req.params.id)
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

    const course = await Course.getDataById(req.params.id)

    res.render('edit-course', {
        title: `Course ${course.title}`,
        course
    })
})

router.post('/edit', async (req, res) => {
    await Courses.update(req.body)
    res.redirect('/courses')
})

module.exports = router