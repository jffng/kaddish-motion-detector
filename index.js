const express = require('express');
const app = express();
const port = 3000;
const { exec } = require('child_process');

let audio = false;
let duration = 67;

const timeoutDuration = Math.ceil(1000 * duration);

console.log('Recording length: ' + timeoutDuration + 'ms');

app.get('/motion-detected', (req, res) => {
	console.log('Motion detected');

	if (!audio){
		audio = true;
		console.log('Start playing');
		exec('omxplayer assets/kaddish.mp3', (err, stdout, stderr) => {
			if(err){
				console.error(err);
				return;
			}
			console.log(stdout);
		});
	};

	setTimeout(function(){
		console.log('Done playing');
		audio = false;
	}, timeoutDuration);

	res.sendStatus(200);
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Kaddish app listening on port ${port}!`))
