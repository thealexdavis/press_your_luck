var theBoard= document.getElementById("squares");
var boardSquares=theBoard.querySelectorAll("div");
var boardItems=theBoard.querySelectorAll("div.itemsingle");
var boardItemsFade=theBoard.querySelectorAll("div.itemsinglefade");
var boardCenter= document.getElementById("center");
var centerLogo= document.getElementById("center_logo");
var centerFrame= document.getElementById("center_frame");
var frameContent= document.getElementById("frame_content");
var frameContentText= document.getElementById("content_text");
var totalGui= document.getElementById("dollartotal");
var spinsGui= document.getElementById("spinstotal");
var whammiesGui= document.getElementById("totalWhammies");
var infoGui= document.getElementById("info");
var goldBoard= document.getElementById("goldbg");
var blueBoard= document.getElementById("bluebg");
var redBoard= document.getElementById("redbg");
var textDisplay= document.getElementById("text_ribbon");
var textRibbonContent= document.getElementById("ribbon_content");
var scoreCenter = document.getElementById("scorecenter");
logoShow = true;
var toggleVar;
var toggleVarCorner;
var valueStandby = 0;
canStop = false;
introBtns = true;

//INIT SETUP
boardSpinSfx = new Sound("sfx/boardcycle.mp3", 100, true);
boardSpinSfx.start();
boardSpinSfx.stop();
boardSpinSfx.start();
whammySfx = new Sound("sfx/whammy.mp3", 100, true);
var allowClick = false;
var spinVar;
var cycleVar;
var toggleVar;
currentStop = [];
activePrizes = [];
possiblePrizes = [];
usedPrizes = [];
lostPrizes = [];
playerScore = 0;
totalSpins = 5;
prizeCount = 0;
totalWhammies = 0;
roundNum = 1;
currentMult = 0;
activeBoard = royaleBoardOne;
loadPrizes(prizeReserveBonus, activePrizes, 1, activePrizes,null,2);
prizesToBoard(activeBoard, activePrizes);
startOpenScreen();
// startRulesScene();
setTimeout(function(){ 
}, 5000);

function startRulesScene(){
	setTimeout(function(){ 
		textRibbonContent.innerHTML = "<p>You're going to face off against the Whammy over five rounds. At the end of each round you can take whatever money you've made or you can Press Your Luck and play on.</p>";
		textDisplay.className = '';
		textDisplay.className = 'show';
	}, 0);
	setTimeout(function(){ 
		textRibbonContent.className = '';
		textRibbonContent.className = 'show';
	}, 250);
	setTimeout(function(){ 
		textRibbonContent.className = '';
	}, 7000);
	setTimeout(function(){
		textRibbonContent.innerHTML = "";
		textRibbonContent.innerHTML = "<p>The longer you stay in the game, the bigger the money gets...and if you make it to our final round, our Big Bucks Bonanza, one spin can be worth $100,000.</p>";
		textRibbonContent.className = 'show';
	}, 7250);
	setTimeout(function(){ 
		textRibbonContent.className = '';
	}, 15000);
	setTimeout(function(){
		textRibbonContent.innerHTML = "";
		textRibbonContent.innerHTML = "<p>As always there are Whammies out there. If you hit one he takes your bank down to $0. Four Whammies puts you out of the game entirely.</p>";
		textRibbonContent.className = 'show';
	}, 15250);
	setTimeout(function(){ 
		textRibbonContent.className = '';
	}, 22000);
	setTimeout(function(){
		textRibbonContent.innerHTML = "";
		textRibbonContent.innerHTML = "<p>However, if your bank ever reaches $500,000, the game is over...because we are going to bump your winnings up to $1,000,000!</p>";
		textRibbonContent.className = 'show';
	}, 22250);
	setTimeout(function(){
		centerLogo.classList.add("fliptrans");
		centerFrame.classList.add("fliptrans");
		frameContent.classList.add("fliptrans");
		frameContent.classList.add("greenspiralcenter");
		frameContent.classList.add("smaller");
		centerLogo.classList.add("fliphalf");
		var frameText = document.createElement("div");
		frameContent.appendChild(frameText);
		frameText.innerHTML = '<sup>$</sup>1,000,000';
		setTimeout(function(){ 
			centerFrame.classList.add("flipfull");
			frameContent.classList.add("flipfull");
		}, 400);
	}, 23000);
	setTimeout(function(){
		centerFrame.className = '';
		centerFrame.classList.add("fliptrans");
		frameContent.className = '';
		frameContent.classList.add("fliptrans");
		frameContent.classList.add("smaller");
		frameContent.classList.add("greenspiralcenter");
	}, 28000);
	setTimeout(function(){ 
		centerLogo.className = '';
		centerLogo.classList.add("fliptrans");
		frameContent.className = '';
		frameContent.innerHTML = '';
		textRibbonContent.className = '';
		textDisplay.className = '';
	}, 28400);
	setTimeout(function(){ 
		startOpenScreen();
		textRibbonContent.innerHTML = "";
	}, 29000);
}

function startOpenScreen(){
	introBtns = true;
	fillSquare(16, "lightgreen", "intro", 0, 'PLAY GAME', 0, "startgame");
	fillSquare(7, "blue", "intro", 0, 'RULES', 0, "startrules");
}

document.getElementById("startrules").onclick = function(){
	if (introBtns){
		introBtns = false;
		resetBoard();
		startRulesScene();
	}
};

document.getElementById("startgame").onclick = function(){
	if (introBtns){
		introBtns = false;
		resetBoard();
		startRoundOne();
	}
};

function resetBoard(){
	for(var z = 0;z<18;z++){
		boardItems[z].innerHTML = "";
		boardItems[z].className = '';
		boardItems[z].parentNode.removeAttribute("id");
	}
}


