// JavaScript Document



/**
 * Displays the mobile menu.
 */

const showMobileMenu = () => {
	document.getElementById("menu-mobile").style.display = "flex";
	document.getElementById("menu-logo").style.display = "none";
	document.getElementById("menu-hamburger").style.display = "none";
}

/**
 * Hides the mobile menu
 */

const hideMobileMenu = () => {
	document.getElementById("menu-mobile").style.display = "none";
	document.getElementById("menu-logo").style.display = "flex";
	document.getElementById("menu-hamburger").style.display = "flex";
}

/**
 * Modifies the bookmark button's state.
 */

const bookmark = () => {
	if (document.getElementById("top-buttons-bookmark").attributes["class"].value == "button bookmark") {
		document.getElementById("top-buttons-bookmark").setAttribute("class", "button bookmarked");
		document.getElementById("top-buttons-bookmark-mb").setAttribute("class", "mb-bookmarked");
		document.getElementById("top-buttons-bookmark").innerHTML = "Bookmarked";
	} else {
		document.getElementById("top-buttons-bookmark").setAttribute("class", "button bookmark");
		document.getElementById("top-buttons-bookmark-mb").setAttribute("class", "mb-bookmark");
		document.getElementById("top-buttons-bookmark").innerHTML = "Bookmark";
	}
}

/**
 * Opens the order window dialog.
 * @param {Event} event 
 */

const openOrder = (event) =>{
	resetPledges();
	document.getElementById("order").style.display = "flex";
	document.getElementById("backProject").style.display = "flex";

	if (event.target.attributes["class"].value.indexOf("disable-button") == -1) {
		switch (event.target.attributes["id"].value) {
			case 'bamboo-reward-bt':
				document.getElementById("radio-bamboo").checked = true;
				document.getElementById("bamboo-pledge").style.display = "flex";
				document.getElementById("back-BambooStand").style.borderColor = "hsl(176, 50%, 47%)";
				break;
			case 'black-reward-bt':
				document.getElementById("radio-black").checked = true;
				document.getElementById("black-pledge").style.display = "flex";
				document.getElementById("back-BlackEdition").style.borderColor = "hsl(176, 50%, 47%)";
				break;
			case 'mahogany-reward-bt':
				document.getElementById("radio-mahogany").checked = true;
				document.getElementById("mahogany-pledge").style.display = "flex";
				document.getElementById("back-Mahogany").style.borderColor = "hsl(176, 50%, 47%)";
				break;
		}
	}
}

/**
 * Resets pledge values to the initial ones, unchecks radio buttons,
 * resets order border colors, and hides pledges.
 */

const resetPledges = () => {
	let orderTypes = document.getElementsByClassName("backPro-parag item");
	let radioButtons = document.getElementsByClassName("item-rad");
	let pledges = document.getElementsByClassName("pledge");

	document.getElementById("noPledge-inp").value = "0";
	document.getElementById("bamboo-inp").value = "25";
	document.getElementById("black-inp").value = "75";
	document.getElementById("mahogany-inp").value = "200";

	for (let indexOrder = 0; indexOrder < orderTypes.length; indexOrder++) {
		orderTypes[indexOrder].style.borderColor = "#dbdbdb";
	}
	for (let indexRad = 0; indexRad < radioButtons.length; indexRad++) {
		radioButtons[indexRad].checked = false;
	}

	for (let index = 0; index < pledges.length; index++) {
		pledges[index].style.display = "none";
	}
}

/**
 * Selects a product by enabling pledges and changing the border color.
 * @param {Event} event 
 */

const selectItem = (event) => {
	resetPledges();
	if (event.target.attributes["class"].value.indexOf("inStock") != -1) {
		switch (event.target.attributes["id"].value) {
			case 'noPledge-bt':
				document.getElementById("radio-noPledge").checked = true;
				document.getElementById("no-pledge").style.display = "flex";
				document.getElementById("back-noPledge").style.borderColor = "hsl(176, 50%, 47%)";
				break;
			case 'bamboo-bt':
				document.getElementById("radio-bamboo").checked = true;
				document.getElementById("bamboo-pledge").style.display = "flex";
				document.getElementById("back-BambooStand").style.borderColor = "hsl(176, 50%, 47%)";
				break;
			case 'black-bt':
				document.getElementById("radio-black").checked = true;
				document.getElementById("black-pledge").style.display = "flex";
				document.getElementById("back-BlackEdition").style.borderColor = "hsl(176, 50%, 47%)";
				break;
			case 'mahogany-bt':
				document.getElementById("radio-mahogany").checked = true;
				document.getElementById("mahogany-pledge").style.display = "flex";
				document.getElementById("back-Mahogany").style.borderColor = "hsl(176, 50%, 47%)";
				break;
		}
	}
}

