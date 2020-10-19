# canvas-experiments

### Packages to look into
- https://www.npmjs.com/package/safe-regex
- https://github.com/davisjam/vuln-regex-detector
- https://github.com/Microsoft/monaco-editor/blob/master/CONTRIBUTING.md#a-brief-explanation-on-the-source-code-structure
- https://firecracker-microvm.github.io/



//python 
import requests

def double(n):
    return n * 2;

try:
    res = requests.get('https://cat-fact.herokuapp.com/facts');
    array = [1, 2, 3 ,4, 9];
    results = map(double, array);
    print(res.text)

except requests.exceptions.HTTPError as err:
    raise SystemExit(err);


# print(list(results));