const {Router} = require('express')
const User = require('../models/User')
const router = Router()

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        isLogin: true,
        title: 'Auth'
    })
})

router.post('/login', async (req, res) => {
    const user = await User.findById('5f04b73ab64a632f407beca2')
    req.session.user = user
    req.session.isAuth = true
    req.session.save(err => { //saveing of session
        if(err){
            throw err
        }
        res.redirect('/')
    })
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => res.redirect('/auth/login'))
})

module.exports = router