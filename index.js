const express = require('express');
const app = express();
const port = 3000;
const player = require('play-sound')(opts = {});

let audio = undefined;
app.get('/motion-detected', (req, res) => {
  console.log('motion detected');
  res.sendStatus(200);

  if (audio){
    audio.kill();
  }

  audio = player.play('assets/test.mp3', function(err){
    if (err && !err.killed) throw err
  });
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
