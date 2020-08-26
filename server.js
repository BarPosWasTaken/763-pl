const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();

require('dotenv').config();

mongoose.connect('mongodb://localhost/763-pl', {
    useNewUrlParser: true, useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Index file 🛠
app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render('index', { shortUrls: shortUrls })
});

app.post('/url', async (req, res) => {
    await ShortUrl.create({ url: req.body.fullUrl });
    res.redirect('/');
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