function startRoundOne(){
	displayCenterMoney(1);
	setTimeout(function(){ 
		textRibbonContent.innerHTML = "<p>Big Bucks in the first round is worth $10,000!</p>";
		textDisplay.className = '';
		textDisplay.className = 'show';
	}, 1500);
	setTimeout(function(){ 
		textRibbonContent.className = '';
		textRibbonContent.className = 'show';
	}, 1750);
	setTimeout(function(){ 
		textRibbonContent.className = '';
	}, 7000);
	setTimeout(function(){
		textRibbonContent.innerHTML = "";
		textRibbonContent.innerHTML = "<p>You've got to make it through "+totalSpins+" spins in the first round. Good luck!</p>";
		scoreCenter.style.display = "block";
		textRibbonContent.className = 'show';
	}, 7250);
	setTimeout(function(){ 
		spinsGui.innerHTML = totalSpins;
	}, 9000);
	setTimeout(function(){ 
		textRibbonContent.className = '';
		textDisplay.className = '';
	}, 12000);
	setTimeout(function(){ 
		spinTimer();
 	 	cycleTimer(activeBoard);
	 	centerFrame.className = '';
	 	frameContent.className = '';
	 	centerLogo.className = '';
		textRibbonContent.innerHTML = "";
	}, 12500);
	
	setTimeout(function(){ 
/*
 	 	spinTimer();
 	 	cycleTimer(activeBoard);
	 	centerFrame.className = '';
	 	frameContent.className = '';
	 	centerLogo.className = '';
*/
	}, 10000);
}

function displayCenterMoney(rn){
	if (rn == 1){dollarDisplay = '<sup>$</sup>10,000';}
// 	if (rn == 2){dollarDisplay = '<sup>$</sup>15,000';}
	if (rn == 2){dollarDisplay = '<sup>$</sup>25,000';}
	if (rn == 3){dollarDisplay = '<sup>$</sup>50,000';}
	if (rn == 4){dollarDisplay = '<sup>$</sup>75,000';}
	if (rn == 5){dollarDisplay = '<sup>$</sup>100,000';}
	if (rn == 6){dollarDisplay = '<sup>$</sup>1,000,000';}
	if (rn > 6){dollarDisplay = '<sup>$</sup>'+toDollar(playerScore);}
	centerLogo.classList.add("fliptrans");
	centerFrame.classList.add("fliptrans");
	frameContent.classList.add("fliptrans");
	frameContent.classList.add("greenspiralcenter");
	centerLogo.classList.add("fliphalf");
	var frameText = document.createElement("div");
	frameContent.appendChild(frameText);
	if (rn > 5){
		frameText.innerHTML = dollarDisplay;
	} else {
		frameText.innerHTML = '<span class="bb">BIG<br>BUCKS</span>';
	}
	setTimeout(function(){ 
		centerFrame.classList.add("flipfull");
		frameContent.classList.add("flipfull");
	}, 400);
	if (rn < 6){
		setTimeout(function(){ 
			frameContent.classList.add("centerburst");
			frameText.innerHTML = dollarDisplay;
		}, 3000);
		setTimeout(function(){ 
			frameContent.classList.add("removeburst");
		}, 3010);
		setTimeout(function(){ 
			loadSingle(activeBoard,currentStop,1,1);
			centerFrame.className = '';
			centerFrame.classList.add("fliptrans");
			frameContent.className = '';
			frameContent.classList.add("fliptrans");
			frameContent.classList.add("greenspiralcenter");
		}, 4000);
		setTimeout(function(){ 
			centerLogo.className = '';
			centerLogo.classList.add("fliptrans");
			frameContent.className = '';
			frameContent.innerHTML = '';
		}, 4400);
	}
}

function displayCenterPrize(prizeName){
	centerLogo.classList.add("fliptrans");
	centerFrame.classList.add("fliptrans");
	frameContent.classList.add("fliptrans");
	frameContent.classList.add("blue");
	var frameText = document.createElement("h2");
	frameText.appendChild(document.createTextNode(prizeName));
	frameContent.appendChild(frameText);
	setTimeout(function(){
		centerLogo.classList.add("fliphalf");
	}, 0);
	setTimeout(function(){ 
		centerFrame.classList.add("flipfull");
		frameContent.classList.add("flipfull");
	}, 400);
	
	setTimeout(function(){ 
		centerFrame.className = '';
		centerFrame.classList.add("fliptrans");
		frameContent.className = '';
		frameContent.classList.add("fliptrans");
		frameContent.classList.add("blue");
	}, 4000);
	setTimeout(function(){ 
		centerLogo.className = '';
		centerLogo.classList.add("fliptrans");
		frameContent.innerHTML = '';
	}, 4400);
}

document.body.onkeydown = function(e){
	if(e.keyCode == 32){
		if (canStop == true){
			stopBoard();
		}
	}
}

