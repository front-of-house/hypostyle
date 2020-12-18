import baretest from 'baretest'
import assert from 'assert'

console.time('test')

const test = baretest('hypostyle')

require('./hypostyle').default(test, assert)
;(async function () {
  await test.run()
  console.timeEnd('test')
})()
