var theBoard= document.getElementById("squares");
var boardSquares=theBoard.querySelectorAll("div");
var boardItems=theBoard.querySelectorAll("span");
var boardCenter= document.getElementById("center");
var centerLogo= document.getElementById("center_logo");
var centerFrame= document.getElementById("center_frame");
var frameContent= document.getElementById("frame_content");
var frameContentText= document.getElementById("content_text");
var totalGui= document.getElementById("totalWinnings");
var spinsGui= document.getElementById("totalSpins");
var whammiesGui= document.getElementById("totalWhammies");
var infoGui= document.getElementById("info");
logoShow = true;
var toggleVar;
var toggleVarCorner;
var valueStandby = 0;
canStop = false;

//INIT SETUP
boardSpinSfx = new Sound("sfx/boardspin.mp3", 100, true);
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
playerScore = 0;
totalSpins = 5;
totalWhammies = 0;
roundNum = 1;
currentMult = 0;
activeBoard = roundBonusBoardOne;
loadPrizes(prizeReserveBonus, activePrizes, 1, activePrizes,null);
prizesToBoard(activeBoard, activePrizes);
startRoundOne();
setTimeout(function(){ 
}, 5000);


function startRoundOne(){
	infoGui.value = "Welcome to the game! Let's start by adding three prizes to the board!";
	displayCenterPrize(activePrizes[0][0]['name']);
	setTimeout(function(){
		infoGui.value = "You can stop after any round but remember...a Whammy brings you back to $0. Four Whammies and you're out of the game. Don't forget: if your score ever reaches $500,000...the game instantly ends and we will bump your winnings up to $1,000,000!";
		displayCenterPrize(activePrizes[1][0]['name']);
	}, 6000);
	setTimeout(function(){
		displayCenterPrize(activePrizes[2][0]['name']);
	}, 12000);
	setTimeout(function(){ 
		infoGui.value = "You must play five spins in this round. Good luck! Hit the space bar to stop the board.";
	 	spinTimer();
	 	cycleTimer(activeBoard);
	 	centerFrame.className = '';
	 	frameContent.className = '';
	 	centerLogo.className = '';
	}, 18000);
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
		var startSquare = selectedSquare;
		selectedSquare = selectedSquare - 2;
		sI = selectedSquare - 1;
		posStop = activeIndexes[sI];
		infoGui.value = "Stop at "+toDollar(activeBoard[selectedSquare]['values'][0][posStop])+" or Lose a Whammy! Click the button for the option you'd like.";
	}
	if (activeBoard[selectedSquare]['extras'][0][posStop] == "forwardtwo"){
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
		removePrize(activeBoard[selectedSquare]['text'][0][posStop], roundNum);
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
			playerScore = 0;
			totalWhammies++;
			if (totalWhammies == 3){
				extras = "  Be careful: one more Whammy and you're out of the game.";
			}
			infoGui.value = "Stop...at a Whammy!"+extras+" Back down to $0. "+totalSpins+" left this round. Good luck";
		} else {
 			playerScore += activeBoard[selectedSquare]['values'][0][posStop];
 			infoGui.value = "Stop at "+prizeInfo+" "+toDollar(activeBoard[selectedSquare]['values'][0][posStop])+""+extras+"! You're up to "+toDollar(playerScore)+". "+totalSpins+" spins left this round. Good luck!";
		}
		if (playerScore < 500000){
 			restartBoard(totalSpins,roundNum);
 			totalGui.value = toDollar(playerScore);
 			spinsGui.value = totalSpins;
 		} else {
	 		infoGui.value = "You've won the game! Because your score is over $500,000, we're bumping your total winnings up to $1,000,000. Congratulations!";
	 		totalGui.value = "$1,000,000";
	 		spinsGui.value = 0;
 		}
		whammiesGui.value = totalWhammies;
	} else {
		if (activeBoard[selectedSquare]['extras'][0][posStop] == "leftright" || activeBoard[selectedSquare]['extras'][0][posStop] == "updown"){
			squareAltA = selectedSquare-1;
			squareAltB = selectedSquare+1;
			squareClickA = document.body.querySelector('.square[data-square="'+squareAltA+'"]');
			squareClickB = document.body.querySelector('.square[data-square="'+squareAltB+'"]');
			squareClickA.onclick = function(){addVal(squareAltA)};
			squareClickB.onclick = function(){addVal(squareAltB)};
			infoGui.value = "Move one space! Click either square to make your selection!";
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
			infoGui.value = "Stop at Pick a Corner! Click whichever corner you'd like to bank!";
			setTimeout(function(){ 
				toggleVarCorner = setInterval(toggleSquares, 1500);
			}, 750);
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
			cycleTimer(activeBoard);
		}, 5000);
	} else {
		roundNum++;
		if (roundNum > 6){
			 infoGui.value = "You've survived the Big Bucks Bonanza and won the game! You've won a total of "+toDollar(playerScore)+". Congratulations! Refresh the page to play again!";
		} else {
			setTimeout(function(){ 
				startnewRound(roundNum);
			}, 1000);
		}
	}
}

