import {expectType} from 'tsd'
import sha = require('.')

expectType<RegExp>(sha())
expectType<RegExp>(sha({exact: true}))
expectType<RegExp>(sha.version(1))
expectType<RegExp>(sha.version(1, {exact: false}))
