# sha-regex [![Build Status](https://travis-ci.org/k4m4/sha-regex.svg?branch=master)](https://travis-ci.org/k4m4/sha-regex)

> Regular expression for matching SHA hashes in strings.


## Install

```
~ ❯❯❯ npm install sha-regex
```


## Usage

```js
const sha = require('sha-regex')

sha().test('nodejsrocks 84de6753b298abd027fcd1d790eade2413eafb5a')
//=> true

sha({exact: true}).test('nodejsrocks 84de6753b298abd027fcd1d790eade2413eafb5a foo')
//=> false

sha({exact: true}).test('84de6753b298abd027fcd1d790eade2413eafb5a')
//=> true

sha.version(256, {exact: true}).test('c6cb50e7eea0df1fd3eaf52ada2358f5423afd7c0b5ee2395231a9b3208ffcaf')
//=> true

sha.version(512, {exact: true}).test('84de6753b298abd027fcd1d790eade2413eafb5a')
//=> false

'nodejsrocks 	84de6753b298abd027fcd1d790eade2413eafb5a rainbow c6cb50e7eea0df1fd3eaf52ada2358f5423afd7c0b5ee2395231a9b3208ffcaf'.match(sha())
//=> ['84de6753b298abd027fcd1d790eade2413eafb5a','c6cb50e7eea0df1fd3eaf52ada2358f5423afd7c0b5ee2395231a9b3208ffca']
```


## API

### sha([options])

Returns a regex for matching SHA hashes.

#### options.exact

Type: `boolean`<br>
Default: `false` *(Matches any SHA hash in a string)*

Only match an exact string. Useful with `RegExp#test()` to check if a string is a SHA hash.


### sha.version([version], [options])

Returns a regex for matching specific SHA version hashes.

#### version

Type: `integer`<br>
Supported Versions: `1`, `224`, `256`, `384`, `512`

Match a specific version of SHA.

#### options.exact

Type: `boolean`<br>
Default: `false` *(Matches any SHA hash in a string)*

Only match an exact string. Useful with `RegExp#test()` to check if a string is a SHA hash.


## License

MIT © [Nikolaos Kamarinakis](https://nikolaskama.me)