function stopBoard(){
	canStop = false;
	var extras = "";
	var prizeInfo = "";
	boardSpinSfx.stop();
	clearInterval(spinVar);
	clearInterval(cycleVar);
	sI = selectedSquare - 1;
	posStop = activeIndexes[sI];
	if (activeBoard[selectedSquare]['type'][0][posStop] == "bigbucks"){
		extraMsg = "Big Bucks! ";
		selectedSquare = 4;
		sI = selectedSquare - 1;
		posStop = activeIndexes[sI];
		infoGui.value = "Big Bucks! "+toDollar(activeBoard[selectedSquare]['values'][0][posStop])+"! You're up to "+toDollar(playerScore)+". "+totalSpins+" spins left this round. Good luck!";
		setTimeout(function(){ 
			clearAllSquares();
			setSquare(4);
		}, 750);
	}
	if (activeBoard[selectedSquare]['extras'][0][posStop] == "backtwo"){
		extraMsg = "Move two spaces to ";
		var startSquare = selectedSquare;
		selectedSquare = selectedSquare - 2;
		sI = selectedSquare - 1;
		posStop = activeIndexes[sI];
		infoGui.value = "Go back two spaces to "+toDollar(activeBoard[selectedSquare]['values'][0][posStop])+"! You're up to "+toDollar(playerScore)+". "+totalSpins+" spins left this round. Good luck!";
		setTimeout(function(){ 
			clearAllSquares();
			setSquare(startSquare - 1);
		}, 500);
		setTimeout(function(){ 
			clearAllSquares();
			setSquare(startSquare - 2);
		}, 1000);
	}
	if (activeBoard[selectedSquare]['extras'][0][posStop] == "losewhammy"){
		document.getElementById("takemoney").style.display = "block";
		document.getElementById("losewhammy").style.display = "block";
		guiMsg = "Stop at $"+toDollar(activeBoard[selectedSquare]['values'][0][posStop])+" or Lose a Whammy! Which do you want?<p class='btns'><button onclick='loseWhammy(0)' id='takemoney'>$"+toDollar(activeBoard[selectedSquare]['values'][0][posStop])+"</button><button onclick='loseWhammy(1)' id='losewhammy'>Lose a Whammy</button></p>";
		setTimeout(function(){ 
			textRibbonContent.innerHTML = "<p>"+guiMsg+"</p>";
			textDisplay.className = '';
			textDisplay.className = 'show';
		}, 0);
		setTimeout(function(){ 
			textRibbonContent.className = '';
			textRibbonContent.className = 'show';
		}, 250);
	}
	if (activeBoard[selectedSquare]['extras'][0][posStop] == "forwardtwo"){
		extraMsg = "Move two spaces to ";
		var startSquare = selectedSquare;
		selectedSquare = selectedSquare + 2;
		sI = selectedSquare - 1;
		posStop = activeIndexes[sI];
		infoGui.value = "Advance two spaces to "+toDollar(activeBoard[selectedSquare]['values'][0][posStop])+"! You're up to "+toDollar(playerScore)+". "+totalSpins+" spins left this round. Good luck!";
		setTimeout(function(){ 
			clearAllSquares();
			setSquare(startSquare + 1);
		}, 500);
		setTimeout(function(){ 
			clearAllSquares();
			setSquare(startSquare + 2);
		}, 1000);
	}
	if (activeBoard[selectedSquare]['extras'][0][posStop] == "across"){
		extraMsg = "Across the board to ";
		selectedSquare = 8;
		sI = selectedSquare - 1;
		posStop = activeIndexes[sI];
		infoGui.value = "Across the board to "+toDollar(activeBoard[selectedSquare]['values'][0][posStop])+"! You're up to "+toDollar(playerScore)+". "+totalSpins+" spins left this round. Good luck!";
		setTimeout(function(){ 
			clearAllSquares();
			setSquare(8);
		}, 750);
	}
	if (activeBoard[selectedSquare]['type'][0][posStop] == "prize"){
		currentMult = selectedSquare * posStop;
		prizeCount++;
		removePrize(activeBoard[selectedSquare]['text'][0][posStop], roundNum,1);
		prizeInfo = activeBoard[selectedSquare]['text'][0][posStop]+" worth";
	}
	if (activeBoard[selectedSquare]['type'][0][posStop] !== "move" && activeBoard[selectedSquare]['type'][0][posStop] !== "bigbucks"){
		if (activeBoard[selectedSquare]['extras'][0][posStop] !== "plus"){
			totalSpins--;
		} else {
			extras = " plus a spin";
		}
		if (activeBoard[selectedSquare]['type'][0][posStop] == "whammy"){
			whammySfx.start();
			redBoard.className = 'show';
			playerScore = 0;
			if (prizeCount > 0){
				prizeCount = 0;
				lostPrizes = lostPrizes.concat(usedPrizes);
			}
			totalWhammies++;
			if (totalWhammies == 3){
				extras = "  Be careful: one more Whammy and you're out of the game.";
			}
			spinsMsg = "";
 			if (totalSpins >= 1){
		 		spinsMsg = " "+totalSpins+" spins left to take this round. Good luck!";
		 	}
			if (totalWhammies < 4){
				whammyMsg = "Stop...at a Whammy!"+extras+" Back down to $0."+spinsMsg;
			} else {
				whammyMsg = "Stop...at a Whammy!"+extras+" Unfortunately that's your fourth Whammy and your game is over. Thanks for playing Press Your Luck.";
			}
			setTimeout(function(){ 
				textRibbonContent.innerHTML = "<p>"+whammyMsg+"</p>";
				textDisplay.className = '';
				textDisplay.className = 'show';
			}, 0);
			setTimeout(function(){ 
				textRibbonContent.className = '';
				textRibbonContent.className = 'show';
			}, 250);
			setTimeout(function(){ 
				document.getElementById("whammy"+totalWhammies).classList.add("active");
			}, 2000);
			if (totalWhammies < 4 && totalSpins >= 1){
				setTimeout(function(){ 
					textRibbonContent.className = '';
					textDisplay.className = '';
				}, 6000);
				setTimeout(function(){ 
				 	centerFrame.className = '';
				 	frameContent.className = '';
				 	centerLogo.className = '';
					textRibbonContent.innerHTML = "";
				}, 6250);
			}
		} else {
 			playerScore += activeBoard[selectedSquare]['values'][0][posStop];
 			spinsMsg = "";
 			if (totalSpins >= 1){
		 		spinsMsg = totalSpins+" spins left to take this round. Good luck!";
		 	}
 			if (activeBoard[selectedSquare]['type'][0][posStop] == "move"){
	 			if (activeBoard[selectedSquare]['extras'][0][posStop] == "forwardtwo"){
		 			guiMsg = "Move two spaces to "+toDollar(activeBoard[selectedSquare]['values'][0][posStop])+"! You're up to $"+toDollar(playerScore)+". "+spinsMsg;
		 		}
	 			if (activeBoard[selectedSquare]['extras'][0][posStop] == "backtwo"){
		 			guiMsg = "Move two spaces to "+toDollar(activeBoard[selectedSquare]['values'][0][posStop])+"! You're up to $"+toDollar(playerScore)+". "+spinsMsg;
		 		}
		 		if (activeBoard[selectedSquare]['extras'][0][posStop] == "across"){
			 		guiMsg = "Across the board to "+toDollar(activeBoard[selectedSquare]['values'][0][posStop])+"! You're up to $"+toDollar(playerScore)+". "+spinsMsg;
			 	}
			 	if (activeBoard[selectedSquare]['extras'][0][posStop] == "losewhammy"){
					guiMsg = "Stop at "+toDollar(activeBoard[selectedSquare]['values'][0][posStop])+" or Lose a Whammy! Click which option you choose."; 	
				}
	 		} else if (activeBoard[selectedSquare]['type'][0][posStop] == "bigbucks"){
		 		guiMsg = "Big Bucks! $"+toDollar(activeBoard[selectedSquare]['values'][0][posStop])+""+extras+"! You're up to $"+toDollar(playerScore)+". "+spinsMsg;
		 	} else {
	 			guiMsg = extraMsg + "" +prizeInfo+" $"+toDollar(activeBoard[selectedSquare]['values'][0][posStop])+""+extras+"! You're up to $"+toDollar(playerScore)+". "+spinsMsg;
 			}
 			setTimeout(function(){ 
				textRibbonContent.innerHTML = "<p>"+guiMsg+"</p>";
				textDisplay.className = '';
				textDisplay.className = 'show';
			}, 0);
			setTimeout(function(){ 
				textRibbonContent.className = '';
				textRibbonContent.className = 'show';
			}, 250);
			if (totalSpins >= 1 || activeBoard[selectedSquare]['extras'][0][posStop] == "plus"){
				setTimeout(function(){ 
					textRibbonContent.className = '';
					textDisplay.className = '';
				}, 6000);
				setTimeout(function(){ 
				 	centerFrame.className = '';
				 	frameContent.className = '';
				 	centerLogo.className = '';
					textRibbonContent.innerHTML = "";
				}, 6250);
			}
			
		}
		if (playerScore < 500000){
			if (totalWhammies < 4){
 				restartBoard(totalSpins,roundNum);
 			}
 			totalGui.innerHTML = toDollar(playerScore);
 			spinsGui.innerHTML = totalSpins;
 		} else {
	 		guiMsg = "You've won the game! Because your score is over $500,000, we're bumping your total winnings up to $1,000,000. Congratulations!";
	 		spinsGui.innerHTML = 0;
	 		setTimeout(function(){ 
				textRibbonContent.innerHTML = "<p>"+guiMsg+"</p>";
				textDisplay.className = '';
				textDisplay.className = 'show';
			}, 0);
			setTimeout(function(){ 
				textRibbonContent.className = '';
				textRibbonContent.className = 'show';
			}, 250);
			setTimeout(function(){ 
				scoreCenter.style.display = "none";
				displayCenterMoney(6);
			}, 2000);
 		}
	} else {
		if (activeBoard[selectedSquare]['extras'][0][posStop] == "leftright" || activeBoard[selectedSquare]['extras'][0][posStop] == "updown"){
			squareAltA = selectedSquare-1;
			squareAltB = selectedSquare+1;
			squareClickA = document.body.querySelector('.square[data-square="'+squareAltA+'"]');
			squareClickB = document.body.querySelector('.square[data-square="'+squareAltB+'"]');
			squareClickA.onclick = function(){addVal(squareAltA)};
			squareClickB.onclick = function(){addVal(squareAltB)};
			guiMsg = "Move one space! Click either square to make your selection!";
			setTimeout(function(){ 
				textRibbonContent.innerHTML = "<p>"+guiMsg+"</p>";
				textDisplay.className = '';
				textDisplay.className = 'show';
			}, 0);
			setTimeout(function(){ 
				textRibbonContent.className = '';
				textRibbonContent.className = 'show';
			}, 250);
			setTimeout(function(){ 
				textRibbonContent.className = '';
				textDisplay.className = '';
			}, 3750);
			setTimeout(function(){ 
			 	centerFrame.className = '';
			 	frameContent.className = '';
			 	centerLogo.className = '';
				textRibbonContent.innerHTML = "";
			}, 4000);
			setTimeout(function(){ 
				toggleVar = setInterval(toggleSquares, 1000);
			}, 750);
		}
		if (activeBoard[selectedSquare]['extras'][0][posStop] == "corner"){
			squareAltCornerA = 1;
			squareAltCornerB = 10;
			squareAltCornerC = 15;
			squareClickA = document.body.querySelector('.square[data-square="'+squareAltCornerA+'"]');
			squareClickB = document.body.querySelector('.square[data-square="'+squareAltCornerB+'"]');
			squareClickC = document.body.querySelector('.square[data-square="'+squareAltCornerC+'"]');
			squareClickA.onclick = function(){addVal(squareAltCornerA)};
			squareClickB.onclick = function(){addVal(squareAltCornerC)};
			squareClickB.onclick = function(){addVal(squareAltB)};
			guiMsg = "Stop at Pick a Corner! Click whichever corner you'd like to bank!";
			setTimeout(function(){ 
				toggleVarCorner = setInterval(toggleSquares, 1500);
			}, 750);
			setTimeout(function(){ 
				textRibbonContent.innerHTML = "<p>"+guiMsg+"</p>";
				textDisplay.className = '';
				textDisplay.className = 'show';
			}, 0);
			setTimeout(function(){ 
				textRibbonContent.className = '';
				textRibbonContent.className = 'show';
			}, 250);
			setTimeout(function(){ 
				textRibbonContent.className = '';
				textDisplay.className = '';
			}, 3750);
			setTimeout(function(){ 
			 	centerFrame.className = '';
			 	frameContent.className = '';
			 	centerLogo.className = '';
				textRibbonContent.innerHTML = "";
			}, 4000);
		}
	}
}

