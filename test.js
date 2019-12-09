import test from 'ava'
import m from '.'

const hashes = {
	1: '84de6753b298abd027fcd1d790eade2413eafb5a',
	224: '983d515094574856a57db3a13741f0a65509bb640bfa551e78fa01d9',
	256: 'c6cb50e7eea0df1fd3eaf52ada2358f5423afd7c0b5ee2395231a9b3208ffcaf',
	384: 'de41efa2be0844783ea107630a79246fb1f7b3ab97b35c5e4b70130804f876f64b645c1064a775507a7ac3be457539f2',
	512: 'e233b19aabc7d5e53826fb734d1222f1f0444c3a3fc67ff4af370a66e7cadd2cb24009f1bc86f0bed12ca5fcb226145ad10fc5f650f6ef0959f8aadc5a594b27'
}
const notHashes = [
	'16rCmCmbuWDhPjWTrpQGaU3EPdZF7MTdUk',
	'0x281055afc982d96fab65b3a49cac8b878184cb16'
]

test('sha', t => {
	for (const x in hashes) {
		t.true(m({exact: true}).test(hashes[x]))
		t.is((m().exec(`foo ${hashes[x]} bar`))[0], hashes[x])
	}

	for (const x of notHashes) {
		t.false(m({exact: true}).test(x))
	}
})

test('sha version', t => {
	for (const v in hashes) {
		t.true(m.version(v, {exact: true}).test(hashes[v]))
		t.is((m.version(v).exec(`foo ${hashes[v]} bar`))[0], hashes[v])
		for (const notHash of notHashes) {
			t.false((m.version(v).test(notHash)))
		}
	}
})

test('sha version mismatch', t => {
	t.false(m.version(224, {exact: true}).test(hashes[1]))
	t.false(m.version(1, {exact: true}).test(hashes[224]))
	const error = t.throws(() => {
		m.version(1337)
	})
	t.is(error.message, 'Invalid hash version')
})

test('sha with spaces', t => {
	t.false(m.version(384, {exact: true}).test(hashes[384] + '  '))
	t.false(m({exact: true}).test('   ' + hashes[386]))
})
