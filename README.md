![logo](https://i.imgur.com/DEZnz6h.png)
# 🍔 [763.pl](https://github.com/BarPosWasTaken/763-pl) 0.7.5 (Free URL Shortner)
> This is Source Code, if you want tu use [763.pl](https://github.com/BarPosWasTaken/763-pl) go here: [http://763.pl](http://763.pl)

---

## Requirements

1. Node.js v12.0.0 or newer
2. MongoDB running on `mongodb://localhost`

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
  "title": "763.pl",
  "url": "http://763.pl/",
  "images": {
    "logo": "https://i.imgur.com/DEZnz6h.png",
    "fzf": "https://i.imgur.com/zsYD2OB.png",
    "backarrow": "https://i.imgur.com/55OF6HE.png"
  },
  "colors": {
    "main": "#3498DB",
    "background": "#34495E"
  },
  "menu": [
    {
      "name": "Home",
      "url": "/",
      "target": ""
    },
    {
      "name": "Urls",
      "url": "/urls",
      "target": ""
    },
    {
      "name": "Admin Login",
      "url": "/admin",
      "target": ""
    },
    {
      "name": "Donate",
      "url": "http://763.pl/aft2aR9EP",
      "target": "_blank"
    }
  ],
  "admin": {
    "login": "admin",
    "password": "1234"
  }
}
```

---

## 📝 Features

> Note: Default port is `5000`

* /urls

`List of every short URL`

* Choose short url length.

`Change generated id length in .env`

* In-app settings menu.

`Go to /admin for login panel`

* Menage links.

`Go to /admin/db`

---

## 🤝 Contributing

   1. Read `LICENSE`

---

## 📝 Credits

[@BarPosWasTaken](https://github.com/BarPosWasTaken) 