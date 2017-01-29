var plot = require('plotter').plot;

var line;


line = zad2(10,30);
print(line, 'zad21','w1<w2');

line = zad2(30,10);
print(line, 'zad22','w1>w2');

line = zad2(30,30);
print(line, 'zad23','w1=w2');




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

function zad2(Fc1, Fc2){
  var line = {};
  // czestotilowsc probkowania - Fs
  var Fs = 2500;
  var dt = 1/Fs;


  var time = 1.5;

  var mov = Math.PI*3/4;
  // herz
  // var Fc1 = 30;
  // var Fc2 = 10;




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

    // line[t] = w1;
    // line[t] = z;

  }

  return line;
}
