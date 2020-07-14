const {Router} = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const router = Router()

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        isLogin: true,
        title: 'Auth'
    })
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    const candidate = await User.findOne({ email })
    if(candidate) {
        let isOwner = await bcrypt.compare(password, candidate.password)
        if(isOwner) {
            const user = candidate
            req.session.user = user
            req.session.isAuth = true
            req.session.save(err => { //saveing of session
                if(err){
                    throw err
                }
                res.redirect('/')
            })
        } else {
            res.redirect('/auth/login')
        }
    } else {
        res.redirect('/auth/login')
    }
})

router.post('/reg', async (req, res) => {
    let {email, name, password, repeat} = req.body
    password = (password === repeat) ? password : undefined
    if (password) {
        const user = new User({
            email,
            name,
            password: await bcrypt.hash(password, 10),
            cart: {items: new Array()}
        })

        await user.save()
        res.redirect('/auth/login')
    } else {
        throw new Error('password er')
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => res.redirect('/auth/login'))
})

module.exports = router