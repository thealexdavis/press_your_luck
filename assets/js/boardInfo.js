var boardCenter = document.getElementById("center");
var frameContent = document.getElementById("frame_content");
logoShow = true;

function toggleInfo(){
	cashArraySort = cashArray.sort(function(a, b){return a - b});
	console.log(cashArraySort);
	if (logoShow){
		boardCenter.className = '';
		boardCenter.classList.add("blue");
		logoShow = false;
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
		myNode.innerHTML = '';
		logoShow = true;
	}
}

function toDollar(value){
	return '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

function median(values) {

    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}