function toggleSquares(){
	clearAllSquares();
	setSquare(squareAltA);
	setTimeout(function(){ 
		clearAllSquares();
		setSquare(squareAltB);
	}, 500);	
	allowClick = true;
}

function toggleSquaresCorner(){
	clearAllSquares();
	setSquare(squareAltCornerA);
	setTimeout(function(){ 
		clearAllSquares();
		setSquare(squareAltCornerB);
	}, 500);	
	setTimeout(function(){ 
		clearAllSquares();
		setSquare(squareAltCornerC);
	}, 1000);
	allowClick = true;
}

function restartBoard(totalSpins,roundNum){
	if(totalSpins > 0){
		setTimeout(function(){ 
			clearAllSquares();
			spinTimer();
			redBoard.className = '';
			cycleTimer(activeBoard);
		}, 7500);
	} else {
		roundNum++;
		if (roundNum > 6){
			 infoGui.value = "You've survived the Big Bucks Bonanza and won the game! You've won a total of "+toDollar(playerScore)+". Congratulations! Refresh the page to play again!";
		} else {
			setTimeout(function(){ 
				startnewRound(roundNum);
			}, 4000);
		}
	}
}

function startnewRound(rn){
	if (rn <= 5){
		roundNum = rn;
		for(var z = 0;z<18;z++){
			boardItems[z].innerHTML = "";
			boardItems[z].className = '';
		}
	// 	if (rn == 2){bigBucksNum = "go up to $15,000";spinsTake = 4;};
		if (rn == 2){bigBucksNum = "go up to $25,000";spinsTake = 4;};
		if (rn == 3){bigBucksNum = "double to a massive $50,000";spinsTake = 3;};
		if (rn == 4){bigBucksNum = "increase to an unbelievable $75,000";spinsTake = 3;};
		if (rn !== 5){
			roundMsg = "It's decision time. You can walk away with $"+toDollar(playerScore)+" or Press Your Luck. If you play, Big Bucks will "+bigBucksNum+"! You'll have to take "+spinsTake+" spins.";
	// 		infoGui.value = "You've ended the round with $"+toDollar(playerScore)+" and it's decision time. You can walk away with your winnings or Press Your Luck. If you play on, we'll add another bigger prize to the board, and Big Bucks will "+bigBucksNum+"! You must take "+spinsTake+" spins. Do you want to walk away, or Press Your Luck?";
		} else {
			roundMsg = "You've made it to the Big Bucks Bonanza. Everything on the board is now Big Bucks, from $10,000 to our biggest bucks: $100,000. You will have to survive 3 spins.";
		}
		setTimeout(function(){ 
			textRibbonContent.className = '';
			clearAllSquares();
		}, 0);
		setTimeout(function(){
			textRibbonContent.innerHTML = "";
			textRibbonContent.innerHTML = '<p>'+roundMsg+'</p>';
			textRibbonContent.className = 'show';
		}, 250);
		setTimeout(function(){ 
			textRibbonContent.className = '';
		}, 6000);
		setTimeout(function(){
			textRibbonContent.innerHTML = "";
			textRibbonContent.innerHTML = '<p>Do you want to walk away, or Press Your Luck?</p><p class="btns"><button onclick="walkAway()" id="walkaway">Walk Away</button><button onclick="continueGame()" id="pyl">Press Your Luck</button></p>';
			textRibbonContent.className = 'show';
		}, 6250);
		blueBoard.className = '';
		redBoard.className = '';
		setTimeout(function(){ 
			possiblePrizes = [];
			if (rn !== 6){
				var prizeToRemove = getSmallestPrize(activePrizes);
			 	removePrize(prizeToRemove,rn,2);
		 	}
	 	}, 1000);
 	} else {
	 	blueBoard.className = '';
		redBoard.className = '';
	 	if (playerScore == 0){
		 	roundMsg = "You Whammied on your final spin! Unfortunately you've ended the game with $0. Thanks for playing Press Your Luck. Better luck next game.";
	 	} else {
		 	roundMsg = "Congratulations! You survived the Big Bucks Bonanza and you've leaving with $"+toDollar(playerScore)+". Thanks for playing Press Your Luck!";
	 	}
	 	scoreCenter.style.display = "none";
		setTimeout(function(){ 
			displayCenterMoney(playerScore);
		}, 1000);
		setTimeout(function(){ 
			textRibbonContent.className = '';
		}, 250);
		setTimeout(function(){
			textRibbonContent.innerHTML = "";
			textRibbonContent.innerHTML = "<p>"+roundMsg+"</p>";
			textRibbonContent.className = 'show';
		}, 500);
 	}
}

