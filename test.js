const load = require('audio-loader');

async function loader(){
  const buffer = load('assets/kaddish.mp3').then(function(s){
    console.log(s.duration);
  });
  return buffer
}

loader();
