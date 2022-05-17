#
# >>> For test uploading
#

import requests
from pyotp import TOTP

# the api endpoint that you want tomake a request to
api_uri = ""  # http://localhost:3000 if ur testing

# needs to be same key as the one in your api
pass32 = 'K4ZVUQTSIRMDOWKRGU2WQQTZJM======'
key = TOTP(pass32).now()

with open(__file__, 'rb') as f:
    r = requests.post(api_uri,
                      headers={"Authorization": key}, data={"content": "yes"})
    r2 = requests.post(api_uri,
                       headers={"Authorization": key}, files={'upload_file': f})

print(r.text, r.status_code)
print(r2.text, r2.status_code)