function walkAway(){
	guiMsg = "You've walking away with a total of $"+toDollar(playerScore)+"! Congratulations! Refresh the page to play again.";
	scoreCenter.style.display = "none";
	setTimeout(function(){ 
		displayCenterMoney(playerScore);
	}, 1000);
	setTimeout(function(){ 
		textRibbonContent.className = '';
	}, 250);
	setTimeout(function(){
		textRibbonContent.innerHTML = "";
		textRibbonContent.innerHTML = "<p>"+guiMsg+"</p>";
		textRibbonContent.className = 'show';
	}, 500);
}

function loseWhammy(el){
	if (el == 0){
		valueAdd = activeBoard[selectedSquare]['values'][0][posStop];
		playerScore += activeBoard[selectedSquare]['values'][0][posStop];
	}
	totalSpins--;
	totalGui.innerHTML = toDollar(playerScore);
 	spinsGui.innerHTML = totalSpins;
 	spinsMsg = "";
 	if (totalSpins >= 1){
		spinsMsg = " "+totalSpins+" spins left to take this round. Good luck!";
	}
	if (el == 0){
		guiMsg = "You've chosen $"+toDollar(activeBoard[selectedSquare]['values'][0][posStop])+"! You're up to $"+toDollar(playerScore)+"."+spinsMsg;
	} else {
		guiMsg = "You've chosen to lose a Whammy! You're still at $"+toDollar(playerScore)+" ."+spinsMsg;
		setTimeout(function(){ 
			whammyRemove = totalWhammies + 1;
			document.getElementById("whammy"+whammyRemove).className = '';
			document.getElementById("whammy"+whammyRemove).className = 'whammypopup';
		}, 1000);
	}
	totalWhammies = totalWhammies - el;
	setTimeout(function(){ 
		textRibbonContent.innerHTML = "<p>"+guiMsg+"</p>";
		textDisplay.className = '';
		textDisplay.className = 'show';
	}, 0);
	setTimeout(function(){ 
		textRibbonContent.className = '';
		textRibbonContent.className = 'show';
	}, 250);
	if (totalSpins >= 1){
		setTimeout(function(){ 
			textRibbonContent.className = '';
			textDisplay.className = '';
		}, 6000);
		setTimeout(function(){ 
			centerFrame.className = '';
			frameContent.className = '';
			centerLogo.className = '';
			textRibbonContent.innerHTML = "";
		}, 6250);
	}
	restartBoard(totalSpins,roundNum);
}