function startnewRound(rn){
	roundNum = rn;
	clearAllSquares();
	for(var z = 0;z<18;z++){
		boardItems[z].innerHTML = "";
		boardItems[z].className = '';
	}
	if (rn == 2){bigBucksNum = "go up to $15,000";spinsTake = 4;};
	if (rn == 3){bigBucksNum = "go up to $25,000";spinsTake = 3;};
	if (rn == 4){bigBucksNum = "double to a massive $50,000";spinsTake = 3;};
	if (rn == 5){bigBucksNum = "increase to an unbelievable $75,000";spinsTake = 3;};
	if (rn !== 6){
		infoGui.value = "You've ended the round with "+toDollar(playerScore)+" and it's decision time. You can walk away with your winnings or Press Your Luck. If you play on, we'll add another bigger prize to the board, and Big Bucks will "+bigBucksNum+"! You must take "+spinsTake+" spins. Do you want to walk away, or Press Your Luck?";
	} else {
		infoGui.value = "You've ended the round with "+toDollar(playerScore)+" and you've made it to the Big Bucks Bonanza. Everything on the board is now Big Bucks, from $10,000 to our biggest bucks on the board: $100,000. You will have to survive three spins, though. Do you want to walk away, or Press Your Luck?";
	}
	document.getElementById("pyl").style.display = "block";
	document.getElementById("walkaway").style.display = "block";
	setTimeout(function(){ 
		possiblePrizes = [];
		if (rn !== 6){
			var prizeToRemove = getSmallestPrize(activePrizes);
		 	removePrize(prizeToRemove, rn);
	 	}
 	}, 1000);
}

function walkAway(){
	infoGui.value = "You've walking away with a total of "+toDollar(playerScore)+"...Congratulations! Refresh the page to play again!";
	document.getElementById("pyl").blur();
	document.getElementById("walkaway").blur();
	document.getElementById("pyl").style.display = "none";
	document.getElementById("walkaway").style.display = "none";
}

function loseWhammy(el){
	document.getElementById("takemoney").blur();
	document.getElementById("losewhammy").blur();
	document.getElementById("takemoney").style.display = "none";
	document.getElementById("losewhammy").style.display = "none";
	totalWhammies = totalWhammies - el;
	valueAdd = activeBoard[selectedSquare]['values'][0][posStop];
	playerScore += activeBoard[selectedSquare]['values'][0][posStop];
	totalSpins--;
	totalGui.value = toDollar(playerScore);
 	spinsGui.value = totalSpins;
 	whammiesGui.value = totalWhammies;
	if (el == 0){
		infoGui.value = "You've chosen "+toDollar(activeBoard[selectedSquare]['values'][0][posStop])+"! You're up to "+toDollar(playerScore)+". "+totalSpins+" spins left this round. Good luck!";
	} else {
		infoGui.value = "You've chosen to lose a Whammy! You're still at "+toDollar(playerScore)+" but now with "+totalWhammies+" Whammies. "+totalSpins+" spins left this round. Good luck!";
	}
}

