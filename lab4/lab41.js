const plot = require('plotter').plot

const dft = require('fft-js').dft


let signals, Fc, Fs, A, time, line,line1,line2



// zmiana amplitudy
Fc = 5
signals = [1,0,1,0]
Fs = 2000
A = 1
time = 1
line = zadASK(signals,Fs,time,0,0)
print(line, 'lab4_ASK1', null, `sygnał:${signals}`)
line1 = spectrumPower(line,Fs)
print(line1, 'lab4_ASK1_spectrumPower', null,'Wykres','f[Hz]','~xi[dB]')

line2 = spectrumTime(line,Fs)
print(line2, 'lab4_ASK1_spectrumTime', null,'Wykres','f[Hz]','t[s]')

// zmiana amplitudy
signals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
Fs = 2000
A = 1
time = 1
line = zadASK(signals,Fs,time,0,0,[2,1])
print(line, 'lab4_ASK2', null, `sygnał:${signals}`)
line1 = spectrumPower(line,Fs)
print(line1, 'lab4_ASK2_spectrumPower', null,'Wykres','f[Hz]','~xi[dB]')

line2 = spectrumTime(line,Fs)
print(line2, 'lab4_ASK2_spectrumTime', null,'Wykres','f[Hz]','t[s]')
'f[Hz]'
'~xi[dB]'

// zmiana czestotliwosci
signals = [1,0,1,0,1,1,0,0,1,0,1]
Fs = 2000
A = 1
time = 1
line = zadFSK(signals,Fs,A,time,0,0)
print(line, 'lab4_FSK1', null, `sygnał:${signals}`)
line1 = spectrumPower(line,Fs)
print(line1, 'lab4_FSK1_spectrumPower', null,'Wykres','f[Hz]','~xi[dB]')

line2 = spectrumTime(line,Fs)
print(line2, 'lab4_FSK1_spectrumTime', null,'Wykres','f[Hz]','t[s]')

// przesuniecie fazy
signals = [1,0,1,0,0,1,0,0,1,0]
Fs = 2000
A = 1
time = 1
line = zadPSK(signals,Fs,A,time,0,0)
print(line, 'lab4_PSK', null, `sygnał:${signals}`)
line1 = spectrumPower(line,Fs)
print(line1, 'lab4_PSK_spectrumPower', null,'Wykres','f[Hz]','~xi[dB]')

line2 = spectrumTime(line,Fs)
print(line2, 'lab4_PSK_spectrumTime', null,'Wykres','f[Hz]','t[s]')

// prostokat1f
signals = [1,0,1,0,1,0,1,0,1,0]
Fs = 2000
A = 1
time = 1
line = rectangle(signals,Fs,A,time,0,0)
print(line, 'lab4_Rec_f', '-0.5:1.5', `sygnał:${signals}`)

// prostokat2f
signals = [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
Fs = 2000
A = 1
time = 1
line = rectangle(signals,Fs,A,time,0,0)
print(line, 'lab4_Rec_2f', '-0.5:1.5', `sygnał:${signals}`)

// prostokat2f
signals = [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
Fs = 2000
A = 1
time = 1
line = rectangle(signals,Fs,A,time,0,0)
print(line, 'lab4_Rec_4f', '-0.5:1.5', `sygnał:${signals}`)

// let binTxt = stringToBinary('TRZY WYRAZOWY CIAG')
// binTxt = binTxt.join('')
// line = binaryToLine(binTxt,1)
// print(line, 'lab4_Rec_str','-0.5:1.5')



function binaryToLine(binary, time, line){
  let array = binary.split('')
  if(!line)
    line = {}

  array.forEach((value,key)=>{
    let move
    if(value === '0')
      move = time
    else
      move = 0
    if(key%2)
      move+=time

    key *= time
    line = Object.assign(line, rectangle(1/2,Fs,A,time,move,key) )

  })

  return line
}


function stringToBinary(string){
  let binary = []

  for (let i = 0; i < string.length; i++) {

    let dec = string[i].charCodeAt(0)
    let bin = []

    while(dec){
      bin.push(dec%2)
      dec = parseInt(dec/2)
    }
    if(bin.length < 7){
      for (let j = 0; j < 7-bin.length; j++) {
        bin = ['0'].concat(bin)
      }
    }

    binary.push(bin.join(''))
  }

  return binary

}


function print(line,name, range, title,xlabel,ylabel){
  // fn do rysowania
  plot({
    data:       { 'line' : line },
    style:      'line',
    title:      title ? title : 'Wykres',
    xlabel:     xlabel || 't[s]',
    ylabel:     ylabel || 'f[Hz]',
    filename:   name + '.svg',
    format:     'svg',
    options:  range ? [`yrange [${range}]`] : []

  })

}

function zad1(Fc,Fs,A,time,mov,moveTime){
  if(!mov)
    mov = 0
  if(!moveTime)
    moveTime = 0

  time += moveTime

  let line = {}
  // czestotilowsc probkowania - Fs
  let dt = 1/Fs

  let movPI = mov*Math.PI
  // taki tam fix z tym +dt
  for ( let x = moveTime+dt; x <= time; x += dt ) {
    let y = A * Math.sin( 2 * Math.PI * Fc * x + movPI)
    line[x] = y
  }
  return line

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

function spectrumPower(line, Fs){
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

function spectrumTime(line, Fs){
  let signal = []
  for(let key in line){
    signal.push(line[key])
  }
  let phasors = dft(signal)


  let z = []

  for (let i = 0; i < parseInt(phasors.length/2); i++) {
    let a = phasors[i][0]
    let b = phasors[i][1]
    z.push(Math.sqrt(a*a + b*b))
  }

  let f = []
  line = []

  for (let i = 0; i < z.length; i++) {
    f[i] = i * Fs/phasors.length
    line[f[i]] = z[i]
  }

  return line

}
