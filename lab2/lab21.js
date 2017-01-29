var plot = require('plotter').plot;

var dft = require('fft-js').dft;


var line = zad1(180);
var signal = [];

for(var key in line){
  signal.push(line[key]);
}


var phasors = dft(signal);

var z = [];

for (var i = 0; i < parseInt(phasors.length/2); i++) {
  var a = phasors[i][0];
  var b = phasors[i][1];
  z.push(Math.sqrt(a*a + b*b));
}

var f = [];
var line = [];

var Fs = 1500;
for (var i = 0; i < z.length; i++) {
  f[i] = i * Fs/phasors.length;
  line[f[i]] = z[i];
}

print(line, 'lab2z1');

function print(line,name){
  // fn do rysowania
  plot({
    data:       { 'line' : line },
    style:      'line',
    title:      'Wykres',
    xlabel:     'f',
    ylabel:     '[z]',
    filename:   name + '.svg',
    format:     'svg',
  });

}

function zad1(Fc){
  var line = {};
  // czestotilowsc probkowania - Fs
  var Fs = 1500;
  var dt = 1/Fs;

  var A = 0.7;

  // var time = 2;
  var time = 0.5;

  var mov = Math.PI*3/4;
  // herz
  // var Fc = 180;

  for ( var x = 0; x <= time; x += dt ) {
    y = A * Math.sin( 2 * Math.PI * Fc * x + mov);
    line[x] = y;
  }
  return line;

}
