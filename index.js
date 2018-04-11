'use strict';

const shaRegExps = {
  1  : '[a-f0-9]{40}',
  224: '[a-f0-9]{56}',
  256: '[a-f0-9]{64}',
  384: '[a-f0-9]{96}',
  512: '[a-f0-9]{128}',
}

function buildRegExp(bodyExp, opts) {
	let beginning = `\\b(?:`, end = `)\\b`
	if (opts && opts.exact) {
		beginning = `^(`
		end = `)$`
	}
	const regExp = beginning + bodyExp + end
	if (opts && opts.exact) {
		return new RegExp(regExp)
	}
	return new RegExp(regExp, 'g')
}

const sha = (opts) => {
  let individualRegExps = []
  for (let version in shaRegExps) {
    let oneRegExp = '(?:' + shaRegExps[version] + `)`
    individualRegExps.push(oneRegExp)
  }
	const bodyExp = individualRegExps.join(`|`)
	return buildRegExp(bodyExp, opts)
}

sha.version = (version, opts) => {
  if (!shaRegExps[version]) {
    throw new Error('Invalid hash version')
  }
	const bodyExp = shaRegExps[version]
	return buildRegExp(bodyExp, opts)
}

module.exports = sha;