function continueGame(){
/*
	document.getElementById("pyl").blur();
	document.getElementById("walkaway").blur();
	document.getElementById("pyl").style.display = "none";
	document.getElementById("walkaway").style.display = "none";
*/
// 	if (roundNum == 2){activeBoard = royaleBoardTwo;totalSpins = 4;}
	if (roundNum == 2){activeBoard = royaleBoardThree;totalSpins = 4;topDollar="25,000";}
	if (roundNum == 3){activeBoard = royaleBoardFour;totalSpins = 3;topDollar="50,000";}
	if (roundNum == 4){activeBoard = royaleBoardFive;totalSpins = 3;topDollar="75,000";}
	if (roundNum == 5){activeBoard = royaleBoardSix;totalSpins = 3;topDollar="100,000";}
	redBoard.className = '';
	blueBoard.className = '';
	roundMsg = "";
	scoreCenter.style.display = "none";
	displayCenterMoney(roundNum);
	setTimeout(function(){ 
		textRibbonContent.className = '';
	}, 0);
	setTimeout(function(){ 
		textRibbonContent.innerHTML = "<p>You're Pressing Your Luck! Big Bucks in round "+roundNum+" is worth $"+topDollar+"!</p>";
		textDisplay.className = '';
		textDisplay.className = 'show';
	}, 1500);
	setTimeout(function(){ 
		textRibbonContent.className = '';
		textRibbonContent.className = 'show';
	}, 1750);
	setTimeout(function(){ 
		textRibbonContent.className = '';
	}, 7000);
	setTimeout(function(){
		finalRnMsg = " Good luck!";
		if (roundNum == 5){
			finalRnMsg = "This is the final round...good luck!"
		}
		textRibbonContent.innerHTML = "";
		textRibbonContent.innerHTML = "<p>You have to survive "+totalSpins+" spins."+finalRnMsg+"</p>";
		scoreCenter.style.display = "block";
		textRibbonContent.className = 'show';
	}, 7250);
	setTimeout(function(){ 
		spinsGui.innerHTML = totalSpins;
	}, 9000);
	setTimeout(function(){ 
		textRibbonContent.className = '';
		textDisplay.className = '';
	}, 12000);
	setTimeout(function(){ 
		spinTimer();
 	 	cycleTimer(activeBoard);
	 	centerFrame.className = '';
	 	frameContent.className = '';
	 	centerLogo.className = '';
		textRibbonContent.innerHTML = "";
	}, 12500);
/*
	if (roundNum !== 5){
// 		infoGui.value = "You're Pressing Your Luck! Take a look at the prize we're adding to the board...";
		infoGui.value = "You're Pressing Your Luck! Good luck!";
// 		displayCenterPrize(activePrizes[2][0]['name']);
		prizesToBoard(activeBoard, activePrizes);
	} else {
		infoGui.value = "You're Pressing Your Luck! This is the final round where one spin can get you $100,000!";
		prizesToBoard(activeBoard, activePrizes);
	}
*/
/*
	setTimeout(function(){ 
		infoGui.value = "You have to make it through "+totalSpins+" spins this round. Good luck! Hit the space bar to stop the board.";
	 	spinTimer();
	 	cycleTimer(activeBoard);
	 	centerFrame.className = '';
	 	frameContent.className = '';
	 	centerLogo.className = '';
	 	spinsGui.innerHTML = totalSpins;
	}, 8000);
*/
}

function getSmallestPrize(activePrizes){
	var prizeVal = 0;
	var prizeName = "";
	for(var x = 0;x<activePrizes.length;x++){
		if (prizeVal > activePrizes[x][0]['value']){
			prizeName = activePrizes[x][0]['name'];
			prizeVal = activePrizes[x][0]['value'];
		}
		if (prizeVal == 0){
			prizeName = activePrizes[x][0]['name'];
			prizeVal = activePrizes[x][0]['value'];
		}
	}
	return prizeName;
}

function loadBoard(boardConfig,boardNum){
	if (boardNum == 1){boardLabel = "Round One";}
	if (boardNum == 2){boardLabel = "Round Two";}
	if (boardNum == 3){boardLabel = "Bonus Round Board One";}
	if (boardNum == 4){boardLabel = "Bonus Round Board Two";}
	if (boardNum == 5){boardLabel = "Bonus Round Board Three";}
	if (boardNum == 6){boardLabel = "Bonus Round Board Four";}
	if (boardNum == 7){boardLabel = "Bonus Round Board Five";}
	if (boardNum == 8){boardLabel = "Bonus Round Board Six";}
	currentBoard = boardConfig;
	totalCash = 0;
	totalCashStops = 0;
	totalWhammies = 0;
	totalPrizes = 0;
	totalExtra = 0;
	squareSpace = 0;
	cashArray = [];
	for(var i in boardConfig) {
	   squareVals = boardConfig[i];
	   for(y=1;y<4;y++){
	  	 fillItem(squareVals,squareSpace,y,boardConfig,i);
	  	squareSpace++
	   }
	}
	if (!logoShow){
		logoShow = true;
		toggleInfo();
	}
}

function fillItem(squareVals,squareSpace,location,boardConfig,i){
	currentItem = boardItems[squareSpace];
	for(var j in squareVals) {
	   squareContents = boardConfig[i][j][0];
	   if (j == "type"){
	   	if (squareContents[location] == "money"){
		   	totalCashStops++;
	   	}
	   	if (squareContents[location] == "whammy"){
		   	totalWhammies++;
	   	}
	   	if (squareContents[location] == "prize"){
		   	totalPrizes++;
	   	}
	   }
	   if (j == "values"){
	   		totalCash += squareContents[location];
	   		if (squareContents[location] !== 0){
		   		cashArray.push(squareContents[location]);
	   		}
	   }
	   if (j == "text"){
		   currentItem.innerHTML = squareContents[location];
	   }
	   if (j == "color"){
		   currentItem.className = '';
		   currentItem.classList.add("item");
		   currentItem.classList.add(squareContents[location]);
	   }
	   if (j == "extras"){
	   	if (squareContents[location] == "plus"){
		   	totalExtra++;
	   	}
	   }
	}
}

