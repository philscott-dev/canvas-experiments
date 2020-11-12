import requests

def double(n):
    return n * 2

try:
    res = requests.get('https://cat-fact.herokuapp.com/facts')
    array = [1, 2, 3, 4, 9]
    results = map(lambda n: n * 2, array)
    print(res.text)

except requests.exceptions.HTTPError as err:
    raise SystemExit(err)
