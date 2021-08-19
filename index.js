const express = require('express')// Connect express
const mongoose = require('mongoose')// Connect mongoose for mongodb
const exphbs = require('express-handlebars')// Connect handlebars for HTML
const todoRoutes = require('./routes/routes')//Connect Routes
const path = require('path')

const PORT = process.env.PORT || 3000 //PORT
const app = express();// create app by function express
const hbs = exphbs.create({ //Config handlebars
    defaultLayout: 'main', //Default layout
    extname: 'hbs' //Extension handlebars files
})

app.engine('hbs', hbs.engine)//Registration engine
app.set('view engine', 'hbs')//Registration in express view engine
app.set('views', 'views')//Registration in express dir with views files

app.use(express.urlencoded({extended: true}))

app.use(todoRoutes)//use routes
app.use(express.static(path.join(__dirname, 'public')))
async function start() {
    try {
        await mongoose.connect('mongodb://localhost:27017/CRUDMEN', { //Connect Database
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => { //Start server
            console.log('Server has been started...')
        })
    } catch (e) {
        console.log(e)// Console show error
    }
}

start()//Start app
