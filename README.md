# g4ScoreBoard
g4ScoreBoard for OBS Pool/Billiard Streamers. 

G4ScoreBoard v1.5
copyright 2022 Norman Gholson IV


8/28/2022 - COMING SOON! ADD YOUR OWN CUSTOM LOGO!! 

-------------------------------------------------------------

Extract zip file to the folder of your choice.<br>
Zip contents:
```
[images]
   |-salotto.png
   |-g4logo.png
   |_template.psd

[sound]
   |-beep2.mp3
   |_buzz.mp3
   
browser_source.html   
control_panel.html
README.md
LICENSE

```
--------------------------------------------------------------

in OBS: 
```
1. click on the Docks Menu from the top menu bar.
2. Select "Custom Browser Docks".
3. type a name (G4ScoreBoard) in the "Dock Name" box.
4. input the full path to "control_panel.html" in the URL box. 
   (ex "c:\users\yourname\desktop\g4scoreboard\control_panel.html")
5. Click "Close"
6. Select the scene you want the scoreboard to display.
7. Add a "Browser Source" -> "Create New" -> give it a name. click OK.
8. Input the full path to "browser_source.html" in the URL box.
   (ex "c:\users\yourname\desktop\g4scoreboard\browser_source.html")
9. Set Width to 1920 and Height to 1080. 
10. click OK. 
```
--------------------------------------------------------------

Notes on use:  (in no particular order, my brain is all over the place right now)
```
1. The race info and wager info boxes will disappear if text box is left blank when updating match info.
2. The shot clock will auto display in the stream starting at 10s remaining.
3. Once a player strokes the ball click Stop Clock and then start a new 30s timer for incoming player.
4. Audible alerts will sound starting at 5s remaining. 
   (these only play locally unless picked up by microphone).
5. Players get 1 30s extension per rack. if accidently clicked you can use the P1/P2 ext reset buttons. 
6. When a player score is recorded the shot clock will stop and the player extensions are reset. 
7. Clock will display in the control_panel in obs when Shot clock is started. 
```	
---------------------------------------------------------------

if you need a specific color for the background (such as green) open the "browser_source.html" <br>
with a text editor and remove the comment tags indicated below. 

     browser_source.html
	
	17 <head>
	18
	19   <style>
	20 	body{
	21 	/*      <----------------------------------------remove this.
	22	background: #00FF00;	<------ replace with color of choice.
	23	*/      <----------------------------------------remove this.
	24 	-moz-transform: scale(1.75, 1.75);
	25      zoom: 1.75;
	26      zoom: 175%;
	27      font-family:tahoma;
	28      }
	29



--------------------------------------------------------------

if you are not familiar with the use of a shot clock in pool:
```
a shot clock is used in most professional tournaments where the game is 9 ball 
and sometimes 10 ball. shot clock play is as follows:
	1. first shot after break is a 60s shot. 
	2. if player elects to "push" the incoming player gets 60s. 
	   if he chooses to give it back to the original shooter that shot it is a 30s clock. 
	3. all shots thereafter are 30s shots.
	4. each player/team gets 1 30s extension per rack. 
```	   


---------------------------------------------------------------


COMING SOON! ADD YOUR OWN CUSTOM LOGO!! 