/**
 * Displays a thank you window.
 * @param {Event} event 
 */
const sendOrder = (event) => {
	if (validatePledge(event.target.attributes["id"].value)) {
		document.getElementById("orderCompleted").style.display = "flex";
		document.getElementById("backProject").style.display = "none";
	}
}

/**
 * Closes the order window.
 */

const closeOrder = () => {
	document.getElementById("order").style.display = "none";
	document.getElementById("backProject").style.display = "none";
	document.getElementById("orderCompleted").style.display = "none";
}

/**
 * Validates pledge values by ensuring that the text field contains only numbers,
 * is not empty, and does not have a leading zero.
 * @param {Event} event 
 */

const validateNumber = (event) => {
	let sourceID = event.target.attributes["id"].value;
	let pledgeAmount = event.target.value;
	let pattern = /[0-9]/;

	if (!event.key.match(pattern) && event.key.length == 1) {
		document.getElementById(sourceID).value = pledgeAmount.substring(0, pledgeAmount.length - 1);
	}
	pledgeAmount = document.getElementById(sourceID).value;
	if (pledgeAmount.substring(0, 1) == 0 && pledgeAmount > 1) {
		document.getElementById(sourceID).value = pledgeAmount.substring(1, pledgeAmount.length);
	}
}

/**
 * Corrects pledge values according to the minimums.
 * @param {String} source 
 * @returns {Boolean}
 */
const validatePledge = (source) => {
	let rightAmount = false;
	switch (source) {
		case 'noPledge-continue':
			rightAmount = true;
			break;
		case 'bamboo-continue':
			if (document.getElementById("bamboo-inp").value < 25) {
				document.getElementById("bamboo-inp").value = 25;
			} else {
				rightAmount = true;
			}
			break;
		case 'black-continue':
			if (document.getElementById("black-inp").value < 75) {
				document.getElementById("black-inp").value = 75;
			} else {
				rightAmount = true;
			}
			break;
		case 'mahogany-continue':
			if (document.getElementById("mahogany-inp").value < 200) {
				document.getElementById("mahogany-inp").value = 200;
			} else {
				rightAmount = true;
			}
			break;
	}
	return rightAmount;
}

(() => {
	document.getElementById("menu-hamburger").addEventListener('click', showMobileMenu, false);
	document.getElementById("mobile-close").addEventListener('click', hideMobileMenu, false);
	document.getElementById("top-buttons-back").addEventListener('click', openOrder, false);
	document.getElementById("bamboo-reward-bt").addEventListener('click', openOrder, false);
	document.getElementById("black-reward-bt").addEventListener('click', openOrder, false);
	document.getElementById("mahogany-reward-bt").addEventListener('click', openOrder, false);
	document.getElementById("top-buttons-bookmark").addEventListener('click', bookmark, false);
	document.getElementById("top-buttons-bookmark-mb").addEventListener('click', bookmark, false);
	document.getElementById("backProject-close").addEventListener('click', closeOrder, false);
	document.getElementById("noPledge-bt").addEventListener('click', selectItem, false);
	document.getElementById("bamboo-bt").addEventListener('click', selectItem, false);
	document.getElementById("black-bt").addEventListener('click', selectItem, false);
	document.getElementById("mahogany-bt").addEventListener('click', selectItem, false);
	document.getElementById("noPledge-continue").addEventListener('click', sendOrder, false);
	document.getElementById("bamboo-continue").addEventListener('click', sendOrder, false);
	document.getElementById("black-continue").addEventListener('click', sendOrder, false);
	document.getElementById("mahogany-continue").addEventListener('click', sendOrder, false);
	document.getElementById("gotIt-bt").addEventListener('click', closeOrder, false);
	document.getElementById("noPledge-inp").addEventListener('keyup', validateNumber, false);
	document.getElementById("bamboo-inp").addEventListener('keyup', validateNumber, false);
	document.getElementById("black-inp").addEventListener('keyup', validateNumber, false);
	document.getElementById("mahogany-inp").addEventListener('keyup', validateNumber, false);
})()
