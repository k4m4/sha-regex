declare namespace sha {
	interface Options {
		/**
		Only match an exact string. By default, it matches any SHA hashes in a string. Useful with `RegExp#test()` to check if a string is a SHA hash.
		@default false
		*/
		readonly exact?: boolean;
	}
	/**
	Available SHA versions.
	*/
	type Version = 1 | 224 | 256 | 384 | 512
}

declare const sha: {
	/**
	Returns a regex for matching specific SHA version hashes.
	@example
	```
	import sha = require('sha-regex')
	sha.version(256, {exact: true}).test('c6cb50e7eea0df1fd3eaf52ada2358f5423afd7c0b5ee2395231a9b3208ffcaf')
	//=> true
	```
	*/
	version: (version: sha.Version, options?: sha.Options) => RegExp;

	/**
	Returns a regex for matching SHA hashes.
	@example
	```
	import sha = require('sha-regex')
	sha().test('nodejsrocks 84de6753b298abd027fcd1d790eade2413eafb5a')
	//=> true
	```
	*/
	(options?: sha.Options): RegExp;
}

export = sha
