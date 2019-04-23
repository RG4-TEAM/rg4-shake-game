<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Completed</title>
  <style>
    body{
			margin:0;
			overflow: hidden;
			font-size:0;
		}
		canvas{
			background: black;
			width: 100vw;
			height: 100vh;
		}
		input{
			width: 250px;
			height: 40px;
			line-height: 40px;
			position: absolute;
			bottom: 35px;
			left: calc(50% - 125px);
			background: none;
			color: white;
			font-size: 30px;
			font-family: arial;
			text-align: center;
			border: 1px solid white;
			background: rgba(255,255,255,0.2);
		}
    p{
      position: fixed;
      left: 0;
      bottom:5px;
      color: #fff;
      z-index:10;
      font-size:16px;
      font-family: Helvetica, Verdana, sans-serif;
      opacity:0.5;
      width: 100%;
      text-align: center;
      margin: 0;
    }
  </style>
</head>

<body>
  <!-- Edit the text with whatever you want :) --> 
  <!-- Works with emojis too ! -->
  <canvas id="scene"></canvas>
	<!-- <input id="copy" type="hidden" value="PEA transparency 2562" /> -->
	<input id="copy" type="hidden" value="การไฟฟ้าโปร่งใส 2562" />
  <!-- <p>Click anywhere to change the radius of your mouse</p> -->
  <script>
  
	var canvas = document.querySelector("#scene"),
		ctx = canvas.getContext("2d"),
		particles = [],
		amount = 0,
		mouse = {x:0,y:0},
		radius = 1;

	var colors = ["#ffffff",'7E3587'];
	// var colors = ["#468966","#FFF0A5", "#FFB03B","#B64926", "#8E2800"];

	var copy = document.querySelector("#copy");

	var ww = canvas.width = window.innerWidth;
	var wh = canvas.height = window.innerHeight;

	function Particle(x,y){
		this.x =  Math.random()*ww;
		this.y =  Math.random()*wh;
		this.dest = {
			x : x,
			y: y
		};
		this.r =  Math.random()*5 + 2;
		this.vx = (Math.random()-0.5)*20;
		this.vy = (Math.random()-0.5)*20;
		this.accX = 0;
		this.accY = 0;
		this.friction = Math.random()*0.05 + 0.88;
		// this.friction = Math.random()*0.05 + 0.94;

		this.color = colors[Math.floor(Math.random()*6)];
	}

	Particle.prototype.render = function() {


		this.accX = (this.dest.x - this.x)/1000;
		this.accY = (this.dest.y - this.y)/1000;
		this.vx += this.accX;
		this.vy += this.accY;
		this.vx *= this.friction;
		this.vy *= this.friction;

		this.x += this.vx;
		this.y +=  this.vy;

		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
		ctx.fill();

		var a = this.x - mouse.x;
		var b = this.y - mouse.y;

		var distance = Math.sqrt( a*a + b*b );
		if(distance<(radius*70)){
			this.accX = (this.x - mouse.x)/100;
			this.accY = (this.y - mouse.y)/100;
			this.vx += this.accX;
			this.vy += this.accY;
		}

	}

	function onMouseMove(e){
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}

	function onTouchMove(e){
    if(e.touches.length > 0 ){
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
	}

function onTouchEnd(e){
  mouse.x = -9999;
  mouse.y = -9999;
}

	function initScene(){
		ww = canvas.width = window.innerWidth;
		wh = canvas.height = window.innerHeight;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.font = "bold "+(ww/11)+"px sans-serif";
		// ctx.font = "bold "+(ww/10)+"px sans-serif";
		ctx.textAlign = "center";
		ctx.fillText(copy.value, ww/2, wh/2);

		var data  = ctx.getImageData(0, 0, ww, wh).data;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.globalCompositeOperation = "screen";

		particles = [];
		for(var i=0;i<ww;i+=Math.round(ww/150)){
			for(var j=0;j<wh;j+=Math.round(ww/150)){
				if(data[ ((i + j*ww)*4) + 3] > 150){
					particles.push(new Particle(i,j));
				}
			}
		}
		amount = particles.length;

	}

	function onMouseClick(){
		radius++;
		if(radius ===5){
			radius = 0;
		}
	}

	function render(a) {
		requestAnimationFrame(render);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < amount; i++) {
			particles[i].render();
		}
	};

	// copy.addEventListener("keyup", initScene);
	window.addEventListener("resize", initScene);
	// window.addEventListener("mousemove", onMouseMove);
	// window.addEventListener("touchmove", onTouchMove);
	// window.addEventListener("click", onMouseClick);
  // window.addEventListener("touchend", onTouchEnd);
  setTimeout(function(){
    initScene();
    requestAnimationFrame(render);
  },1000)
  </script>
</body>
</html>