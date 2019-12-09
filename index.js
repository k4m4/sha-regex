'use strict'

const shaRegExps = {
	1: '[a-f0-9]{40}',
	224: '[a-f0-9]{56}',
	256: '[a-f0-9]{64}',
	384: '[a-f0-9]{96}',
	512: '[a-f0-9]{128}'
}

const buildRegExp = (bodyExp, opts) => {
	let beginning = '\\b(?:'
	let end = ')\\b'
	if (opts && opts.exact) {
		beginning = '^('
		end = ')$'
	}

	const regExp = beginning + bodyExp + end
	if (opts && opts.exact) {
		return new RegExp(regExp)
	}

	return new RegExp(regExp, 'g')
}

const sha = opts => {
	const individualRegExps = []
	for (const version in shaRegExps) {
		const oneRegExp = `(?:${shaRegExps[version]})`
		individualRegExps.push(oneRegExp)
	}

	const bodyExp = individualRegExps.join('|')
	return buildRegExp(bodyExp, opts)
}

sha.version = (version, opts) => {
	const bodyExp = shaRegExps[version]
	if (!bodyExp) {
		throw new Error('Invalid hash version')
	}

	return buildRegExp(bodyExp, opts)
}

module.exports = sha
