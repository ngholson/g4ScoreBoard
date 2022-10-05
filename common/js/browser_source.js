'use strict';

//  G4ScoreBoard addon for OBS version 1.6.0 Copyright 2022 Norman Gholson IV
//  https://g4billiards.com http://www.g4creations.com
//  this is a purely javascript/html/css driven scoreboard system for OBS Studio
//  free to use and modify and use as long as this copyright statment remains intact. 
//  Salotto logo is the copyright of Salotto and is used with their permission.
//  for more information about Salotto please visit https://salotto.app


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////            
//						functions
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////            

	function postLogo() {
		if (localStorage.getItem("customLogo0") !== "") {
			document.getElementById("g4Logo").src = localStorage.getItem("customLogo0");
		}
	}
	
	function clearWinBlink() {
		document.getElementById("player1Score").classList.remove("winBlink");
		document.getElementById("player2Score").classList.remove("winBlink");
	}
	
	function sleep(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds){
			break;
			}
		}
	}
	
	 function shotTimer(shottime){
		countDownTime = new Date().getTime() + shottime;
		sleep(1); //fixes clock 0 glitch. 1ms wait time. allows time for countdowntime to reliably update.
		if (shottime == 61000) {
			document.getElementById("shotClockVis").classList.add("start60");
			document.getElementById("shotClockVis").classList.replace("fadeOutElm","fadeInElm");
			} else {
			document.getElementById("shotClockVis").classList.add("startTimer");
			}
		shotClockxr = setInterval(function() {
		var now = new Date().getTime();
		var distance = countDownTime - now;
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		document.getElementById("shotClockVis").style.background = "lime";
		document.getElementById("shotClock").style.background = "green";
		if (distance > 21000){ document.getElementById("shotClock").style.color = "white"; };
		if (distance > 5000 && distance < 21000) { document.getElementById("shotClock").style.color = "black"; };
		if (distance > 60000) { seconds = seconds + 60; }; 
		document.getElementById("shotClock").innerHTML = seconds + "s";
			if (distance < 31000) {
				document.getElementById("shotClockVis").classList.replace("fadeOutElm","fadeInElm");
				document.getElementById("shotClockVis").style.background = "lime";
				document.getElementById("shotClockVis").classList.add("startTimer");
				}
			if (distance < 26000) {
				document.getElementById("shotClockVis").style.opacity = "0.7";
				}
			if (distance < 21000) {
				document.getElementById("shotClockVis").style.background = "orange";
				document.getElementById("shotClock").style.background = "orange";
				}
			if (distance < 16000) {
				document.getElementById("shotClock").style.background = "yellow";
				document.getElementById("shotClockVis").style.background = "yellow";
			}
			if (distance < 11000) {
				document.getElementById("shotClock").style.background = "tomato";
				document.getElementById("shotClockVis").style.background = "tomato";
				document.getElementById("shotClockVis").style.opacity = "1";          
			}
			if (distance < 11000 && distance > 9700) { showClock(); };
			if (distance < 6000 && distance > 999) {
				document.getElementById("shotClock").classList.add("shotRed");
				document.getElementById("shotClock").style.background = "red";
				document.getElementById("shotClockVis").style.background = "red";
				document.getElementById("shotClock").style.color = "white";
			}
			if (distance < 1000) {
				clearInterval(shotClockxr);
				document.getElementById("shotClock").style.background = "red";
				document.getElementById("shotClockVis").style.background = "red";
				document.getElementById("shotClock").style.color = "white";
			}
			if (seconds == tev) {
				var ntev = seconds --- 1;
				document.getElementById("shotClock").innerHTML = ntev + "s";
				var tev = ntev;
				console.log("dup Detected - corrected tev:"+tev);
				bcr.postMessage(tev);
				} else {
					document.getElementById("shotClock").innerHTML = seconds + "s";
					tev = seconds;
					console.log("tev:"+tev);
					bcr.postMessage(tev);
				}
		 }, 1000);
	}

	 function showClock(){
		document.getElementById("shotClock").classList.replace("fadeOutElm","fadeInElm");
	}

	function hideClock(){
		document.getElementById("shotClock").classList.replace("fadeInElm", "fadeOutElm");
	}
	
	function stopClock() {
		clearInterval(shotClockxr);
		hideClock();
		document.getElementById("shotClock").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		document.getElementById("shotClock").classList.remove("shotRed");
		document.getElementById("shotClock").style.background = "";
		document.getElementById("shotClockVis").classList.replace("fadeInElm", "fadeOutElm");
		document.getElementById("shotClockVis").classList.remove("startTimer");
		document.getElementById("shotClockVis").classList.remove("start60");
		document.getElementById("shotClockVis").style.background = "";
	}

	function add30(player) { 
			countDownTime = countDownTime + 30000;
			document.getElementById("p"+player+"ExtIcon").style.background = "darkred";
			document.getElementById("shotClock").classList.remove("shotRed");
			document.getElementById("shotClock").style.background = "";    
			document.getElementById("shotClockVis").classList.remove("startTimer");
			document.getElementById("shotClockVis").classList.remove("start60");
			document.getElementById("shotClockVis").style.background = "";
			document.getElementById("shotClock").classList.replace("fadeInElm", "fadeOutElm");
			document.getElementById("shotClockVis").classList.replace("fadeInElm", "fadeOutElm");
			document.getElementById("p"+player+"ExtIcon").classList.add("extBlink");
			playerNumber =  player;
			setTimeout("clearExtBlink(playerNumber)",500);	
	}
	
	function clearExtBlink(playerN) {
		document.getElementById("p"+playerN+"ExtIcon").classList.remove("extBlink");
		document.getElementById("p"+playerN+"ExtIcon").style.background = "darkred";

	}
	
	function extReset(player) {
		document.getElementById(player+"ExtIcon").style.background = "green";
					 
		}
		
	function salottoShow() {
		document.getElementById("salottoLogo").classList.replace("fadeOutElm","fadeInElm");	
	
	}
	function salottoHide() {
		document.getElementById("salottoLogo").classList.replace("fadeInElm","fadeOutElm");
	
	}
	
	function customShow() {
		document.getElementById("g4Logo").style.removeProperty('display');
		setTimeout(function(){
		if (document.getElementById("g4Logo").classList.contains("logoSlide")) {
			document.getElementById("g4Logo").classList.replace("logoSlide", "fadeOutElm"); }
		if (document.getElementById("g4Logo").classList.contains("fade")) {
			document.getElementById("g4Logo").classList.replace("fade", "fadeOutElm"); }
		document.getElementById("g4Logo").classList.replace("fadeOutElm","fadeInElm");
		},100);
	
	}
	function customHide() {
		document.getElementById("g4Logo").classList.replace("fadeInElm","fadeOutElm");
		setTimeout( function(){document.getElementById("g4Logo").style.display = "none";},1000);
	
	}
	
	function showSlides() {
		let i;
		let slides = document.getElementsByClassName("logoSlide");
		for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";  
		}
		slideIndex++;
		if (slideIndex > slides.length) {slideIndex = 1}    
		slides[slideIndex-1].style.display = "block";  
		setTimeout(showSlides, 20000); // Change image every 20 seconds
		}
	
	function styleChange(n) {
		if (n == 1) {
			document.styleSheets[0].disabled = false;
			document.styleSheets[1].disabled = true;
			document.styleSheets[2].disabled = true;
			}
		if (n == 2) {
			document.styleSheets[0].disabled = true;
			document.styleSheets[1].disabled = false;
			document.styleSheets[2].disabled = true;
			}
		if (n == 3) {
			document.styleSheets[0].disabled = true;
			document.styleSheets[1].disabled = true;
			document.styleSheets[2].disabled = false;
			}
	}
