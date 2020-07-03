const express = require('express')
const path = require('path')
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose')

const homeRoute = require('./Routes/Home')
const coursesRoute = require('./Routes/Courses')
const addRoute = require('./Routes/Add')
const cardRoute = require('./Routes/Card')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine) //reg of engine
app.set('view engine', 'hbs') // using
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public'))) //for linking css files from 'public' dir in the root of proj | static dir | for client's scripts
app.use(express.urlencoded({extended: true})) //middleware for getting post data | body parser
//routers
app.use('/', homeRoute)
app.use('/courses', coursesRoute)
app.use('/add', addRoute)
app.use('/card', cardRoute)
//qhDwY2Baknf3ESbP
const mongoUrl = 'mongodb+srv://dmoneone:qhDwY2Baknf3ESbP@cluster0.k9fla.mongodb.net/<dbname>?retryWrites=true&w=majority'

/*app.get('/', (req, res) => {
    res.status(200)
    //res.sendFile(path.join(__dirname, 'views', 'index.html'))
    res.render('index', {
        title: 'main',
        isHome: true
    })
})

app.get('/courses', (req, res) => {
    res.status(200)
    res.render('courses', {
        title: 'courses',
        isCourses: true
    })
})

app.get('/add', (req, res) => {
    res.status(200)
    res.render('add', {
        title: 'add',
        idAdd: true
    })
})*/


const port = process.env.port || 3000

const start = async (port) => {
    try { 
        const mongoUrl = 'mongodb+srv://dmoneone:qhDwY2Baknf3ESbP@cluster0.k9fla.mongodb.net/shop'
        await mongoose.connect(mongoUrl, {useNewUrlParser: true})

        app.listen(port, () => {
            console.log(`Server has been launched. Port: ${port}`)
        })
    } catch(e) {
        throw e
    }
}

start(port)