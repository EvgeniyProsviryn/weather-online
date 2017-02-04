$(function() {

	

	var statusWeather = $(".wrapper h2").html();


	if(statusWeather.indexOf('дымка') + 1 || statusWeather.indexOf('облачно') + 1 || statusWeather.indexOf('облачность') + 1){
		$(".sun-shower,.thunder-storm,.cloudy,.flurries,.sunny,.rainy").css("display","none");
		$(".cloudy").css("display","inline-block");
		$(document).snowfall('clear');
		$(".background").css("display","block");

		$("#c").css("display","none");
	}

	if (statusWeather.indexOf('осадки') + 1 || statusWeather.indexOf('дождь') + 1 || statusWeather.indexOf('дожди') + 1) {
		$(".sun-shower,.thunder-storm,.cloudy,.flurries,.sunny,.rainy").css("display","none");
		$(document).snowfall('clear');
		$(".rainy").css("display","inline-block");
		$("#c").css("display","block");
	};

	if (statusWeather.indexOf('ясно') + 1 || statusWeather.indexOf('солнечно') + 1 || statusWeather.indexOf('сухо') + 1) {
		$(".sun-shower,.thunder-storm,.cloudy,.flurries,.sunny,.rainy").css("display","none");
		$(document).snowfall('clear');
		$(".sunny").css("display","inline-block");
		$("#c").css("display","none");
		$(".sun2").css("display","block");
		$("body").css("background","#2EB5E5");
	};

	if (statusWeather.indexOf('переменная') + 1) {
		$(".sun-shower,.thunder-storm,.cloudy,.flurries,.sunny,.rainy").css("display","none");
		$(document).snowfall('clear');
		$(".sun-shower").css("display","inline-block");
		$("#c").css("display","none");
	};

	if (statusWeather.indexOf('грозы') + 1 || statusWeather.indexOf('гроза') + 1) {
		$(".sun-shower,.thunder-storm,.cloudy,.flurries,.sunny,.rainy").css("display","none");
		$(document).snowfall('clear');
		$(".thunder-storm").css("display","inline-block");
		$("#c").css("display","block");
	};

	if (statusWeather.indexOf('снег') + 1 || statusWeather.indexOf('метель') + 1) {
		$(".sun-shower,.thunder-storm,.cloudy,.flurries,.sunny,.rainy").css("display","none");
		$(".flurries").css("display","inline-block");
		$(document).snowfall();

		$(window).resize(() => {
    	$(document).snowfall('clear');
    	$(document).snowfall();
		});
		$("#c").css("display","none");

		$('body').css('background',"url(https://www.elementaryos-fr.org/wp-content/uploads/2013/09/wallpaper-1923233.jpg) 50% 50% / cover no-repeat")
	};

	
	//important variables
var canvas = document.getElementById("c"),
	ctx = canvas.getContext("2d"),
	w = canvas.width = window.innerWidth,
	h = canvas.height = window.innerHeight;
//atributes and statistics
var angle = 5.2,
	len = 50,
	speed = 15,
	arcSpeed = 0.7,
	starCount = 50,
	count = 100,
	sky = [],
	rain = [],
	colors = [
		"rgb(7, 23, 61)",
		"rgb(24, 44, 90)",
		"rgb(47, 68, 116)",
		"rgb(80, 99, 144)",
		"rgb(122, 137, 173)"
	];
//calculated variables
var xConst = len * Math.cos(angle),
	yConst = len * Math.sin(angle);

var star = function() {
	this.x = Math.random()*w;
	this.y = Math.random()*h*3/4;
	this.r = Math.random()*2 + 1;
	this.a = 1 - (4*this.y)/(3*h);
}

var drop = function() {
	this.x = Math.random() * w;
	this.y = Math.random() * h - h / 4;
	this.ylimit = Math.random() * h / 4 + 3 * h / 4 + 10;
	this.xlimit = (this.ylimit - this.y) * (this.x - this.x + xConst) / (this.y - this.y + yConst) + this.x;
	this.arc = 10;
	this.draw = function() {
		ctx.beginPath();
		if (this.y < this.ylimit) {
			ctx.moveTo(this.x, this.y);
		} else {
			ctx.moveTo(this.xlimit, this.ylimit);
			if (this.arc >= 10) {
				this.arc = 0;
				this.arcx = this.xlimit;
			}
		}
		ctx.lineTo(xConst + this.x, yConst + this.y);
		ctx.stroke();
		//draw arc
		if (this.arc < 10) {
			ctx.save();
			ctx.translate(this.arcx, this.ylimit);
			ctx.scale(2, 1);
			ctx.strokeStyle = "rgba(122, 137, 173, " + (10-this.arc)/10 + ")";
			ctx.beginPath();
			ctx.arc(0, 0, this.arc, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.restore();
		}
	}
	this.update = function() {
		var a = Math.PI + angle;
		this.x = speed * Math.cos(a) + this.x;
		this.y = speed * Math.sin(a) + this.y;
		if (this.x < -xConst) {
			this.x = w;
			this.xlimit = (this.ylimit - this.y) * (this.x - this.x + xConst) / (this.y - this.y + yConst) + this.x;
		}
		if (yConst + this.y > this.ylimit) {
			this.y = 0;
			this.xlimit = (this.ylimit - this.y) * (this.x - this.x + xConst) / (this.y - this.y + yConst) + this.x;
		}
		if (this.arc < 10) {
			this.arc += arcSpeed;
		}
	}
}

for (var i = 0; i < count; i++) {
	sky.push(new star());
}

for (var i = 0; i < count; i++) {
	rain.push(new drop());
}

function draw() {
	ctx.fillStyle = colors[1];
	ctx.fillRect(0, 0, w, 3 / 4 * h);
	ctx.fillStyle = colors[0];
	ctx.fillRect(0, 3 / 4 * h, w, h / 4);
	//draw the stars
	ctx.fillStyle = colors[2];
	for(var i=0; i<sky.length; i++) {
		ctx.beginPath();
		//ctx.save();
		ctx.globalAlpha = sky[i].a;
		ctx.arc(sky[i].x,sky[i].y,sky[i].r,0, 2*Math.PI);
		ctx.fill();
		//ctx.restore();
	}
	ctx.globalAlpha = 1;
	//draw the moon
	ctx.beginPath();
	ctx.fillStyle = colors[3];
	ctx.arc(100,100,80,0, 2*Math.PI);
	ctx.fill();
	
	ctx.strokeStyle = colors[4];

	for (var i = 0; i < rain.length; i++) {
		rain[i].draw();
		rain[i].update();
	}
	
	window.requestAnimationFrame(draw);
}

draw();


	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});
