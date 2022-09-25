'use strict';


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//										variable declarations
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
			
            var countDownTime;
            var shotClockxr = null;
			const bcr = new BroadcastChannel('g4-recv'); // browser_source -> control_panel channel 
			const bc = new BroadcastChannel('g4-main');
			var playerNumber;
			          
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//										broadcast channel events
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
			
			bc.onmessage = (event) => {
				if(event.data.player && event.data.score != null){
		   		console.log("event.data.score: " + event.data.score);
				console.log("event.data.player: " + event.data.player);
				if (event.data.score > document.getElementById("player"+event.data.player+"Score").innerHTML) {
					document.getElementById("player"+event.data.player+"Score").innerHTML = event.data.score;
					document.getElementById("player"+event.data.player+"Score").classList.add("winBlink");
					setTimeout("clearWinBlink()",500);
						} else {
						document.getElementById("player"+event.data.player+"Score").innerHTML = event.data.score;
						}
				}
				
				if( event.data.opacity != null){
				console.log("event.data(opacity): "+event.data.opacity);
				document.getElementById("scoreBoardDiv").style.opacity  = event.data.opacity;
				document.getElementById("raceInfo").style.opacity  = event.data.opacity;
				document.getElementById("wagerInfo").style.opacity  = event.data.opacity;
				}
				
				if (event.data.race != null){
					console.log("event.data.race: " + event.data.race);
					if (event.data.race == "") {
						document.getElementById("raceInfo").classList.add("noShow");
						document.getElementById("raceInfo").classList.remove("fadeInElm");
						} else {
							document.getElementById("raceInfo").classList.remove("noShow");
							document.getElementById("raceInfo").classList.add("fadeInElm");
							document.getElementById("raceInfo").innerHTML = event.data.race;
					}
				}
				if (event.data.wager !=null) {
				console.log("event.data.wager: " + event.data.wager);
				if (event.data.wager == "") {
					document.getElementById("wagerInfo").classList.add("noShow");
					document.getElementById("wagerInfo").classList.remove("fadeInElm");
					} else {
						document.getElementById("wagerInfo").classList.remove("noShow");
						document.getElementById("wagerInfo").classList.add("fadeInElm");
						document.getElementById("wagerInfo").innerHTML = event.data.wager;
				    }
				}
				
				if (event.data.time != null){
					console.log("event.data.time: " + event.data.time);
					shotTimer(event.data.time);
				}
				
				if (event.data.color !=null) {
						console.log("event.data.player: "+event.data.player+" event.data.color: "+ event.data.color);
						if (event.data.player == "1") {	document.getElementById("player"+event.data.player+"Name").style.background = "linear-gradient(to left, white , "+event.data.color; };
						if (event.data.player == "2") {	document.getElementById("player"+event.data.player+"Name").style.background = "linear-gradient(to right, white , "+event.data.color; };
				}
				
				if (event.data.name != null) {
					console.log("event.data.player: "+event.data.player+" event.data.name: " + event.data.name);
					if (!event.data.name == ""){
						document.getElementById("player"+event.data.player+"Name").innerHTML = event.data.name;
						} else {
							document.getElementById("player"+event.data.player+"Name").innerHTML = "Player "+event.data.player;
						}
				}
				
				// start of original clockDisplay channel 
				if (event.data.clockDisplay != null) {
					console.log("event.data.clockDisplay: " + event.data.clockDisplay);
					if (event.data.clockDisplay == "show") { showClock(); };  
					if (event.data.clockDisplay == "hide") {hideClock(); };  
					if (event.data.clockDisplay == "stopClock") { stopClock(); };
					if (event.data.clockDisplay == "noClock") {
							document.getElementById("p1ExtIcon").classList.replace("fadeInElm","fadeOutElm");	
							document.getElementById("p2ExtIcon").classList.replace("fadeInElm","fadeOutElm");	
						}  
					if (event.data.clockDisplay == "useClock") {
							document.getElementById("p1ExtIcon").classList.replace("fadeOutElm","fadeInElm");	
							document.getElementById("p2ExtIcon").classList.replace("fadeOutElm","fadeInElm");	
						} 
					if (event.data.clockDisplay == "p1extension") { add30(1); };
					if (event.data.clockDisplay == "p2extension") { add30(2); };
					if (event.data.clockDisplay == "p1ExtReset") { extReset('p1'); }; 
					if (event.data.clockDisplay == "p2ExtReset") { extReset('p2'); };
					if (event.data.clockDisplay == "hidesalotto") { salottoHide(); };
					if (event.data.clockDisplay == "showsalotto") { salottoShow(); };
					if (event.data.clockDisplay == "hidecustomLogo") { customHide(); };
					if (event.data.clockDisplay == "showcustomLogo") { customShow(); };
					if (event.data.clockDisplay == "postLogo") { postLogo(); };
					if (event.data.clockDisplay == "logoSlideShow-show")  {
						customHide(); 
						document.getElementById("logoSlideshowDiv").classList.replace("fadeOutElm", "fadeInElm");
						document.getElementById("g4Logo").classList.replace("fadeOutElm", "logoSlide");
						setTimeout(function(){document.getElementById("g4Logo").classList.add("fade");},500);
						if (localStorage.getItem("customLogo1") != null) {document.getElementById("customLogo1").src = localStorage.getItem("customLogo1");} else { document.getElementById("customLogo1").src = "./common/images/placeholder.png"; };
						if (localStorage.getItem("customLogo2") != null) {document.getElementById("customLogo2").src = localStorage.getItem("customLogo2");} else { document.getElementById("customLogo2").src = "./common/images/placeholder.png"; };
						if (localStorage.getItem("customLogo3") != null) {document.getElementById("customLogo3").src = localStorage.getItem("customLogo3");} else { document.getElementById("customLogo3").src = "./common/images/placeholder.png"; };
						}
					if (event.data.clockDisplay =="logoSlideShow-hide") {document.getElementById("logoSlideshowDiv").classList.replace("fadeInElm", "fadeOutElm");};
					if (event.data.clockDisplay =="style100") { styleChange(1); };
					if (event.data.clockDisplay =="style125") { styleChange(2); };	
					if (event.data.clockDisplay =="style150") { styleChange(3); };
				} 
			}   
			
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
//							autostart stuff
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			if (localStorage.getItem("customLogo1") != null) {document.getElementById("customLogo1").src = localStorage.getItem("customLogo1");} else { document.getElementById("customLogo1").src = "./common/images/placeholder.png"; };
			if (localStorage.getItem("customLogo2") != null) {document.getElementById("customLogo2").src = localStorage.getItem("customLogo2");} else { document.getElementById("customLogo2").src = "./common/images/placeholder.png"; };
			if (localStorage.getItem("customLogo3") != null) {document.getElementById("customLogo3").src = localStorage.getItem("customLogo3");} else { document.getElementById("customLogo3").src = "./common/images/placeholder.png"; };
			if (localStorage.getItem("slideShow")  == "yes") { 
				document.getElementById("logoSlideshowDiv").classList.replace("fadeOutElm", "fadeInElm");
				document.getElementById("logoSlideshowDiv").classList.replace("fadeOutElm", "fadeInElm");
				document.getElementById("g4Logo").classList.replace("fadeOutElm", "logoSlide");
				document.getElementById("g4Logo").classList.add("fade");
				}
			if (localStorage.getItem("customLogo0") !== null) {
			document.getElementById("g4Logo").src = localStorage.getItem("customLogo0");
			}
	
			if  (localStorage.getItem("p1ScoreCtrlPanel") !== null) {
			document.getElementById("player1Score").innerHTML = localStorage.getItem("p1ScoreCtrlPanel");
			} else {
			document.getElementById("player1Score").innerHTML = 0;
			}

			if  (localStorage.getItem("p2ScoreCtrlPanel") !== null) {
			document.getElementById("player2Score").innerHTML = localStorage.getItem("p2ScoreCtrlPanel");
			} else {
			document.getElementById("player2Score").innerHTML = 0;
			}

			if (localStorage.getItem("wagerInfo") !== ""){
			document.getElementById("wagerInfo").classList.remove("noShow");
			}
	
			if (localStorage.getItem("raceInfo") !== ""){
			document.getElementById("raceInfo").classList.remove("noShow");
			}
		
			document.getElementById("player1Name").innerHTML = localStorage.getItem("p1NameCtrlPanel");
			document.getElementById("raceInfo").innerHTML = localStorage.getItem("raceInfo");
			document.getElementById("player2Name").innerHTML = localStorage.getItem("p2NameCtrlPanel");			
			document.getElementById("wagerInfo").innerHTML = localStorage.getItem("wagerInfo");			
			document.getElementById("raceInfo").innerHTML = localStorage.getItem("raceInfo");			
	
			if (localStorage.getItem("useCustomLogo") == "yes") {
				document.getElementById("g4Logo").classList.replace("fadeOutElm","fadeInElm");			
			}
			if (localStorage.getItem("useSalotto") == "yes") {
				document.getElementById("salottoLogo").classList.replace("fadeOutElm","fadeInElm");		
			}
			if (localStorage.getItem("useClock") !== "yes") {
				document.getElementById("p1ExtIcon").classList.replace("fadeInElm","fadeOutElm");	
				document.getElementById("p2ExtIcon").classList.replace("fadeInElm","fadeOutElm");			
			}
	
			if (localStorage.getItem('p1colorSet') !== "") {
				document.getElementById("player1Name").style.background = "linear-gradient(to left, white , "+localStorage.getItem('p1colorSet');
				console.log("p1color: "+localStorage.getItem('p1colorSet'));
			}
			if (localStorage.getItem('p2colorSet') !== "") {
				document.getElementById("player2Name").style.background = "linear-gradient(to right, white , "+localStorage.getItem('p2colorSet');
				console.log("p2color: "+localStorage.getItem('p2colorSet'));
			}
	
			if (localStorage.getItem("b_style") != null) {
			styleChange(localStorage.getItem("b_style"));
			}else{
				document.styleSheets[0].disabled = true;
				document.styleSheets[1].disabled = false;
				document.styleSheets[2].disabled = true;
			}
						
			if (localStorage.getItem("customLogo1") != null) {
			document.getElementById("customLogo1").src = localStorage.getItem("customLogo1");
			document.getElementById("customLogo2").src = localStorage.getItem("customLogo2");
			document.getElementById("customLogo3").src = localStorage.getItem("customLogo3");
			}
			
			let slideIndex = 0;
			showSlides();
