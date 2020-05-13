const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

//Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlebars engine and views,partials location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req,res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Toyin Hawau'
    })
})
app.get('/about', (req,res) => {
    res.render('about', {
        title:'About me',
        message: "I'm funny",
        name: ' Hawau'
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        title:'help me',
        message: 'Need an archor, want no anchor',
        name: 'Toyin '
    })
})
app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Location value must be provided'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude,location} = {} ) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude,longitude, (error, Data)=>{
            if (error) {
               return  res.send({ error })
            } 
            res.send(
                {
                    Address: req.query.address,
                    location,
                    Forecast: Data
                }
            )
        })
    })
    
})
app.get('/help/*', (req,res)=>{
    res.render('404',{
        message:'Help article not found',
        title:'ERROR 404'
    })
})
app.get('*', (req,res)=>{
    res.render('404',{
        message:'Page not found',
        title:'ERROR 404'
    })
})
app.listen(port, ()=>{
    console.log('Server running on port' +port);
    
})