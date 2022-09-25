'use strict';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// variable declarations
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	var cLogoName = "Custom";  // 13 character limit. it will auto trim to 13 characters.
	const bc = new BroadcastChannel('g4-main');
	const bcr = new BroadcastChannel('g4-recv'); // return channel from browser_source 
	var hotkeyP1ScoreUp;
	var hotkeyP1ScoreDown;
	var hotkeyP2ScoreUp;
	var hotkeyP2ScoreDown;
	var hotkeyScoreReset;
	var hotkeyP1Extension;
	var hotkeyP2Extension;
	var hotkey30Clock;
	var hotkey60Clock;
	var hotkeyStopClock;
	var hotkeySwap;
	var hotkeyP1ScoreUpOld = hotkeyP1ScoreUp;
	var hotkeyP2ScoreUpOld = hotkeyP2ScoreUp;
	var hotkeyP1ScoreDownOld = hotkeyP1ScoreDown;
	var hotkeyP2ScoreDownOld = hotkeyP2ScoreDown;
	var hotkeyScoreResetOld = hotkeyScoreReset;
	var hotkeyP1ExtensionOld = hotkeyP1Extension;
	var hotkeyP2ExtensionOld = hotkeyP2Extension;
	var hotkey30ClockOld = hotkey30Clock;
	var hotkey60ClockOld = hotkey60Clock;
	var hotkeyStopClockOld = hotkeyStopClock;
	var hotkeySwapOld = hotkeySwap;
	var tev;
	var p1ScoreValue;
	var p2ScoreValue;
	var warningBeep = new Audio("./common/sound/beep2.mp3");
	var foulSound = new Audio("./common/sound/buzz.mp3");
	var timerIsRunning;
	var msg;
	var msg2;
	var racemsg;
	var wagermsg;
	var slider = document.getElementById("myRange");
	var sliderValue;
	var countDownTime;
	var shotClockxr = null;
	var playerNumber;
	var p1namemsg;
	var p2namemsg;
	var playerx;
	var c1value;
	var c2value;
	var pColormsg;

					
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// onload stuff
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	slider.oninput = function() {
			sliderValue = this.value/100;
			bc.postMessage({opacity:sliderValue});
			}

	document.getElementById('settingsBox2').onclick = function() { 
			document.getElementById('settingsBox2').style.border = "1px solid blue";
			document.getElementById('FileUploadL0').click();
			setTimeout(rst_scr_btn,100);
			};
			
		document.getElementById('logoSsImg1').onclick = function() { 
			document.getElementById('logoSsImg1').style.border = "1px solid blue";
			document.getElementById('FileUploadL1').click();
			setTimeout(rst_scr_btn,100);
			};	
		
		document.getElementById('logoSsImg2').onclick = function() { 
			document.getElementById('logoSsImg2').style.border = "1px solid blue";
			document.getElementById('FileUploadL2').click();
			setTimeout(rst_scr_btn,100);
			};				
			
		document.getElementById('logoSsImg3').onclick = function() { 
			document.getElementById('logoSsImg3').style.border = "1px solid blue";
			document.getElementById('FileUploadL3').click();
			setTimeout(rst_scr_btn,100);
			};

	if ( localStorage.getItem("useSalotto") != "yes" && localStorage.getItem("useClock") != "yes" && localStorage.getItem("useCustomLogo") != "yes" ) {
		document.getElementById("allCheck").checked = false;
		}

	if (localStorage.getItem('p1colorSet') !== null) {
		var cvalue = localStorage.getItem('p1colorSet');
		document.getElementById('p1colorDiv').style.background = localStorage.getItem('p1colorSet');
		document.getElementsByTagName("select")[0].options[0].value = cvalue;
		if (cvalue == "orange"  || cvalue == "khaki"  || cvalue == "tomato" || cvalue == "red" || cvalue == "white" || cvalue == "orangered" || cvalue == "orange" || cvalue == "lightgreen" || cvalue == "lightseagreen")  { document.getElementById("p1colorDiv").style.color= "#000";} else { document.getElementById("p1colorDiv").style.color= "lightgrey";};

	}

	if (localStorage.getItem('p2colorSet') !== null) {
		var cvalue = localStorage.getItem('p2colorSet');
		document.getElementById('p2colorDiv').style.background = localStorage.getItem('p2colorSet');
		if (cvalue == "orange"  || cvalue == "khaki"  || cvalue == "tomato" || cvalue == "red" || cvalue == "orangered" || cvalue == "white" || cvalue == "orange" || cvalue == "lightgreen" || cvalue == "lightseagreen")  { document.getElementById("p2colorDiv").style.color= "#000";} else { document.getElementById("p2colorDiv").style.color= "lightgrey";};

	}

	if (localStorage.getItem('p1ScoreCtrlPanel') > 0 || localStorage.getItem('p1ScoreCtrlPanel') == "" ) {
		p1ScoreValue = localStorage.getItem('p1ScoreCtrlPanel');
		msg = { player:'1', score:p1ScoreValue };
		bc.postMessage(msg);
		} else {
		p1ScoreValue = 0;
		msg = { player:'1', score:p1ScoreValue };
		bc.postMessage(msg);
		}

	if (localStorage.getItem('p2ScoreCtrlPanel') > 0 || localStorage.getItem('p2ScoreCtrlPanel') == "" ) {
		p2ScoreValue = localStorage.getItem('p2ScoreCtrlPanel');
		msg = { player:'2', score:p2ScoreValue };
		bc.postMessage(msg);
		} else {
		p2ScoreValue = 0;
		msg = { player:'2', score:p2ScoreValue };
		bc.postMessage(msg);
		}

	if (localStorage.getItem("useSalotto") == "yes") {
			console.log("salotto = TRUE");
			document.getElementById("useSalottoSetting").checked = true;
			salottoSetting();
				} 	else {
				salottoSetting()
				}

	if (localStorage.getItem("useCustomLogo") == "yes") {
			console.log("customLogo = TRUE");
			document.getElementById("customLogo").checked = true;
			customLogoSetting();
			} else {
				customLogoSetting()
				}			

	if (localStorage.getItem("useClock") == "yes") {
			console.log("Clock = TRUE");
			document.getElementById("useClockSetting").checked = true;
			clockSetting();
				} else {
					document.getElementById("useSalottoSetting").checked = false;
					document.getElementById("useSalottoSetting").removeAttribute("checked");
					clockSetting()
					}			

	if (localStorage.getItem("customLogo1") != null) {document.getElementById("l1Img").src = localStorage.getItem("customLogo1");} else { document.getElementById("l1Img").src = "./common/images/placeholder.png"; };
	if (localStorage.getItem("customLogo2") != null) {document.getElementById("l2Img").src = localStorage.getItem("customLogo2");} else { document.getElementById("l2Img").src = "./common/images/placeholder.png"; };
	if (localStorage.getItem("customLogo3") != null) {document.getElementById("l3Img").src = localStorage.getItem("customLogo3");} else { document.getElementById("l3Img").src = "./common/images/placeholder.png"; };
	if (localStorage.getItem("customLogo0") != null) {document.getElementById("l0Img").src = localStorage.getItem("customLogo0");} else { document.getElementById("l0Img").src = "./common/images/placeholder.png"; };
	if (localStorage.getItem("slideShow") == "yes") { document.getElementById("logoSlideshowChk").checked = true; logoSlideshow(); };
	if (localStorage.getItem("obsTheme") == "28") { document.getElementById("obsTheme").value = "28"; }
	if (localStorage.getItem("b_style") == "1") { document.getElementById("bsStyle").value = "1"; }
	if (localStorage.getItem("b_style") == "2") { document.getElementById("bsStyle").value = "2"; }
	if (localStorage.getItem("b_style") == "3") { document.getElementById("bsStyle").value = "3"; }
	if (localStorage.getItem("clogoNameStored") != null) { cLogoName = localStorage.getItem("clogoNameStored"); }	
	document.getElementById("logoName").innerHTML = cLogoName.substring(0, 13);
	document.getElementById("p1Name").value = localStorage.getItem("p1NameCtrlPanel");
	document.getElementById("p2Name").value = localStorage.getItem("p2NameCtrlPanel");
	document.getElementById("raceInfoTxt").value = localStorage.getItem("raceInfo");
	document.getElementById("wagerInfoTxt").value = localStorage.getItem("wagerInfo");
	document.getElementById("verNum").innerHTML = versionNum;			
	postNames();refreshData();startThemeCheck();
			
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// broadcast channel events from browser_source
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			

	bcr.onmessage = (event) => {
		document.getElementById("clockLocalDisplay").style.background = "green";
		document.getElementById("clockLocalDisplay").innerHTML = event.data + "s";
		tev =  event.data;
		console.log(tev);
		if (tev > 20) {	document.getElementById("clockLocalDisplay").style.color = "white";	};
		if (tev > 5 && tev < 21) { document.getElementById("clockLocalDisplay").style.color = "black"; };
		if (tev < 21) {	document.getElementById("clockLocalDisplay").style.background = "orange"; };
		if (tev < 16) {	document.getElementById("clockLocalDisplay").style.background = "yellow"; };
		if (tev < 11) {	document.getElementById("clockLocalDisplay").style.background = "tomato"; };
		if (tev == 10) {
			document.getElementById("shotClockShow").setAttribute("onclick", "clockDisplay('hide')");
			document.getElementById("shotClockShow").innerHTML = "Hide Clock";
			document.getElementById("shotClockShow").style.border = "1px solid lime";
			}
		if (tev < 6 && tev > 0) {    //tev > 0   this prevents both sounds from playing at 0.
			document.getElementById("clockLocalDisplay").style.background = "red";
			document.getElementById("clockLocalDisplay").style.color = "white";
			warningBeep.loop = false;
			warningBeep.play(); 
		}
		if (tev == 0) {
			foulSound.loop= false;
			foulSound.play();
			setTimeout("stopClock()", 1000);
		}
	}
			