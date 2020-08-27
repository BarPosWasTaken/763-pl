const express = require('express');
const mongoose = require('mongoose');
const url = require('url'); 
var session = require('express-session');
const shortid = require('shortid');
const ShortUrl = require('./models/shortUrl');
const app = express();

require('dotenv').config();

mongoose.connect('mongodb://localhost/763-pl', {
    useNewUrlParser: true, useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(session({secret: "jsncnd29u3-8989niun-c3nc9uiwnc9-nciw9nciu-jw9ius"}));

// Index file 🛠
app.get('/', async (req, res) => {
    req.session.created = req.session.created;
    if(req.session.created === null){
        req.session.created = '';
    }
    const created = req.session.created;
    const shortUrls = await ShortUrl.find();
    res.render('index', { shortUrls: shortUrls, created: created })
    req.session.created = '';
});

app.post('/url', async (req, res) => {
    var u = shortid.generate();
    await ShortUrl.create({ url: req.body.fullUrl, short: u });
    req.session.created = u;
    res.redirect('/');
});

app.get('/urls', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render('urls', { shortUrls: shortUrls })
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if(shortUrl == null){
        res.render('404', { shortUrl: shortUrl });
        return;
    }

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.url);
});

app.listen(process.env.PORT || 5000);