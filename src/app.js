const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')
//templates file name was inititally views which is inbuilt in express

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) //express will now consider templates same as views
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Harsh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Harsh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Harsh'
    })
})

app.get('/weather', (req, res) => {
    // .send to send back static json
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a valid address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error })
            } 
            res.send({
                Address: req.query.address,
                Location: location,
                weatherForecast: data 
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Harsh',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})