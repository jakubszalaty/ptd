const plot = require('plotter').plot

const dft = require('fft-js').dft
const _ = require('lodash')


let signals, Fc, Fs, A, time, line,deline,printLine,printDeLine



// zmiana amplitudy
Fc = 5
signals = [1,0,1,0,1,0,1,1,0,1,0,1,0,1]
Fs = 2000
A = 1
time = 1

printLine = rectangle(signals,Fs,A,time,0,0)
print(printLine, 'Signals', '-0.5:1.5', `sygnał:${signals}`)

line = zadASK(signals,Fs,time,0,0)
print(line, 'Moduled_signals_ASK', null, `sygnał:${signals}`)


deline = demodulationASK(line,time,time/signals.length)
printDeLine = rectangle(deline,Fs,A,time,0,0)
print(printDeLine, 'Demodules_signals_ASK', '-0.5:1.5', `sygnał:${deline}`)


// // zmiana amplitudy
// signals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
// Fs = 2000
// A = 1
// time = 1
// line = zadASK(signals,Fs,time,0,0,[2,1])
// // print(line, 'lab5_ASK2', null, `sygnał:${signals}`)


// // zmiana czestotliwosci
// signals = [1,0,1,0,1,1,0,0,1,0,1]
// Fs = 2000
// A = 1
// time = 1
// line = zadFSK(signals,Fs,A,time,0,0)
// // print(line, 'lab5_FSK1', null, `sygnał:${signals}`)

// // przesuniecie fazy
// signals = [1,0,1,0,0,1,0,0,1,0]
// Fs = 2000
// A = 1
// time = 1
// line = zadPSK(signals,Fs,A,time,0,0)
// // print(line, 'lab4_PSK', null, `sygnał:${signals}`)




function print(line,name, range, title, xlabel, ylabel){
  // fn do rysowania
  plot({
    data:       { 'line' : line },
    style:      'line',
    title:      title ? title : 'Wykres',
    xlabel:     xlabel ? xlabel : 't[s]',
    ylabel:     ylabel ? ylabel : 'f[Hz]',
    filename:   name + '.svg',
    format:     'svg',
    options:  range ? [`yrange [${range}]`] : []

  })

}

function zadASK(signals,Fs,time,mov,moveTime,amplitudes){
  if(!mov)
    mov = 0
  if(!moveTime)
    moveTime = 0

  time += moveTime

  let line = {}
  // czestotilowsc probkowania - Fs
  let dt = 1/Fs
  signals = signals.map((signal)=>{
    if(signal)
      signal = amplitudes ? amplitudes[0] : 1
    else
      signal = amplitudes ? amplitudes[1] : 0
    return signal*=signals.length
  })
  let Tb = time/signals.length
  // Fc = ustaw
  let movPI = mov*Math.PI
  // taki tam fix z tym +dt
  for ( let x = moveTime+dt; x <= time; x += dt ) {
    let Fc = signals.length
    let A = signals[parseInt(x/Tb)]
    let y = A * Math.sin( 2 * Math.PI * Fc * x + movPI)
    line[x] = y
  }
  return line
}

function zadFSK(signals,Fs,A,time,mov,moveTime){
  if(!mov)
    mov = 0
  if(!moveTime)
    moveTime = 0

  time += moveTime

  let line = {}
  // czestotilowsc probkowania - Fs
  let dt = 1/Fs
  signals = signals.map((signal)=>{
    if(signal)
      signal = 2
    else
      signal = 1
    return signal*=signals.length
  })
  let Tb = time/signals.length
  // Fc = ustaw
  let movPI = mov*Math.PI
  // taki tam fix z tym +dt
  for ( let x = moveTime+dt; x <= time; x += dt ) {
    let Fc = signals[parseInt(x/Tb)]
    let y = A * Math.sin( 2 * Math.PI * Fc * x + movPI)
    line[x] = y
  }
  return line

}

function zadPSK(signals,Fs,A,time,mov,moveTime){
  if(!mov)
    mov = 0
  if(!moveTime)
    moveTime = 0

  time += moveTime

  let line = {}
  // czestotilowsc probkowania - Fs
  let dt = 1/Fs
  signals = signals.map((signal)=>{
    if(signal)
      signal = 0
    else
      signal = 1
    return signal
  })
  let Tb = time/signals.length

  // taki tam fix z tym +dt
  for ( let x = moveTime+dt; x <= time; x += dt ) {
    let Fc = signals.length
    let movPI = signals[parseInt(x/Tb)]*Math.PI
    let y = A * Math.sin( 2 * Math.PI * Fc * x + movPI)
    line[x] = y
  }
  return line

}

function rectangle(signals,Fs,A,time,mov,moveTime){
  if(!mov)
    mov = 0
  if(!moveTime)
    moveTime = 0

  time += moveTime

  let line = {}
  // czestotilowsc probkowania - Fs
  let dt = 1/Fs

  signals = signals.map((signal)=>{
    if(signal)
      signal = 0
    else
      signal = 1
    return signal
  })
  let Tb = time/signals.length

  let movPI = mov*Math.PI
  // taki tam fix z tym +dt
  for ( let x = moveTime+dt; x <= time; x += dt ) {
    let y = signals[parseInt(x/Tb)]
    // let y = A * Math.sin( 2 * Math.PI * Fc * x + movPI)
    if(y > 0)
      line[x] = 1 * A
    else
      line[x] = 0
  }
  return line

}

function spectrum(line, Fs){
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


function demodulationASK(line,time,Tb){
  const signals = time/Tb
  const response = []
  const threshold = 1/4 * Tb
  for ( let x = threshold; x <= time; x += Tb ) {
    const index = _.find(line,(value,key,array)=>{
      if(Math.abs(parseFloat(key) - x) < 0.005){
        // console.log('key',key,value)
        return true
      }
      return false
    })
    // console.log('index',index)
    if(index !== 0)
      response.push(1)
    else
      response.push(0)
  }
  return response

}
