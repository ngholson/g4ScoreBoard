'use strict';

//  G4ScoreBoard addon for OBS Copyright 2022-2025 Norman Gholson IV
//  https://g4billiards.com http://www.g4creations.com
//  this is a purely javascript/html/css driven scoreboard system for OBS Studio
//  free to use and modify and use as long as this copyright statment remains intact. 
//  Salotto logo is the copyright of Salotto and is used with their permission.
//  for more information about Salotto please visit https://salotto.app


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// functions
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
			
			function bsStyleChange() {
				if (document.getElementById("bsStyle").value == 1) {
				bc.postMessage({clockDisplay:'style100'});
				localStorage.setItem("b_style", 1);

				}
				if (document.getElementById("bsStyle").value == 2) {
				bc.postMessage({clockDisplay:'style125'});
				localStorage.setItem("b_style", 2);

				}
				if (document.getElementById("bsStyle").value == 3) {
				bc.postMessage({clockDisplay:'style150'});
				localStorage.setItem("b_style", 3);

				}
				if (document.getElementById("bsStyle").value == 4) {
				bc.postMessage({clockDisplay:'style200'});
				localStorage.setItem("b_style", 4);

				}
		
			}

			function logoSlideshow() {
				if (document.getElementById("logoSlideshowChk").checked == true) {
					document.getElementById("customLogo").checked = false;
					customLogoSetting_slideshowoff();
					localStorage.setItem("slideShow","yes");
					bc.postMessage({clockDisplay:'logoSlideShow-show'});
					} else {
					bc.postMessage({clockDisplay:'logoSlideShow-hide'});
					localStorage.setItem("slideShow","no");
					}
			}
					
			function logoPost(input,xL) {
				if (input.files && input.files[0]) {
				const imgPath = document.getElementById('FileUploadL'+xL).files[0];
				const reader = new FileReader();
					reader.readAsDataURL(input.files[0]);
					reader.addEventListener("load", function () {
					// convert image file to base64 string and save to localStorage
					try {localStorage.setItem("customLogo"+xL, reader.result);}
					catch(err) { alert("the selected image exceedes the maximium file size");}
					document.getElementById("l"+xL+"Img").src = localStorage.getItem("customLogo"+xL);
					}, false);
					if (document.getElementById("logoSlideshowChk").checked == true) {setTimeout(slideOther, 50); };
					if (xL == 0) { setTimeout(logoOther, 50); };
					if (xL == 4) { setTimeout(logoOther, 50); };
				}
			}
				
			function logoOther() {
				bc.postMessage({clockDisplay:'postLogo'});
			}
			
			function slideOther() {
				bc.postMessage({clockDisplay:'logoSlideShow-show'});
			}
			
			function swapColors() {
				if (localStorage.getItem('p1colorSet') != null){ var p1original = localStorage.getItem('p1colorSet'); } else { var p1original = "white"; }
				if (localStorage.getItem('p2colorSet') != null){ var p2original = localStorage.getItem('p2colorSet'); } else { var p2original = "white"; }				
				setTimeout( function()  { document.getElementById("p1colorDiv").value = p2original; document.getElementById("p2colorDiv").value = p1original; bc.postMessage({player:'1',color:p2original}); bc.postMessage({player:'2',color:p1original}); 
				document.getElementById("p2colorDiv").style.background = p1original; document.getElementById("p1colorDiv").style.background = p2original; localStorage.setItem('p1colorSet', p2original); localStorage.setItem('p2colorSet', p1original);
				document.getElementsByTagName("select")[0].options[0].value = p2original; document.getElementsByTagName("select")[1].options[0].value = p1original;	c1value = p1original; c2value = p2original;
				if (c1value == "orange"  || c1value == "khaki"  || c1value == "tomato" || c1value == "red" || c1value == "orangered" || c1value == "white" || c1value == "orange" || c1value == "lightgreen" || c1value == "lightseagreen")  { document.getElementById("p2colorDiv").style.color= "#000";} else { document.getElementById("p2colorDiv").style.color= "lightgrey";};
				if (c2value == "orange"  || c2value == "khaki"  || c2value == "tomato" || c2value == "red" || c2value == "orangered" || c2value == "white" || c2value == "orange" || c2value == "lightgreen" || c2value == "lightseagreen")  { document.getElementById("p1colorDiv").style.color= "#000";} else { document.getElementById("p1colorDiv").style.color= "lightgrey";};
				} , 100);
			}

			function playerColorChange(player) {
			var cvalue  = document.getElementById("p"+player+"colorDiv").value;
			if (player == 1) {
				playerx  =  player;
				pColormsg = document.getElementById("p"+player+"colorDiv").value;
				bc.postMessage({player:playerx,color:pColormsg});
				document.getElementById("p1colorDiv").style.background = document.getElementById("p"+player+"colorDiv").value;
				if (cvalue == "orange"  || cvalue == "khaki"  || cvalue == "tomato" || cvalue == "red" || cvalue == "orangered" || cvalue == "white" || cvalue == "orange" || cvalue == "lightgreen" || cvalue == "lightseagreen")  { document.getElementById("p1colorDiv").style.color= "#000";} else { document.getElementById("p1colorDiv").style.color= "lightgrey";};
				localStorage.setItem("p1colorSet", document.getElementById("p"+player+"colorDiv").value);
				document.getElementsByTagName("select")[0].options[0].value = cvalue;
				} else {
					playerx  =  player;
					pColormsg = document.getElementById("p"+player+"colorDiv").value;
					bc.postMessage({player:playerx,color:pColormsg});
					document.getElementById("p2colorDiv").style.background = document.getElementById("p"+player+"colorDiv").value;
					if (cvalue == "orange"  || cvalue == "khaki"  || cvalue == "tomato" || cvalue == "red" || cvalue == "orangered" || cvalue == "white" || cvalue == "orange" || cvalue == "lightgreen" || cvalue == "lightseagreen")  { document.getElementById("p2colorDiv").style.color= "#000";} else { document.getElementById("p2colorDiv").style.color= "lightgrey";};
					localStorage.setItem("p2colorSet", document.getElementById("p"+player+"colorDiv").value);
					document.getElementsByTagName("select")[1].options[0].value = cvalue;
				}
			}

			function clockSetting() {
				if (!document.getElementById("useClockSetting").checked) {
						localStorage.setItem("useClock", "no");
						bc.postMessage({clockDisplay:'noClock'});
						document.getElementById("shotClock30").classList.add("noShow");
						document.getElementById("shotClock60").classList.add("noShow");
						document.getElementById("shotClockShow").classList.add("noShow");
						document.getElementById("stopClockDiv").classList.add("noShow");
						document.getElementById("p1extensionBtn").classList.add("noShow");
						document.getElementById("p2extensionBtn").classList.add("noShow");
						document.getElementById("p1ExtReset").classList.add("noShow");
						document.getElementById("p2ExtReset").classList.add("noShow");
						document.getElementById("resetBtn").innerHTML = "Reset Scores";
						if ( localStorage.getItem("useSalotto") != "yes" && localStorage.getItem("useClock") != "yes" && localStorage.getItem("useCustomLogo") != "yes" ) {
						document.getElementById("allCheck").checked = false;
						}
						} else if (document.getElementById("useClockSetting").checked) {
						localStorage.setItem("useClock", "yes");
						bc.postMessage({clockDisplay:'useClock'});
						document.getElementById("shotClock30").classList.remove("noShow");
						document.getElementById("shotClock60").classList.remove("noShow");
						document.getElementById("shotClockShow").classList.remove("noShow");
						document.getElementById("stopClockDiv").classList.remove("noShow");
						document.getElementById("p1extensionBtn").classList.remove("noShow");
						document.getElementById("p2extensionBtn").classList.remove("noShow");
						document.getElementById("p1ExtReset").classList.remove("noShow");
						document.getElementById("p2ExtReset").classList.remove("noShow");
						document.getElementById("resetBtn").innerHTML = "Reset Scores and Extensions";
						if ( localStorage.getItem("useSalotto") == "yes" && localStorage.getItem("useClock") == "yes" && localStorage.getItem("useCustomLogo") == "yes" ) {
						document.getElementById("allCheck").checked = true;
						}
						}	
			}
	
			function clockDisplay(opt3) {
				var optmsg = opt3;
				bc.postMessage({clockDisplay:optmsg});
				if (opt3 == "show") {
					document.getElementById("shotClockShow").innerHTML = "Hide Clock";
					document.getElementById("shotClockShow").setAttribute("onclick", "clockDisplay('hide')");
					document.getElementById("shotClockShow").style.border = "1px solid lime";
				} else if (opt3 == "hide") {
					document.getElementById("shotClockShow").innerHTML = "Show Clock";
					document.getElementById("shotClockShow").setAttribute("onclick", "clockDisplay('show')");
					document.getElementById("shotClockShow").style.border = "none";
				}
			}

            function postNames() {
				if (raceInfoTxt.value == " "){
					raceInfoTxt.value = "&nbsp;";
					}
				if (wagerInfoTxt.value == " "){
					wagerInfoTxt.value = "&nbsp;";
					}
				p1namemsg = document.getElementById("p1Name").value.substring(0, 29);
				p2namemsg = document.getElementById("p2Name").value.substring(0, 29);
                bc.postMessage({player:'1',name:p1namemsg});
				bc.postMessage({player:'2',name:p2namemsg});
				racemsg = document.getElementById("raceInfoTxt").value;
				wagermsg = document.getElementById("wagerInfoTxt").value;
				bc.postMessage({race:racemsg}); 				
				bc.postMessage({wager:wagermsg});
				var p1FirstName = document.getElementById("p1Name").value.split(" ")[0];
				var p2FirstName = document.getElementById("p2Name").value.split(" ")[0];
				if (!p1Name.value == "") {document.getElementById("p1ExtReset").innerHTML = "Reset<br>"+p1FirstName.substring(0, 9)+"'s Ext";} else {document.getElementById("p1ExtReset").innerHTML = "P1 Ext Reset";}
				if (!p2Name.value == "") {document.getElementById("p2ExtReset").innerHTML = "Reset<br>"+p2FirstName.substring(0, 9)+"'s Ext";} else {document.getElementById("p2ExtReset").innerHTML = "P2 Ext Reset";}
				if (!p2Name.value == "") {document.getElementById("p2extensionBtn").innerHTML = p2FirstName.substring(0, 9)+"'s<br>Extension";} else {document.getElementById("p2extensionBtn").innerHTML = "P2 Extension";}
				if (!p1Name.value == "") {document.getElementById("p1extensionBtn").innerHTML = p1FirstName.substring(0, 9)+"'s<br>Extension";} else {document.getElementById("p1extensionBtn").innerHTML = "P1 Extension";}
				if (!p1Name.value == "") {document.getElementById("sendP1Score").innerHTML = p1FirstName.substring(0, 9)+"<br>+"+scoreAmount+" Score"; document.getElementById("sendP1ScoreSub").innerHTML = p1FirstName.substring(0, 9)+"<br>-"+scoreAmount+" Score";} else {document.getElementById("sendP1Score").innerHTML = "P1 +1 Score"; document.getElementById("sendP1ScoreSub").innerHTML = "P1 -1 Score";}
				if (!p2Name.value == "") {document.getElementById("sendP2Score").innerHTML = p2FirstName.substring(0, 9)+"<br>+"+scoreAmount+" Score"; document.getElementById("sendP2ScoreSub").innerHTML = p2FirstName.substring(0, 9)+"<br>-"+scoreAmount+" Score";} else {document.getElementById("sendP2Score").innerHTML = "P2 +1 Score"; document.getElementById("sendP2ScoreSub").innerHTML = "P2 -1 Score";}
				localStorage.setItem("p1NameCtrlPanel", p1Name.value);
				localStorage.setItem("p2NameCtrlPanel", p2Name.value);
				localStorage.setItem("raceInfo", raceInfoTxt.value);
				localStorage.setItem("wagerInfo", wagerInfoTxt.value);
			}
			            
            function postScore(opt1,player) {
				if(player == "1"){
				if (opt1 == "add") {
					p1ScoreValue = p1ScoreValue +++ Number(scoreAmount);
					msg={player: player , score: p1ScoreValue };
					bc.postMessage(msg);
					localStorage.setItem("p"+player+"ScoreCtrlPanel", p1ScoreValue);
					stopClock();
					document.getElementById("sendP"+player+"Score").style.border ="1px solid lightgreen";
					setTimeout(rst_scr_btn, 100);
					resetExt('p1','noflash');
					resetExt('p2','noflash');
					} else {
						if (p1ScoreValue > 0) {
							p1ScoreValue = p1ScoreValue --- Number(scoreAmount);
							msg={player: player , score: p1ScoreValue };
							bc.postMessage(msg);
							localStorage.setItem("p"+player+"ScoreCtrlPanel", p1ScoreValue);
							document.getElementById("sendP"+player+"ScoreSub").style.border ="1px solid tomato";
							setTimeout(rst_scr_btn, 100);
						} 
					}
				}
				if(player == "2"){
					if (opt1 == "add") {
					p2ScoreValue = p2ScoreValue +++ Number(scoreAmount);
					msg2={player: player , score: p2ScoreValue };
					bc.postMessage(msg2);
					localStorage.setItem("p"+player+"ScoreCtrlPanel", p2ScoreValue);
					stopClock();
					document.getElementById("sendP"+player+"Score").style.border ="1px solid lightgreen";
					setTimeout(rst_scr_btn, 100);
					resetExt('p1','noflash');
					resetExt('p2','noflash');
					} else {
						if (p2ScoreValue > 0) {
							p2ScoreValue = p2ScoreValue --- Number(scoreAmount);
							msg2={player: player , score: p2ScoreValue };
							bc.postMessage(msg2);
							localStorage.setItem("p"+player+"ScoreCtrlPanel", p2ScoreValue);
							document.getElementById("sendP"+player+"ScoreSub").style.border ="1px solid tomato";
							setTimeout(rst_scr_btn, 100);
						}	 
					}
				 }
				}
		
            function rst_scr_btn() {
				document.getElementById("sendP1Score").style.border ="none";
				document.getElementById("sendP2Score").style.border ="none";
				document.getElementById("sendP1ScoreSub").style.border ="none";
				document.getElementById("sendP2ScoreSub").style.border ="none";
				document.getElementById("p1ExtReset").style.border = "none";
				document.getElementById("p2ExtReset").style.border = "none";
				document.getElementById('settingsBox2').style.border = "none";
				document.getElementById('settingsBox4').style.border = "none";
				document.getElementById('logoSsImg1').style.border = "none";
				document.getElementById('logoSsImg2').style.border = "none";
				document.getElementById('logoSsImg3').style.border = "none";
			}
			
			function shotClock(timex) {
				timerIsRunning = true;
				var stime = timex;
				bc.postMessage({time:stime});
				if  (timex  == 31000) { document.getElementById("shotClock30").style.border = "1px solid lime"; } else { document.getElementById("shotClock60").style.border = "1px solid lime"; };
				document.getElementById("shotClock30").setAttribute("onclick", "");
				document.getElementById("shotClock60").setAttribute("onclick", "");
				document.getElementById("shotClock30").classList.add("clkd");
				document.getElementById("shotClock60").classList.add("clkd");
				document.getElementById("stopClockDiv").classList.replace("obs28", "blue28");
				document.getElementById("stopClockDiv").classList.remove("hover");
				
			}
			
			function stopClock() {
				bc.postMessage({clockDisplay:'stopClock'});
				timerIsRunning = false;
				document.getElementById("shotClock30").style.border = "none";
				document.getElementById("shotClock60").style.border = "none";
				document.getElementById("clockLocalDisplay").style.background = "green";
				document.getElementById("shotClock30").setAttribute("onclick", "shotClock(31000)");
				document.getElementById("shotClock60").setAttribute("onclick", "shotClock(61000)");
				document.getElementById("clockLocalDisplay").innerHTML = "";
				document.getElementById("clockLocalDisplay").style.background = "none";
				clockDisplay("hide");
				document.getElementById("clockLocalDisplay").style.color = "black";
				if (localStorage.getItem("obsTheme") == "light") {
				document.getElementById("shotClock30").classList.remove("clkd");
				document.getElementById("shotClock60").classList.remove("clkd");
				} else {
				document.getElementById("shotClock30").classList.remove("clkd");
				document.getElementById("shotClock60").classList.remove("clkd");
				}
				document.getElementById("stopClockDiv").classList.replace("blue28", "obs28");
				document.getElementById("stopClockDiv").classList.add("hover");
				setTimeout(rst_scr_btn, 100);
			}
			
			function resetScore() {
				if (confirm("Click OK to confirm score reset")) {
				p1ScoreValue = 0;
				p2ScoreValue = 0;
				localStorage.setItem("p1ScoreCtrlPanel", 0);
				localStorage.setItem("p2ScoreCtrlPanel", 0);
				bc.postMessage({player:'1',score:'0'});   
				bc.postMessage({player:'2',score:'0'});   
				resetExt('p1','noflash');
				resetExt('p2','noflash');		
				} else { }
			}	

			function add30(player) { 
					var playermsgx = player;
					bc.postMessage({clockDisplay:playermsgx +'extension'});
					document.getElementById(player+"extensionBtn").setAttribute("onclick", "");
					document.getElementById(player+"extensionBtn").classList.add("clkd"); 
					document.getElementById(player+"extensionBtn").style.border = "1px solid red";
					if (document.getElementById("shotClockShow").innerHTML == "Hide Clock") {
						clockDisplay("show");
					} else {
					clockDisplay("hide");
					}
			}

			function resetExt(player,flash) {
				var playermsgx = player;
				bc.postMessage({clockDisplay:playermsgx +'ExtReset'});
				document.getElementById(player+"extensionBtn").setAttribute("onclick", "add30('"+player+"')");
				document.getElementById(player+"extensionBtn").style.border = "none";
				document.getElementById(player+"extensionBtn").classList.remove("clkd");
				if (flash != "noflash") {
				document.getElementById(player+"ExtReset").style.border = "1px solid blue";
				setTimeout(rst_scr_btn, 100); };
			}

			function salottoSetting() {
				if (!document.getElementById("useSalottoSetting").checked) {
				bc.postMessage({clockDisplay:'hidesalotto'});
				localStorage.setItem("useSalotto", "no");
				if ( localStorage.getItem("useSalotto") != "yes" && localStorage.getItem("useClock") != "yes" && localStorage.getItem("useCustomLogo") != "yes" ) {	document.getElementById("allCheck").checked = false;}
				} else {
				bc.postMessage({clockDisplay:'showsalotto'});
				localStorage.setItem("useSalotto", "yes");
				if ( localStorage.getItem("useSalotto") == "yes" && localStorage.getItem("useClock") == "yes" && localStorage.getItem("useCustomLogo") == "yes" ) {	document.getElementById("allCheck").checked = true;}
				}
			}
			
			function customLogoSetting_slideshowoff() {
				if (!document.getElementById("customLogo").checked) {
				bc.postMessage({clockDisplay:'hidecustomLogo'});
				localStorage.setItem("useCustomLogo", "no");
				if ( localStorage.getItem("useSalotto") != "yes" && localStorage.getItem("useClock") != "yes" && localStorage.getItem("useCustomLogo") != "yes" ) {	document.getElementById("allCheck").checked = false;}
				} else {
				bc.postMessage({clockDisplay:'showcustomLogo'});
				localStorage.setItem("useCustomLogo", "yes");
				if ( localStorage.getItem("useSalotto") == "yes" && localStorage.getItem("useClock") == "yes" && localStorage.getItem("useCustomLogo") == "yes" ) {	document.getElementById("allCheck").checked = true;	}
				}
			}
			
			function customLogoSetting() {
				if (!document.getElementById("customLogo").checked) {
				bc.postMessage({clockDisplay:'hidecustomLogo'});
				localStorage.setItem("useCustomLogo", "no");
				if ( localStorage.getItem("useSalotto") != "yes" && localStorage.getItem("useClock") != "yes" && localStorage.getItem("useCustomLogo") != "yes" ) {	document.getElementById("allCheck").checked = false;}
				} else {
				bc.postMessage({clockDisplay:'showcustomLogo'});
				localStorage.setItem("useCustomLogo", "yes");
				document.getElementById("logoSlideshowChk").checked = false;
				logoSlideshow();
				if ( localStorage.getItem("useSalotto") == "yes" && localStorage.getItem("useClock") == "yes" && localStorage.getItem("useCustomLogo") == "yes" ) {	document.getElementById("allCheck").checked = true;	}
				}
			}
				
			function allCheck() {
				if (!document.getElementById("allCheck").checked) {
				document.getElementById("useClockSetting").checked =  true; 
				document.getElementById("useSalottoSetting").checked =  true; 
				document.getElementById("customLogo").checked =  true; 
				document.getElementById("useClockSetting").click(); 
				document.getElementById("useSalottoSetting").click(); 
				document.getElementById("customLogo").click(); 
				} 
				else { 
				document.getElementById("useClockSetting").checked =  false; 
				document.getElementById("useSalottoSetting").checked =  false; 
				document.getElementById("customLogo").checked =  false; 
				document.getElementById("useClockSetting").click(); 
				document.getElementById("useSalottoSetting").click(); 
				document.getElementById("customLogo").click(); 
				}				
					
			}			
		
			function obsThemeChange() {
				if (document.getElementById("obsTheme").value ==  "28") {
					localStorage.setItem("obsTheme", "28"); 
					document.getElementById("obsTheme").value =  "28";
					document.getElementsByTagName("body")[0].style.background = "#2b2e38";
					document.styleSheets[0].disabled = false;
					document.styleSheets[1].disabled = true;
					document.styleSheets[2].disabled = true;
					document.styleSheets[3].disabled = true;
					document.styleSheets[4].disabled = true;
					document.styleSheets[5].disabled = true;

				}
				if (document.getElementById("obsTheme").value ==  "27") {
					localStorage.setItem("obsTheme", "27"); 
					document.getElementById("obsTheme").value =  "27";
					document.getElementsByTagName("body")[0].style.background = "#1f1e1f";
					document.styleSheets[0].disabled = true;
					document.styleSheets[1].disabled = false;
					document.styleSheets[2].disabled = true;
					document.styleSheets[3].disabled = true;
					document.styleSheets[4].disabled = true;
					document.styleSheets[5].disabled = true;
				}
				if (document.getElementById("obsTheme").value ==  "acri") {
					localStorage.setItem("obsTheme", "acri"); 
					document.getElementById("obsTheme").value =  "acri";
					document.getElementsByTagName("body")[0].style.background = "#181819";
					document.styleSheets[0].disabled = true;
					document.styleSheets[1].disabled = true;
					document.styleSheets[2].disabled = false;
					document.styleSheets[3].disabled = true;
					document.styleSheets[4].disabled = true;
					document.styleSheets[5].disabled = true;
				}
				if (document.getElementById("obsTheme").value ==  "grey") {
					localStorage.setItem("obsTheme", "grey"); 
					document.getElementById("obsTheme").value =  "grey";
					document.getElementsByTagName("body")[0].style.background = "#2f2f2f";
					document.styleSheets[0].disabled = true;
					document.styleSheets[1].disabled = true;
					document.styleSheets[2].disabled = true;
					document.styleSheets[3].disabled = false;
					document.styleSheets[4].disabled = true;
					document.styleSheets[5].disabled = true;
				}
				if (document.getElementById("obsTheme").value ==  "light") {
					localStorage.setItem("obsTheme", "light"); 
					document.getElementById("obsTheme").value =  "light";
					document.getElementsByTagName("body")[0].style.background = "#e5e5e5";
					document.styleSheets[0].disabled = true;
					document.styleSheets[1].disabled = true;
					document.styleSheets[2].disabled = true;
					document.styleSheets[3].disabled = true;
					document.styleSheets[4].disabled = false;
					document.styleSheets[5].disabled = true;
				}
				if (document.getElementById("obsTheme").value ==  "rachni") {
					localStorage.setItem("obsTheme", "rachni"); 
					document.getElementById("obsTheme").value =  "rachni";
					document.getElementsByTagName("body")[0].style.background = "#232629";
					document.styleSheets[0].disabled = true;
					document.styleSheets[1].disabled = true;
					document.styleSheets[2].disabled = true;
					document.styleSheets[3].disabled = true;
					document.styleSheets[4].disabled = true;
					document.styleSheets[5].disabled = false;
					}
			}
			
			function startThemeCheck() {
					if (localStorage.getItem("obsTheme") == null) { localStorage.setItem("obsTheme", "28"); document.getElementById("obsTheme").value =  "28";  };
					if (localStorage.getItem("obsTheme") == "28") {
						document.getElementById("obsTheme").value =  "28";
						document.getElementsByTagName("body")[0].style.background = "#2b2e38";
						document.styleSheets[0].disabled = false;
						document.styleSheets[1].disabled = true;
						document.styleSheets[2].disabled = true;
						document.styleSheets[3].disabled = true;
						document.styleSheets[4].disabled = true;
						document.styleSheets[5].disabled = true;
					}
					if (localStorage.getItem("obsTheme") == "27") {
						document.getElementById("obsTheme").value =  "27";
						document.getElementsByTagName("body")[0].style.background = "#1f1e1f";
						document.styleSheets[0].disabled = true;
						document.styleSheets[1].disabled = false;
						document.styleSheets[2].disabled = true;
						document.styleSheets[3].disabled = true;
						document.styleSheets[4].disabled = true;
						document.styleSheets[5].disabled = true;
					}
					if (localStorage.getItem("obsTheme") == "acri") {
						document.getElementById("obsTheme").value =  "acri";
						document.getElementsByTagName("body")[0].style.background = "#181819";
						document.styleSheets[0].disabled = true;
						document.styleSheets[1].disabled = true;
						document.styleSheets[2].disabled = false;
						document.styleSheets[3].disabled = true;
						document.styleSheets[4].disabled = true;
						document.styleSheets[5].disabled = true;
					}
					if (localStorage.getItem("obsTheme") == "grey") {
						document.getElementById("obsTheme").value =  "grey";
						document.getElementsByTagName("body")[0].style.background = "#2f2f2f";
						document.styleSheets[0].disabled = true;
						document.styleSheets[1].disabled = true;
						document.styleSheets[2].disabled = true;
						document.styleSheets[3].disabled = false;
						document.styleSheets[4].disabled = true;
						document.styleSheets[5].disabled = true;
					}
					if (localStorage.getItem("obsTheme") == "light") {
						document.getElementById("obsTheme").value =  "light";
						document.getElementsByTagName("body")[0].style.background = "#e5e5e5";
						document.styleSheets[0].disabled = true;
						document.styleSheets[1].disabled = true;
						document.styleSheets[2].disabled = true;
						document.styleSheets[3].disabled = true;
						document.styleSheets[4].disabled = false;
						document.styleSheets[5].disabled = true;
					}
					if (localStorage.getItem("obsTheme") == "rachni") {
						document.getElementById("obsTheme").value =  "rachni";
						document.getElementsByTagName("body")[0].style.background = "#232629";
						document.styleSheets[0].disabled = true;
						document.styleSheets[1].disabled = true;
						document.styleSheets[2].disabled = true;
						document.styleSheets[3].disabled = true;
						document.styleSheets[4].disabled = true;
						document.styleSheets[5].disabled = false;
					}
			}
			
			function cLogoNameChange() {
				cLogoName = prompt("Rename Custom Logo Checkbox Label");
				if (cLogoName != null && cLogoName != "") {
				localStorage.setItem("clogoNameStored", cLogoName.substring(0, 13));
				document.getElementById("logoName").innerHTML = cLogoName.substring(0, 13);
				}
			}
			function pointValue() {
				scoreAmount = document.getElementById("scoreValue").value;
				console.log(scoreAmount);
				postNames();
			}

			function salLogoNameChange() {
				salLogoName = prompt("Rename Salotto Logo Checkbox Label");
				if (salLogoName != null && salLogoName != "") {
				localStorage.setItem("sallogoNameStored", salLogoName.substring(0, 13));
				document.getElementById("salllogoName").innerHTML = salLogoName.substring(0, 13);
				}
			}



function checkForUpdate() {
    const updateStatus = document.getElementById('updateStatus');
    updateStatus.textContent = "Checking";
    
    fetch('https://api.github.com/repos/ngholson/g4Scoreboard/releases/latest')
        .then(response => {
            if (!response.ok) {
                throw new Error(`GitHub API request failed: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const latestVersion = data.tag_name.replace(/^v/, '');
            if (compareVers(latestVersion, versionNum) > 0) {
                updateStatus.innerHTML = `<a color="grey" href="${data.html_url}" target="_blank" rel="noopener noreferrer nohighlight">Download Update</a>`;
            } else {
                updateStatus.textContent = "g4ScoreBoard is up to date";
            }
        })
        .catch(error => {
            updateStatus.textContent = "Error checking for updates. Please try again later.";
            console.error("Update check failed:", error);
        });
}

function compareVers(v1, v2) {
    const parts1 = v1.split('.').map(Number);
   const parts2 = v2.split('.').map(Number);
    
    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
        const part1 = parts1[i] || 0;
        const part2 = parts2[i] || 0;
        if (part1 > part2) return 1;
        if (part1 < part2) return -1;
    }
    return 0;
}