'use strict'

const plot = require('plotter').plot

const dft = require('fft-js').dft


let t = 0.5
zad3AM(1,2000,400,4,0.3,t,'am_0.3')
zad3AM(1,2000,400,4,0.9,t,'am_0.9')
zad3AM(1,2000,400,4,13,t,'am_13')

zad3PM(1,2000,400,4,0.5,t,'pm_0.5')
zad3PM(1,2000,400,4,1,t,'pm_1')
zad3PM(1,2000,400,4,22,t,'pm_22')

function print(line,name,xlabel,ylabel){
  // fn do rysowania
  plot({
    data:       { 'line' : line },
    style:      'line',
    title:      'Wykres',
    xlabel:     xlabel || 'f[Hz]',
    ylabel:     ylabel || '~xi[dB]',
    filename:   `${name}.svg`,
    format:     'svg',
  })

}
function zad3AM(A, Fs, Fm, Fc, kam,t,name){
  // A = 1,
  // Fs = 2000,
  // Fm = 500,
  // Fc = 4,
  // kam = 13
  // name = 'lab3_am'
  // let t = 0.5
  let line
  line = zad1ct(Fc,Fs,A,t)
  print(line, `lab3_${name}_ct`, 'f','t')


  line = zad1AMmt(Fm,Fs,2, kam, t)
  print(line, `lab3_${name}_mt`, 'f','t')

  line = zad1AMzt(Fc,Fs,A,Fm,kam,t)

  print(line, `lab3_${name}_zt`, 'f','t')

  line = signals(line,Fs)

  print(line, `lab3_${name}_dbzt`)
}
function zad3PM(A, Fs, Fm, Fc, kam,t,name){
  // A = 1,
  // Fs = 2000,
  // Fm = 500,
  // Fc = 4,
  // kam = 13
  // name = 'lab3_am'
  // let t = 0.5
  let line
  line = zad1ct(Fc,Fs,A,t)
  print(line, `lab3_${name}_ct`, 'f','[z]')


  line = zad1PMmt(Fm,Fs,2, kam, t)
  print(line, `lab3_${name}_mt`, 'f','[z]')

  line = zad1PMzt(Fc,Fs,A,Fm,kam,t)

  print(line, `lab3_${name}_zt`, 'f','[z]')

  line = signals(line,Fs)

  print(line, `lab3_${name}_dbzt`)
}

function signals(line, Fs){
  let signal = []
  for(let key in line){
    signal.push(line[key])
  }
  let phasors = dft(signal)

  let z = []

  for (let i = 0; i < parseInt(phasors.length/2); i++) {
    let a = phasors[i][0]
    let b = phasors[i][1]
    z.push(a*a + b*b)
  }



  let f = []
  line = []

  let max = 0

  for (let i = 0; i < z.length; i++) {
    f[i] = i * Fs/phasors.length
    line[f[i]] = 10* Math.log10( Math.pow( Math.abs(z[i]),2 ) )

    if(line[f[i]]>max)
      max = line[f[i]]
  }

  for (let i = 0; i < z.length; i++) {
    f[i] = i * Fs/phasors.length
    line[f[i]] = line[f[i]] - max
  }

  return line

}

function zad1ct(Fc,Fs,A,t){
  let line = {}
  // czestotilowsc probkowania - Fs
  let dt = 1/Fs


  // let mov = Math.PI*3/4
  let mov = 0

  for ( let x = 0; x <= t; x += dt ) {
    let y = A * Math.sin( 2 * Math.PI * Fc * x + mov)
    line[x] = y
  }
  return line

}

function zad1AMmt(Fc, Fs, A, kam,t){
  let line = {}
  // czestotilowsc probkowania - Fs
  let dt = 1/Fs

  // let mov = Math.PI*3/4
  let mov = 0

  for ( let x = 0; x <= t; x += dt ) {
    let y  = (1 + kam) * Math.sin( 2 * Math.PI * Fc * x + mov)

    line[x] = y
  }
  return line

}


function zad1AMzt(Fc, Fs, A,Fm, kam,t){
  let line = {}
  // czestotilowsc probkowania - Fs
  let dt = 1/Fs

  // let mov = Math.PI*3/4
  let mov = 0

  for ( let x = 0; x <= t; x += dt ) {
    let ct = A* Math.sin( 2 * Math.PI * Fc * x + mov)
    let y  = (1 + kam * ct) * Math.sin( 2 * Math.PI * Fm * x + mov)

    line[x] = y
  }
  return line

}

function zad1PMmt(Fc, Fs, A, kpm,t){
  let line = {}
  // czestotilowsc probkowania - Fs
  let dt = 1/Fs

  // let mov = Math.PI*3/4
  let mov = 0

  for ( let x = 0; x <= t; x += dt ) {
    let y  = A * Math.sin( 2 * Math.PI * Fc * x + (kpm))

    line[x] = y
  }
  return line

}


function zad1PMzt(Fc, Fs, A,Fm, kpm,t){
  let line = {}
  // czestotilowsc probkowania - Fs
  let dt = 1/Fs

  // let mov = Math.PI*3/4
  let mov = 0

  for ( let x = 0; x <= t; x += dt ) {
    let ct = A* Math.sin( 2 * Math.PI * Fc * x + mov)
    let y  = 1 * Math.sin( 2 * Math.PI * Fm * x + (kpm * ct))

    line[x] = y
  }
  return line

}