function toggleInfo(){
	cashArraySort = cashArray.sort(function(a, b){return a - b});
	if (logoShow){
		frameContent.innerHTML = '';
		boardCenter.className = '';
		boardCenter.classList.add("blue");
		logoShow = false;
		var element = document.createElement("H2");
		element.appendChild(document.createTextNode(boardLabel));
		frameContent.appendChild(element);
		var element = document.createElement("P");
		element.appendChild(document.createTextNode('Total Cash: '+toDollar(totalCash)));
		frameContent.appendChild(element);
		var element = document.createElement("P");
		element.appendChild(document.createTextNode('Board Avg $$: '+toDollar(totalCash/54)));
		frameContent.appendChild(element);
		var element = document.createElement("P");
		element.appendChild(document.createTextNode('Avg $$ of Cash Stops: '+toDollar(totalCash/cashArray.length)));
		frameContent.appendChild(element);
		var element = document.createElement("P");
		element.appendChild(document.createTextNode('Median Cash Value: '+toDollar(median(cashArraySort))));
		frameContent.appendChild(element);
		var element = document.createElement("P");
		element.appendChild(document.createTextNode('Total Whammies: '+totalWhammies+ ". Odds: "+(Math.floor((totalWhammies / 54) * 100))+"%"));
		frameContent.appendChild(element);
		var element = document.createElement("P");
		element.appendChild(document.createTextNode('Total Prizes: '+totalPrizes+ ". Odds: "+(Math.floor((totalPrizes / 54) * 100))+"%"));
		frameContent.appendChild(element);
		var element = document.createElement("P");
		element.appendChild(document.createTextNode('Extra Spins: '+totalExtra+ ". Odds: "+(Math.floor((totalExtra / 54) * 100))+"%"));
		frameContent.appendChild(element);
	} else {
		boardCenter.className = '';
		boardCenter.classList.add("logo");
		frameContent.innerHTML = '';
		logoShow = true;
	}
}

