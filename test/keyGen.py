from base64 import b32encode
import pyperclip
import random

# max key length 
MAX_LENGTH = 10
# max key limit
MAX_LIMIT = 255
##############
key = ''
for _ in range(MAX_LENGTH):
    integer = random.randint(0, MAX_LIMIT)
    key += (chr(integer))

keyEncoded = b32encode(bytes(key, "utf-8")).decode()
print(f'\nYour key is: {keyEncoded}\nCopied key to clipboard!\n')
pyperclip.copy(keyEncoded)