function continueGame(){
	document.getElementById("pyl").blur();
	document.getElementById("walkaway").blur();
	document.getElementById("pyl").style.display = "none";
	document.getElementById("walkaway").style.display = "none";
	if (roundNum == 2){activeBoard = roundBonusBoardTwo;totalSpins = 4;}
	if (roundNum == 3){activeBoard = roundBonusBoardThree;totalSpins = 3;}
	if (roundNum == 4){activeBoard = roundBonusBoardFour;totalSpins = 3;}
	if (roundNum == 5){activeBoard = roundBonusBoardFive;totalSpins = 3;}
	if (roundNum == 6){activeBoard = roundBonusBoardSix;totalSpins = 3;}
	if (roundNum !== 6){
		infoGui.value = "You're Pressing Your Luck! Take a look at the prize we're adding to the board...";
		displayCenterPrize(activePrizes[2][0]['name']);
		prizesToBoard(activeBoard, activePrizes);
	} else {
		infoGui.value = "You're Pressing Your Luck! This is the final round where one spin can get you $100,000!";
		prizesToBoard(activeBoard, activePrizes);
	}
	setTimeout(function(){ 
		infoGui.value = "You have to make it through "+totalSpins+" spins this round. Good luck! Hit the space bar to stop the board.";
	 	spinTimer();
	 	cycleTimer(activeBoard);
	 	centerFrame.className = '';
	 	frameContent.className = '';
	 	centerLogo.className = '';
	 	spinsGui.value = totalSpins;
	}, 8000);
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
	return '$' + value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
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
	loadSingle(activeBoard, currentStop,1);
}

function loadPrizes(i,e,r,a,n){
	if (possiblePrizes.length == 0){
		for (j in i){
			if (i[j]['level'] == r && i[j]['name'] !== n){
				possiblePrizes.push(j);
			}
		}
		maxGo = 4;
	} else {
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

function loadSingle(boardConfig, stops, num){
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
	for(var i in boardConfig) {
		currentSquareReadout = boardConfig[i];
		currentSquareStop = stops[i-1];
		fillSquare(i-1, boardConfig[i]['color'][0][currentSquareStop], boardConfig[i]['type'][0][currentSquareStop], boardConfig[i]['values'][0][currentSquareStop], boardConfig[i]['text'][0][currentSquareStop], boardConfig[i]['prizeValues'][0][currentSquareStop], boardConfig[i]['extras'][0][currentSquareStop]);
		activeIndexes.push(currentSquareStop);
	}
}

function fillSquare(square,color,type,value,text,prizeValue,extra){
	
	squareQueue = boardItems[square];
	squareQueue.className = '';
	squareQueue.classList.add("item");
	squareQueue.classList.add(color);
	squareQueue.innerHTML = text;
}

function cycleTimer(theBoard) {
	boardSpinSfx.start();
	activeBoard = theBoard;
 	boardCycle(currentStop);
 	canStop = true;
 	cycleVar = setInterval(boardCycle, 600);
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

function removePrize(prizeName,round){
	for(var x = 0;x<activePrizes.length;x++){
		if (activePrizes[x][0]['name'] == prizeName){
			var data = [
			    { 
			        "name": activePrizes[x][0]['name'],
			        "value": activePrizes[x][0]['value'],
			        "level": activePrizes[x][0]['level']
			    }
			];
			usedPrizes.push(data);
			activePrizes.splice(x, 1);
		}
	}
	loadPrizes(prizeReserveBonus, activePrizes, round, activePrizes,prizeName);
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