function toDollar(value){
	return value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

function median(values) {

    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}
 

function prizesToBoard(theBoard, prizes){
	var p = 0;
	for(i in theBoard){
		var theSquare = theBoard[i];
		for(var j=1;j<=3;j++){
			if (theSquare['type'][0][j] == "prize"){
				theSquare['text'][0][j] = prizes[p][0]['name'];
				theSquare['values'][0][j] = prizes[p][0]['value'];
				p++;
				if(p>2){p=0}
			}
		}
	}
}

function boardCycle(){
	loadSingle(activeBoard, currentStop,1,2);
}

function loadPrizes(i,e,r,a,n,t){
	if (t == 1){
		r = r - 1;
		if (r == 0){
			r = 1;
		}
	}
	if (possiblePrizes.length == 0){
		possiblePrizes = [];
		for (j in i){
			if (i[j]['level'] == r && i[j]['name'] !== n){
				possiblePrizes.push(j);
			}
		}
		maxGo = 4;
	} else {
		possiblePrizes = [];
		for (j in i){
			if (i[j]['level'] == r && i[j]['name'] !== n){
				possiblePrizes.push(j);
			}
		}
		maxGo = 2;	
	}
	maxGo = (3 - a.length);
	for(var x=0;x<maxGo;x++){
		rI = Math.floor(Math.random()*possiblePrizes.length);
		var item = possiblePrizes[rI];
		itemIndex = item;
		possiblePrizes.splice(rI, 1);
		var data = [
		    { 
		        "name": i[itemIndex]['name'],
		        "value": i[itemIndex]['value'],
		        "level": r
		    }
		];
		a.push(data);
	}
	if (n !== null){
		setTimeout(function(){ 
			for(i in activeBoard){
				var theSquare = activeBoard[i];
				for(var j=1;j<=3;j++){
					if (theSquare['type'][0][j] == "prize" && theSquare['text'][0][j] == n){
						theSquare['text'][0][j] = a[2][0]['name'];
						theSquare['values'][0][j] = a[2][0]['value'];
					}
				}
			}
			for(var q = 0;q<18;q++){
				var squareElem = boardItems[q];
				if (squareElem.textContent == n){
					squareElem.innerHTML = a[2][0]['name'];
				}
			}
		}, 2000);
	}
}

function loadSingle(boardConfig, stops, num, type){
	if (stops.length < 18){
		stops = [];
		for(x=0;x<18;x++){
			stopNum = Math.floor(Math.random() * 3) + 1;
			stops.push(stopNum);
		}
	} else {
		for(x=0;x<18;x++){
			potentialStops = [1,2,3];
			currentUsed = stops[x] - 1;
			potentialStops.splice(currentUsed, 1);
			stopCheck = Math.floor(Math.random() * 2);
			stopNum = potentialStops[stopCheck];
			stops[x] = stopNum;
		}
	}
	currentStop = stops;
	currentBoard = boardConfig;
	for(x=0;x<stops.length;x++){
		singleStop = stops[x];
	}
	activeIndexes = [];
	if (type == 2){
		for(var i in boardConfig) {
			currentSquareReadout = boardConfig[i];
			currentSquareStop = stops[i-1];
			fillSquare(i-1, boardConfig[i]['color'][0][currentSquareStop], boardConfig[i]['type'][0][currentSquareStop], boardConfig[i]['values'][0][currentSquareStop], boardConfig[i]['text'][0][currentSquareStop], boardConfig[i]['prizeValues'][0][currentSquareStop], boardConfig[i]['extras'][0][currentSquareStop]);
			activeIndexes.push(currentSquareStop);
		}
	} else if (type == 1){
		for(var i in boardConfig) {
			timerCounter = i * 100;
			squareStop = parseInt(i) + 3;
			if (squareStop > 18){
				squareStop = squareStop - 18;
			}
			currentSquareReadout = boardConfig[squareStop];
			currentSquareStop = stops[squareStop-1];
			doTimerLoad(i,squareStop,currentSquareReadout,currentSquareStop,boardConfig);
		}
/*
		setTimeout(function(){ 
			boardItemsFade[square].className = '';
				boardItemsFade[square].classList.add("item");
				boardItemsFade[square].classList.add("itemsinglefade");
				boardItemsFade[square].classList.add("animate");
				boardItemsFade[square].classList.add("show");
				boardItemsFade[square].classList.add(color);
				if (color == "move"){
					boardItemsFade[square].classList.add(extra);
				}
		}, 300);
*/
	}
}

function doTimerLoad(j,i,currentSquareReadout,currentSquareStop,boardConfig) {
	timerVal = j*75;
	setTimeout(function() { 
		squareFlash = boardItems[i-1].parentNode;
		squareFlash.classList.add("flash");
		fillSquare(i-1, boardConfig[i]['color'][0][currentSquareStop], boardConfig[i]['type'][0][currentSquareStop], boardConfig[i]['values'][0][currentSquareStop], boardConfig[i]['text'][0][currentSquareStop], boardConfig[i]['prizeValues'][0][currentSquareStop], boardConfig[i]['extras'][0][currentSquareStop]);
		activeIndexes.push(currentSquareStop);
	}, timerVal);
}

function fillSquare(square,color,type,value,text,prizeValue,extra){
	
	squareQueue = boardItems[square];
	squareQueueFade = boardItemsFade[square];
	currentVal = squareQueue.innerHTML;
// 	console.log(currentVal);
	if (currentVal !== ""){
		squareQueueFade.innerHTML = currentVal;
		squareQueueFade.classList.add("reveal");
		squareQueueFade.classList.add("fade");
	}
	squareQueue.className = '';
	squareQueue.classList.add("item");
	squareQueue.classList.add("itemsingle");
	squareQueue.classList.add(color);
	if (color == "move"){
		squareQueue.classList.add(extra);
	}
	if (type == "intro"){
		squareClass = squareQueue.parentNode;
		squareClass.setAttribute("id", extra);
	}
	squareQueue.innerHTML = "<span>"+text+"</span>";
	setTimeout(function(){ 
		boardItemsFade[square].className = '';
		boardItemsFade[square].classList.add("item");
		boardItemsFade[square].classList.add("itemsinglefade");
		boardItemsFade[square].classList.add("animate");
		boardItemsFade[square].classList.add("show");
		boardItemsFade[square].classList.add(color);
		if (color == "move"){
			boardItemsFade[square].classList.add(extra);
		}
// 			boardItemsFade[i].classList.add("reveal");
	}, 300);
}

function cycleTimer(theBoard) {
	extraMsg = "Stop at ";
	boardSpinSfx.start();
	blueBoard.className = 'show';
	activeBoard = theBoard;
 	boardCycle(currentStop);
 	setTimeout(function(){ 
 		canStop = true;
 	}, 1250);
    cycleVar = setInterval(boardCycle, 800);
}

function spinTimer() {
	spinSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
	usedSquares = [];
	spinVar = setInterval(spinBoard, 300);
}

function clearAllSquares(){
	var activeSquare = document.body.querySelector('.square.active');
	activeSquare.className = '';
	activeSquare.classList.add("square");
}

function setSquare(ab){
	var squareElem = document.body.querySelector('.square[data-square="'+ab+'"]');
	squareElem.classList.add("active");
}

function spinBoard(){
	if (usedSquares.length > 2){
		addSquare = usedSquares[0];
		usedSquares.shift();
		spinSquares.push(addSquare);
	}
	randomLand = Math.floor(Math.random()*spinSquares.length);
	selectedSquare = spinSquares[Math.floor(Math.random()*spinSquares.length)];
	var squareIndex = spinSquares.indexOf(selectedSquare);
	if (squareIndex > -1) {
		spinSquares.splice(squareIndex, 1);
	}
	usedSquares.push(selectedSquare);
	if (usedSquares.length > 1){
		var activeSquare = document.body.querySelector('.square.active');
		activeSquare.className = '';
		activeSquare.classList.add("square");
	}
	var squareElem = document.body.querySelector('.square[data-square="'+selectedSquare+'"]');
	squareElem.classList.add("active");
}


function addVal(sC){
	if(allowClick == true){
		clearInterval(toggleVar);
		setTimeout(function(){ 
			clearAllSquares();
			setSquare(sC);
		}, 1000);
	}
	selectedSquare = sC;
	boardSpinSfx.start();
	stopBoard();
}

function removePrize(prizeName,round,type){
	for(var x = 0;x<activePrizes.length;x++){
		if (activePrizes[x][0]['name'] == prizeName){
			var data = [
			    { 
			        "name": activePrizes[x][0]['name'],
			        "value": activePrizes[x][0]['value'],
			        "level": activePrizes[x][0]['level']
			    }
			];
			if (type == 2){
				lostPrizes.push(data);
			} else {
				usedPrizes.push(data);
			}
			activePrizes.splice(x, 1);
		}
	}
	console.log(lostPrizes);
	if (type == 2){
		loadPrizes(prizeReserveBonus, activePrizes, round, activePrizes,prizeName,2);
	} else {
		loadPrizes(prizeReserveBonus, activePrizes, round, activePrizes,prizeName,1);
	}
}

function Sound(source, volume, loop)
{
    this.source = source;
    this.volume = volume;
    this.loop = loop;
    var son;
    this.son = son;
    this.finish = false;
    this.stop = function()
    {
        document.body.removeChild(this.son);
    }
    this.start = function()
    {
        if (this.finish) return false;
        this.son = document.createElement("embed");
        this.son.setAttribute("src", this.source);
        this.son.setAttribute("hidden", "true");
        this.son.setAttribute("volume", this.volume);
        this.son.setAttribute("autostart", "true");
        this.son.setAttribute("loop", this.loop);
        document.body.appendChild(this.son);
    }
    this.remove=function()
    {
        document.body.removeChild(this.son);
        this.finish = true;
    }
    this.init = function(volume, loop)
    {
        this.finish = false;
        this.volume = volume;
        this.loop = loop;
    }
}