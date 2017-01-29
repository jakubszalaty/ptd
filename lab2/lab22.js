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

function zad2(Fc1, Fc2, Fs){
  var line = {};
  // czestotilowsc probkowania - Fs
  // var Fs = 1500;
  var dt = 1/Fs;


  var time = 1.5;

  var mov = Math.PI*3/4;

  for ( var t = 0; t <= time; t += dt ) {
    var z, w1, w2;


    if(t <= time/4)
      z = 8/3*t;
    else if (t <= time/2)
      z = -(8/3)*t + 2;
    else{
      z = Math.sqrt( 1 - ( ((t-1.125)*(t-1.125)) / (0.375*0.375) ) );
    }



    w1 = Math.sin( (2 * Math.PI * Fc1 * t));
    w2 = Math.cos( (2 * Math.PI * Fc2 * t));

    line[t] = z * w1 * w2;

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


var elem1 = zad2(180,250,Fs);
var elem2 = zad2(500,300,Fs);
var elem3 = zad2(350,350,Fs);

line1 = lab2(elem1, Fs);
line2 = lab2(elem2, Fs);
line3 = lab2(elem3, Fs);


print(line1, 'lab21','w1<w2, Fs=' + Fs);
print(line2, 'lab22','w1>w2, Fs=' + Fs);
print(line3, 'lab23','w1=w2, Fs=' + Fs);




time = new Date() - time;

console.log(time/1000+"s");
