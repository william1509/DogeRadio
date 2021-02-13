import requests

url = 'http://127.0.0.1:5000/'
myobj = {'name': 'hello'}

x = requests.post(url, data = myobj)

print(x.text)