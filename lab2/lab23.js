var plot = require('plotter').plot;
var dft = require('fft-js').dft;

function print(line,name,title){
  // fn do rysowania
  plot({
    data:       { 'line' : line },
    style:      'line',
    title:      title || 'Wykres',
    xlabel:     'f',
    ylabel:     '[z]',
    filename:   name + '.svg',
    format:     'svg',
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

function lab2(elem, Fs){

  var signal = [];
  for(var key in elem){
    signal.push(elem[key]);
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

  for (var i = 0; i < z.length; i++) {
    f[i] = i * Fs/phasors.length;
    line[f[i]] = z[i];
  }
  return line;
}


var time = new Date();
var Fs = 2500;
var F = 2;



var elem1 = zad3(8,F,Fs);
console.log("elem1");

var elem2 = zad3(16,F,Fs);
console.log("elem2");

var elem3 = zad3(32,F,Fs);
console.log("elem3");


line1 = lab2(elem1, Fs);
console.log("line1");
line2 = lab2(elem2, Fs);
console.log("line2");
line3 = lab2(elem3, Fs);
console.log("line3");


print(line1, 'lab2z31','k=8,F='+ F + 'Fs=' + Fs);
print(line2, 'lab2z32','k=16,F='+ F + 'Fs=' + Fs);
print(line3, 'lab2z33','k=32,F='+ F + 'Fs=' + Fs);




time = new Date() - time;

console.log(time/1000+"s");
