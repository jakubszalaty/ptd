'use strict'
const plot = require('plotter').plot

const dft = require('fft-js').dft
const _ = require('lodash')



console.log('params',process.argv[2])

// const data = eval(`0b${process.argv[2]}`)
const data = new Uint8Array(process.argv[2].split(''))
const code = new Uint8Array([data[0],data[1],data[2],0,data[3],0,0])

console.log('data',data)
console.log('code',code)

const codeLast = code.length-1

code[codeLast] = code[4] ^ code[2] ^ code[0]
code[codeLast-1] = code[4] ^ code[1] ^ code[0]
code[codeLast-3] = code[2] ^ code[1] ^ code[0]

console.log('code',code)

// const random = parseInt(Math.random()*7)
const random = 3
code[random] = !code[random]
console.log('code',code)

const afterCode = [0,0,0]
afterCode[0] = code[4] ^ code[2] ^ code[0]
afterCode[1] = code[4] ^ code[1] ^ code[0]
afterCode[2] = code[2] ^ code[1] ^ code[0]

console.log(afterCode)
console.log(code[codeLast], code[codeLast-1],code[codeLast-3])

let sum  = 0
sum += (afterCode[0] ^ code[codeLast]) * Math.pow( 2,0 )
sum += (afterCode[1] ^ code[codeLast-1]) * Math.pow( 2,1 )
sum += (afterCode[2] ^ code[codeLast-3]) * Math.pow( 2,2 )

console.log('Trzeba poprawic: ',sum)
