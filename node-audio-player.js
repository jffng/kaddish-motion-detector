const express = require('express');
const app = express();
const port = 3000;
const player = require('play-sound')(opts = {});
const load = require('audio-loader');

let audio = undefined;
let duration = 30;

async function init(){
  const buffer = load('assets/kaddish.mp3').then(function(s){
    duration = s.duration;
    
    const timeoutDuration = Math.ceil(1000 * duration);

    console.log('Recording length: ' + timeoutDuration + 'ms');

    app.get('/motion-detected', (req, res) => {
       console.log('Motion detected');
       if (!audio){
           console.log('Start playing');
	   audio = player.play('assets/kaddish.mp3', function(err){
	    if (err && !err.killed) throw err
	   });

           setTimeout(function(){
             console.log('Done playing');
	     audio = undefined;
           }, timeoutDuration);
       } 

       res.sendStatus(200);
    });

    app.get('/', (req, res) => res.send('Hello World!'))

    app.listen(port, () => console.log(`Kaddish app listening on port ${port}!`))
  });
}

init();
