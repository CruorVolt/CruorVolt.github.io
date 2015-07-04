var start;
var tweetEvents = [];
var dialInterval;     //The setInterval for controlling dialing animation

start = function() {
	clearInterval(dialInterval);
	console.log("Started");
	if (!document.getElementById("displayCanvas")) {
		console.log("NOPE");
		return; //No need for streaming on this page
	}

	var dialIndex = 0;    //The current character displayed by dialing animation

	var init_message = "A real-time Twitter visualizer".split("");

	var canvas = document.getElementById("displayCanvas");
	var context = canvas.getContext("2d");

	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	context.fillStyle = "rgba(90, 37, 77, 1.0)"; //Blank to start

	var size = 30;
	var alpha = size / 200
	var rows = canvas.height / size;
	var cols = canvas.width / size;

	//Write the loading ticker
	function dial() {
		console.log("Dialing");
		index = dialIndex % init_message.length;
		//context.fillStyle = "rgba(0, 37, 77, 0.3)"; //Background color and fadeout speed
		context.fillStyle = "rgba(90, 37, 77, 0.0)"; //Background color and fadeout speed
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = getTextColor();
		context.font = (size+5) + "px monospace";
		context.fillText(init_message[index], (canvas.width / 2) - (init_message.length / 2 * size) + (index * size), canvas.height / 3); 
		dialIndex += 1;
		if (dialIndex >= init_message.length) {
			console.log("CLEARING");
			clearInterval(dialInterval);
		}
	}

	function getTextColor() {
		var hex = "ABCDEF".split("");
		var hue = Math.floor((Math.random() * 100) + 155);
		return "rgb(" + hue + ", " + hue + ", " + hue + ")";
	}

	function canvasSize(scroll_dir) {
		if (vertical) {
			return (scroll_dir) ? cols : rows;
		} else {
			return (scroll_dir) ? rows : cols;
		}
	}

	dialInterval = setInterval(dial, 150);

}
