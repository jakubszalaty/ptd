var plot = require('plotter').plot;

var line;


line = zad1();
print(line, 'zad1');



function print(line,name){
  // fn do rysowania
  plot({
    data:       { 'line' : line },
    style:      'line',
    title:      'Wykres',
    xlabel:     't',
    ylabel:     'y',
    filename:   name + '.svg',
    format:     'svg',
  });

}

function zad1(){
  var line = {};
  // czestotilowsc probkowania - Fs
  var Fs = 1500;
  var dt = 1/Fs;

  var A = 0.7;

  var time = 2;

  var mov = Math.PI*3/4;
  // herz
  var Fc = 18;

  for ( var x = 0; x <= time; x += dt ) {
    y = A * Math.sin( 2 * Math.PI * Fc * x + mov);
    line[x] = y;
  }
  return line;

}
