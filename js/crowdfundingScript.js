// JavaScript Document



/**
 * Displays the mobile menu by setting it to "flex" and hides the logo and hamburger menu icons.
 */

const showMobileMenu = () => {
	document.getElementById("menu-mobile").style.display = "flex";
	document.getElementById("menu-logo").style.display = "none";
	document.getElementById("menu-hamburger").style.display = "none";
}

/**
 * Hides the mobile menu by setting it to "none" and shows the logo and hamburger menu icons.
 */

const hideMobileMenu = () => {
	document.getElementById("menu-mobile").style.display = "none";
	document.getElementById("menu-logo").style.display = "flex";
	document.getElementById("menu-hamburger").style.display = "flex";
}

/**
 * Toggles the bookmark button state between bookmarked and not bookmarked.
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
 * Opens the order window and highlights the selected pledge option if available.
 * @param {Event} event - The click event of the button that opens the order window.
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
 * Resets pledge values to default, unchecks radio buttons, resets border colors, and hides pledge options.
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
 * Highlights a selected product option, displays corresponding pledge input, and changes the border color.
 * @param {Event} event - The click event of the button that selects the pledge option.
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
 * Retrieves the total amount backed as an integer after removing thousand separators.
 * @returns {number} - Total backed amount as an integer.
 */
const getTotalBacked = ()=>{
    let totalBacked =document.querySelector('#backed').innerText.substring(1);
	totalBacked = totalBacked.replace(/\./g, '');
	totalBacked = parseInt(totalBacked);
	return(totalBacked);
}

/**
 * Updates the progress bar based on the total backed amount compared to the goal of $100,000.
 */
const setProgressBar = ()=>{
    const backgroundBar = document.getElementById('data-backgroundBar');
    const backgroundBarWidth = backgroundBar.offsetWidth;
    const totalBacked = getTotalBacked();
    const progressBarWidth = (backgroundBarWidth * totalBacked) / 100000;
	progressBarWidth <= backgroundBarWidth ?  
    document.getElementById('data-progressBar').style.width = `${progressBarWidth}px` :
	document.getElementById('data-progressBar').style.width = `${backgroundBarWidth}px`;
}

/**
 * Increases the total backed amount and the number of backers, then updates the progress bar.
 * @param {string} pledgeAmount - Pledge amount donated by the user.
 */
const increaseBacked = (pledgeAmount) => {
	const totalBacked = getTotalBacked();
    const totalBackers = document.querySelector('#backers').innerText;
    const newTotal = totalBacked + parseInt(pledgeAmount);
    document.querySelector('#backed').textContent = `$${newTotal.toLocaleString()}`;
    document.querySelector('#backers').textContent = parseInt(totalBackers) + 1;
	setProgressBar();
}

/**
 * Displays a thank-you message and increases the total backed amount and number of backers.
 * @param {Event} event - The click event of the button that confirms the pledge.
 */
const sendOrder = (event,pledgeAmount)=>{
	const pledgeValue = event.target.attributes["id"].value;
	if (validatePledge(pledgeValue)) {
		document.getElementById("orderCompleted").style.display = "flex";
		document.getElementById("backProject").style.display = "none";
		increaseBacked(pledgeAmount);
	}
}

/**
 * Closes the order window and the thank-you message.
 */

const closeOrder = () => {
	document.getElementById("order").style.display = "none";
	document.getElementById("backProject").style.display = "none";
	document.getElementById("orderCompleted").style.display = "none";
}

/**
 * Validates that the pledge input only contains numbers, is not empty, and does not start with zero.
 * @param {Event} event - The input event for the pledge input field.
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
 * Validates the pledge amount for each reward tier, adjusting it to the minimum allowed
 * value if the input is below the required amount. Returns true if the pledge amount meets 
 * the minimum requirement, or false otherwise.
 * @param {string} source - The ID of the source element triggering the validation.
 * @returns {boolean} - True if the pledge amount is valid, false otherwise.
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
	document.getElementById("noPledge-continue").addEventListener('click', (event)=>sendOrder(event,document.getElementById('noPledge-inp').value), false);
	document.getElementById("bamboo-continue").addEventListener('click', (event)=>sendOrder(event,document.getElementById('bamboo-inp').value), false);
	document.getElementById("black-continue").addEventListener('click', (event)=>sendOrder(event,document.getElementById('black-inp').value), false);
	document.getElementById("mahogany-continue").addEventListener('click', (event)=>sendOrder(event,document.getElementById('mahogany-inp').value), false);
	document.getElementById("gotIt-bt").addEventListener('click', closeOrder, false);
	document.getElementById("noPledge-inp").addEventListener('keyup', validateNumber, false);
	document.getElementById("bamboo-inp").addEventListener('keyup', validateNumber, false);
	document.getElementById("black-inp").addEventListener('keyup', validateNumber, false);
	document.getElementById("mahogany-inp").addEventListener('keyup', validateNumber, false);
})()
