
// REQUIRE
const express = require('express');
const mongoose = require('mongoose');
const url = require('url'); 
var session = require('express-session');
var fs = require('fs');
const shortid = require('./js/id');
const ShortUrl = require('./models/shortUrl');
const app = express();

// FILES
const p_settings = './config/settings.json';

// LOAD .ENV
require('dotenv').config();
//

// SETUP MONGODB
mongoose.connect('mongodb://localhost/763-pl', {
    useNewUrlParser: true, useUnifiedTopology: true
});

// FUNCTIONS
function readJSON(path){
    var data = JSON.parse(fs.readFileSync(path));
    return data;
}

// READ FILES
const settings = readJSON(p_settings);
const menu = settings.menu;

// ENGINE
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(session({secret: "jsncnd29u3-8989niun-c3nc9uiwnc9-nciw9nciu-jw9ius"}));

// SITES
const sites = [
    'url',
    'urls',
    'short'
];

//////////////////
// WEB REQUESTS //
//////////////////

// INDEX 🛠
app.get('/', async (req, res) => {
    req.session.created = req.session.created;
    if(req.session.created === null){
        req.session.created = '';
    }
    var created = req.session.created;
    created = settings.url + created;
    if(created == settings.url || created == settings.url + 'undefined'){
        created = '';
    }
    const shortUrls = await ShortUrl.find();
    res.render('index', { shortUrls: shortUrls, created: created, menu: menu, settings: settings});
    req.session.created = '';
});

// LIST OF URLS
app.get('/urls', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render('urls', { shortUrls: shortUrls, menu: menu, settings: settings});
});

// ADD TO DB REQUEST
app.post('/url', async (req, res) => {
    var u = shortid.generate();
    var ok = false;
    sites.forEach(site => {
        if(site == u) u = shortid.generate;
    });
    const shortUrl = await ShortUrl.find();
    while(ok == true){
        shortUrl.forEach(url => {
            if(u == url) {
                u = shortid.generate;
                sites.forEach(s => {
                    if(s == u){
                        u = shortid.generate;
                    }
                });
            }
        });
    }

    await ShortUrl.create({ url: req.body.fullUrl, short: u });
    req.session.created = u;
    res.redirect('/');
});

// OPEN URL
app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if(shortUrl == null){
        res.render('404', { shortUrl: shortUrl, menu: menu, settings: settings});
        return;
    }

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.url);
});


// LISTEN PORT
app.listen(process.env.PORT || 5000);