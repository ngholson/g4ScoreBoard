# g4ScoreBoard
g4ScoreBoard for OBS Pool/Billiard Streamers. 
```
G4ScoreBoard addon for OBS Copyright 2022 Norman Gholson IV
https://g4billiards.com http://www.g4creations.com

this is a purely javascript/html/css driven pool scoreboard system for OBS Studio

Salotto logo is the copyright of Salotto and is used with their permission.
for more information about Salotto please visit https://salotto.app
```
-------------------------------------------------------------

## Extract zip file to the folder of your choice.<br>

```
Zip contents:

[images]
   |-salotto.png
   |-g4logo.png
   |-logo.png
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

## Configure OBS: 
```
1. click on the Docks Menu from the top menu bar.
2. Select "Custom Browser Docks".
3. type a name (G4ScoreBoard) in the "Dock Name" box.
4. input the full path to "control_panel.html" in the URL box. 
   (example: "c:\users\yourname\desktop\g4scoreboard\control_panel.html")
5. Click "Close"
6. Select the scene you want the scoreboard to display.
7. Add a "Browser Source" -> "Create New" -> give it a name. click OK.
8. Input the full path to "browser_source.html" in the URL box.
   (example: "c:\users\yourname\desktop\g4scoreboard\browser_source.html")
9. Set Width to 1920 and Height to 1080. 
10. click OK. 
```
--------------------------------------------------------------

## Notes on use:  
(in no particular order, my brain is all over the place right now)
```
1. The race info and wager info boxes will disappear if text box is left blank when updating match info.
   (behavior is by design. if you wish to have the panels display empty,
   type "&nbsp;" (without the quotes) in the text box.)
2. The shot clock will auto display in the stream starting at 10s remaining.
3. Once a player strokes the ball click Stop Clock and then start a new 30s timer for the next shot or
   the incoming player.
4. Audible alerts will sound starting at 5s remaining. 
   (these only play locally unless picked up by microphone).
5. Players get 1 30s extension per rack. if accidently clicked you can use the P1/P2 ext reset buttons. 
6. When a player score is recorded the shot clock will stop and the player extensions are reset. 
7. Clock will display in the control_panel in obs when Shot clock is started. 
```	
---------------------------------------------------------------

## Special background colors
If you need a specific color for the background (such as green) open the "browser_source.html" <br>
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

## Shot Clock
If you are not familiar with the use of a shot clock in pool.
```
A shot clock is used in most professional 9 ball tournaments. shot clock play is as follows:

	1. first shot after break is a 60s shot. 
	2. if player elects to "push" the incoming player gets 60s. 
	   if player chooses to give it back to the original shooter, 
	   then that shot it is a 30s shot. 
	3. all shots thereafter are 30s shots.
	4. each player/team gets 1 30s extension per rack. 
```	   

---------------------------------------------------------------

## Add your own Logo - NEW v1.5.7!!
```
Simply click on the "Upload Custom Logo" button and choose your image.
For best results image size should be 2267 x 653
Max file size 2.4 MB 

```
