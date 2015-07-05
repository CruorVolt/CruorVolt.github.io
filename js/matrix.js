var start;
var tweetEvents = [];
var dialInterval;     //The setInterval for controlling dialing animation
var paintInterval;
var lines = [];
var tweets = [];
var restartThreshhold = 0.97; 

start = function() {
	clearInterval(dialInterval);
	clearInterval(paintInterval);
	if (!document.getElementById("displayCanvas")) {
		return; //No need for streaming on this page
	}

	var dialIndex = 0;    //The current character displayed by dialing animation

	var init_message = "        A real-time Twitter visualizer        ".split("");

	var canvas = document.getElementById("displayCanvas");
	var context = canvas.getContext("2d");

	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	context.clearRect(0, 0, canvas.width, canvas.height);
	console.log("cleared");

	var size = 30;
	context.font = (size+5) + "px monospace";
	var alpha = size / 200
	var rows = canvas.height / size;
	var cols = canvas.width / size;
	var currentChar;
	var previousChar;

	//Write the loading ticker
	function dial() {
		clearInterval(paintInterval);

		index = dialIndex % init_message.length;
		currentChar = init_message[index];
		context.fillStyle = "#85D6FF"; //Bright Blue
		context.fillText(currentChar, (canvas.width / 2) - (init_message.length / 2 * size) + (index * size), canvas.height / 3); 
		if (index != 0) {
			previousChar = init_message[index-1];
			context.fillStyle = getTextColor();
			context.fillText(previousChar, (canvas.width / 2) - (init_message.length / 2 * size) + (index * size) - size, canvas.height / 3); 
		}

		dialIndex += 1;
		if (dialIndex >= init_message.length) {
			clearInterval(dialInterval);

			for(var x = 0; x < Math.floor(cols); x++) {
				lines[x] = Math.floor(Math.random() * rows); 
				tweets[x] = getString();
			}

			paintInterval = setInterval(paint, 80);
		}
	}

	function paint() {
		//Background is colored and translucent
		context.fillStyle = "rgba(0, 37, 77, 0.3)"; //Background color and fadeout speed
		context.fillRect(0, 0, canvas.width, canvas.height);

		for(var i = 0; i < lines.length; i++) {
			var tweet = tweets[i]
			var currentChar = tweet[lines[i] % tweet.length];
			var previousChar = tweet[(lines[i]-1) % tweet.length];

			context.fillStyle = "rgba(133, 214, 255, 1.0)";
			context.fillText(currentChar, i*size, (lines[i]*size)+size); //Write newest char illuminated
			context.fillStyle = getTextColor(); 
			context.fillText(previousChar, i*size, ((lines[i]-1)*size)+size); //Rewrite previous char in green

			//Randomly stagger resetting the line
			if(lines[i]*size > canvas.height && Math.random() > restartThreshhold) {
				lines[i] = 0;
				tweets[i] = getString();
			}
			
			//incrementing scrolling coordinate
			lines[i]++;
		}
	}

	function getTextColor() {
		var hex = "ABCDEF".split("");
		var hue = Math.floor((Math.random() * 60) + 195);
		return "rgb(" + hue + ", " + hue + ", " + hue + ")";
	}

	function getString() {
		var string = "";
		var chars = "#!@$%&^*+=1234567890XOI";
		for (var i = 0; i <= 10; i++) {
			string += chars[Math.floor(Math.random() * chars.length)];
		}
		console.log(string);
		return string;
	}


	dialInterval = setInterval(dial, 70);

}
