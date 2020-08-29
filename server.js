
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
var settings = readJSON(p_settings);
var menu = settings.menu;

// ENGINE
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(session({secret: "jsncnd29u3-8989niun-c3nc9uiwnc9-nciw9nciu-jw9ius"}));

// SITES
const sites = [
    'url',
    'urls',
    'short',
    'admin',
    'logout',
    'sett',
    'db'
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

// ADMIN PAGE
app.get('/admin', (req, res) => {
    req.session.logged = req.session.logged;
    if(req.session.logged != false && req.session.logged != true){
        req.session.logged = false;
    }
    //res.send(req.session.logged);
    if(req.session.logged == true)
        res.render('admin', { menu: menu, settings: settings});
    if(req.session.logged == false)
        res.render('login', { menu: menu, settings: settings});
    
});

// SETTINGS PAGE
app.get('/admin/settings', (req, res) => {
    req.session.logged = req.session.logged;
    if(req.session.logged != false && req.session.logged != true){
        req.session.logged = false;
    }
    //res.send(req.session.logged);
    if(req.session.logged == true)
        res.render('admin/settings', { menu: menu, settings: settings});
    if(req.session.logged == false)
        res.redirect('/admin');
});

// SETTINGS PAGE
app.get('/admin/db', async (req, res) => {
    req.session.logged = req.session.logged;
    if(req.session.logged != false && req.session.logged != true){
        req.session.logged = false;
    }

    const urls = await ShortUrl.find();

    //res.send(req.session.logged);
    if(req.session.logged == true)
        res.render('admin/db', { menu: menu, urls: urls, settings: settings});
    if(req.session.logged == false)
        res.redirect('/admin');
});

// LOGOUT
app.get('/logout', (req, res) => {
    if(req.session.logged = true)
        req.session.logged = false;
    res.redirect('/')
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

// LOGIN REQUEST
app.post('/log', async (req, res) => {
    const cred = req.body;

    if(settings.admin.login == cred.login && settings.admin.password == cred.password){
        req.session.logged = true;
        //res.send('logged');
    }else{
        req.session.logged = false;
        //res.send('nah');
    }

    res.redirect('/admin');
});

// UPDATE SETTINGS REQUEST
app.post('/sett', async (req, res) => {
    const sett = req.body;

    if(req.session.logged == true){

        settings.title = sett.title;
        settings.url = sett.url;
        settings.images.logo = sett.logo;
        settings.images.fzf = sett.fzf;
        settings.colors.main = sett.main;
        settings.colors.background = sett.background;
        
        //fs.rename(p_settings, './config/settings.json.bc')
        
        fs.writeFileSync(p_settings, JSON.stringify(settings, null, 2));
    }

    res.redirect('/admin/settings');
});

// UPDATE DATABASE REQUEST
app.get('/db/:rm', async (req, res) => {
    const id = req.params.rm;

    if(req.session.logged == true){

        var urls = await ShortUrl.find();
        urls = urls.reverse();

        console.log(urls[id].url, urls[id].short);
	
        ShortUrl.deleteOne({ short: urls[id].short }, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
        });
    }

    res.redirect('/admin/db');
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