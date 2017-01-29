var plot = require('plotter').plot;

var line;
var Fs = 2500;
var F = 2;


line = zad3(8,F,Fs);
print(line, 'zad31','k=8');

line = zad3(16,F,Fs);
print(line, 'zad32','k=16');

line = zad3(32,F,Fs);
print(line, 'zad33','k=32');




function print(line,name, title){
  // fn do rysowania
  plot({
    data:       { 'line' : line },
    style:      'line',
    title:      title || 'Wykres',
    xlabel:     't',
    ylabel:     'y',
    filename:   name + '.svg',
    format:     'svg',
    // options:  ['xrange [-0.25:1.25]', 'yrange [-1.25:1.25]'],
  });

}

function zad3(k,F, Fs){
  var line = {};
  var dt = 1/Fs;
  var time = 1.5;
  var mov = Math.PI*3/4;




  for ( var t = 0; t <= time; t += dt ) {


    // var x = Math.sin( (2 * Math.PI * Fc1 * n));

    var sum = 0;

    for (var i = 1; i <= k; i++) {

      sum += 1/( 2*i-1 ) * Math.sin( ( 2*i-1 ) * 2*Math.PI * F * t );

    }

    var x = (4/Math.PI ) * sum;

    line[t] = x;

  }

  return line;
}
