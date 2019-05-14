const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');

const app = express();

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


app.use(express.static(path.join(__dirname,'..','public')));

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);



app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather Application',
        name: 'Ruan Huysen'
    });
})

app.get('/products', (req, res) => {
    console.log(req.query.search);
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search string."
        })
    }
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Ruan Huysen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpMessage: 'This is a useful help message.',
        name: 'Ruan Huysen'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search item.'
        })
    }

    let address = req.query.search;

    geocode(address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: data.location,
            });
        })
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: 'Help page not found',
        name: 'Ruan Huysen', 
        message: 'This is a help message'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ruan Huysen', 
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});