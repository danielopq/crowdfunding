// JavaScript Document
window.onload=start;
/*------------------- start -------------------*/
function start(){
	document.getElementById("menu-mb-icon").addEventListener('click',showMobileMenu,false);
	document.getElementById("top-buttons-back").addEventListener('click',openOrder,false);
	document.getElementById("bamboo-reward-bt").addEventListener('click',openOrder,false);
	document.getElementById("black-reward-bt").addEventListener('click',openOrder,false);
	document.getElementById("mahogany-reward-bt").addEventListener('click',openOrder,false);
	document.getElementById("top-buttons-bookmark").addEventListener('click',bookmark,false);
	document.getElementById("backProject-close").addEventListener('click',closeOrder,false);
	document.getElementById("noPledge-bt").addEventListener('click',selectItem,false);
	document.getElementById("bamboo-bt").addEventListener('click',selectItem,false);
	document.getElementById("black-bt").addEventListener('click',selectItem,false);
	document.getElementById("mahogany-bt").addEventListener('click',selectItem,false);
	document.getElementById("noPledge-continue").addEventListener('click',sendOrder,false);
	document.getElementById("bamboo-continue").addEventListener('click',sendOrder,false);
	document.getElementById("black-continue").addEventListener('click',sendOrder,false);
	document.getElementById("mahogany-continue").addEventListener('click',sendOrder,false);
	document.getElementById("gotIt-bt").addEventListener('click',closeOrder,false);
	document.getElementById("noPledge-inp").addEventListener('keyup',validateNumber,false);
	document.getElementById("bamboo-inp").addEventListener('keyup',validateNumber,false);
	document.getElementById("black-inp").addEventListener('keyup',validateNumber,false);
	document.getElementById("mahogany-inp").addEventListener('keyup',validateNumber,false);
}

/*------------------- showMobileMenu -------------------*/

function showMobileMenu(){

	if(document.getElementById("menu-mb-icon").attributes["class"].value == "mb-icon-hamburger"){
		document.getElementById("menu-mb-icon").attributes["class"].value = "mb-icon-close";
		document.getElementById("mobile-links").style.display = "flex";
	}else{
		document.getElementById("menu-mb-icon").attributes["class"].value = "mb-icon-hamburger";
		document.getElementById("mobile-links").style.display = "none";
	}

}

/*------------------- bookmark -------------------*/

function bookmark(){
	if(document.getElementById("top-buttons-bookmark").attributes["class"].value == "bookmark button"){
		document.getElementById("top-buttons-bookmark").setAttribute("class","bookmarked button");
		document.getElementById("top-buttons-bookmark").innerHTML = "&emsp;&emsp;Bookmark";
	}else{
		document.getElementById("top-buttons-bookmark").setAttribute("class","bookmark button");
		document.getElementById("top-buttons-bookmark").innerHTML = "&emsp;&emsp;Bookmarked";
	}
}

/*------------------- openOrder -------------------*/

function openOrder(event){
	resetPledges();
	document.getElementById("fullCover").style.display = "flex";
	document.getElementById("backProject").style.display = "flex";

	if(event.target.attributes["class"].value.indexOf("disable-button") == -1){
		switch(event.target.attributes["id"].value){
			case 'bamboo-reward-bt':
				document.getElementById("radio-bamboo").checked = true;
				document.getElementById("bamboo-pledge").style.display = "flex";
				break;
			case 'black-reward-bt':
				document.getElementById("radio-black").checked = true;
				document.getElementById("black-pledge").style.display = "flex";
				break;
			case 'mahogany-reward-bt':
				document.getElementById("radio-mahogany").checked = true;
				document.getElementById("mahogany-pledge").style.display = "flex";
				break;
		}
	}
}

/*------------------- resetPledges -------------------*/

function resetPledges(){
	var pledges = document.getElementsByClassName("pledge");
	var radioButtons = document.getElementsByClassName("item-rad");
	
	document.getElementById("noPledge-inp").value = "0";
	document.getElementById("bamboo-inp").value = "25";
	document.getElementById("black-inp").value = "75";
	document.getElementById("mahogany-inp").value = "200";
	
	for(var indexRad = 0; indexRad < radioButtons.length ;indexRad ++){
		radioButtons[indexRad].checked = false;
	}
	
	for(var index = 0; index < pledges.length ; index++){
		pledges[index].style.display = "none";
	}
}

/*------------------- selectItem -------------------*/

function selectItem(event){
	resetPledges();
	if(event.target.attributes["class"].value.indexOf("inStock") != -1){
		switch(event.target.attributes["id"].value){
			case 'noPledge-bt':
				document.getElementById("radio-noPledge").checked = true;
				document.getElementById("no-pledge").style.display = "flex";
				break;
			case 'bamboo-bt':
				document.getElementById("radio-bamboo").checked = true;
				document.getElementById("bamboo-pledge").style.display = "flex";
				break;
			case 'black-bt':
				document.getElementById("radio-black").checked = true;
				document.getElementById("black-pledge").style.display = "flex";
				break;
			case 'mahogany-bt':
				document.getElementById("radio-mahogany").checked = true;
				document.getElementById("mahogany-pledge").style.display = "flex";
				break;
		}
	}
}

/*------------------- sendOrder -------------------*/
function sendOrder(event){
	if(validatePledge(event.target.attributes["id"].value)){
		document.getElementById("orderCompleted").style.display = "flex";
		document.getElementById("backProject").style.display = "none";
	}
}

/*------------------- closeOrder -------------------*/

function closeOrder(){
	document.getElementById("fullCover").style.display = "none";
	document.getElementById("backProject").style.display = "none";
	document.getElementById("orderCompleted").style.display = "none";
}

/*------------------- validateAmount -------------------*/

function validateNumber(event){
	var sourceID = event.target.attributes["id"].value;
	var pledgeAmount = event.target.value;
	var pattern = /[0-9]/;

	if(!event.key.match(pattern) && event.key.length == 1){
		document.getElementById(sourceID).value = pledgeAmount.substring(0,pledgeAmount.length -1);
	}
	pledgeAmount = document.getElementById(sourceID).value;
	if(pledgeAmount.substring(0,1) == 0 && pledgeAmount > 1){
		document.getElementById(sourceID).value = pledgeAmount.substring(1,pledgeAmount.length);
	}
}


function validatePledge(source){
	var rightAmount = false;
	switch(source){
		case 'noPledge-continue':
			rightAmount = true;
			break;
		case 'bamboo-continue':
			if(document.getElementById("bamboo-inp").value < 25){
				document.getElementById("bamboo-inp").value = 25;
			}else{
				rightAmount = true;
			}
			break;
		case 'black-continue':
			if(document.getElementById("black-inp").value < 75){
				document.getElementById("black-inp").value = 75;
			}else{
				rightAmount = true;
			}
			break;
		case 'mahogany-continue':
			if(document.getElementById("mahogany-inp").value < 200){
				document.getElementById("mahogany-inp").value = 200;
			}else{
				rightAmount = true;
			}
			break;
	}
	return rightAmount;
}




