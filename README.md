![logo](https://i.imgur.com/sXnY54H.png)
# 🍔 [763.pl](https://github.com/BarPosWasTaken/763-pl) 0.6.5 (Free URL Shortner)
> This is Source Code, if you want tu use [763.pl](https://github.com/BarPosWasTaken/763-pl) go here: [http://763.pl](http://763.pl)

---

## Requirements

1. Node.js v12.0.0 or newer

---

## 🚀 Getting Started

```
git clone https://github.com/BarPosWasTaken/763-pl.git
cd 763-pl
npm i
```

After installation finishes you can use `npm run start` to start the bot.

---

## ⚙️ Configuration

Copy or Rename `.env.example` to `.env` and fill out the values:

⚠️ **Note: If you are hosting this on linux remember that port 80 is reserverd for root user** ⚠️

```
PORT=[PORT GOES HERE | DEFAULT 5000]
ID_LENGTH=[SHORT ID LENGTH | DEFAULT 5]
```

Open `config/settings.json` and change the chosen values:

```json
{
    "title": "[TITLE example: 763.pl]",
    "url": "[URL example: http://762.pl/ <- slash at the end is required!]",
    "images": {
        "logo": "[SITE LOGO example: https://i.imgur.com/DEZnz6h.png]",
        "fzf": "[404 IMAGE example: https://i.imgur.com/zsYD2OB.png]",
        "backarrow": "[BACK-ARROW example: https://i.imgur.com/55OF6HE.png]"
    },
    "colors":{
        "main":"[MAIN COLOR recommended bright color]",
        "background":"[BACKGROUND COLOR recommended dark color]"
    },
    "menu":[
        {"name":"Home", "url":"/", "target":""},
        {"name":"Urls", "url":"/urls", "target":""},
        {"name":"Donate", "url":"http://763.pl/aft2aR9EP", "target":"_blank"}
    ]
}
```

---

## 📝 Features

> Note: Default port is `5000`

* /urls

`List of every short URL`

* Choose short url length.

`Change generated id leangth in .env`

---

## 🤝 Contributing

   1. Read `LICENSE`

---

## 📝 Credits

[@BarPosWasTaken](https://github.com/BarPosWasTaken) 