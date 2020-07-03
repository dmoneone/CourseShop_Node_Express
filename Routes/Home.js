const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.status(200)
    //res.sendFile(path.join(__dirname, 'views', 'index.html'))
    res.render('index', {
        title: 'main',
        isHome: true,
    })
})

module.exports = router