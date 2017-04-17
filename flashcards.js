// dependency for inquirer npm package
var inquirer = require("inquirer");

// Create basic flashcard constructor
function BasicCard(front, back) {
	this.front = front;
	this.back = back;
}

// Create ClozeCard flashcard constructor
function ClozeCard(text, cloze) {
	this.text = text;
	this.cloze = cloze;
}

// Methods listed below in prototype format
ClozeCard.prototype.returnCloze = function() {
	console.log(this.cloze);
};

ClozeCard.prototype.returnPartial = function() {
	console.log(this.text.replace(this.cloze, "..."));

};

ClozeCard.prototype.returnFull = function() {
	console.log(this.text);
}

ClozeCard.prototype.checkError = function() {
	if (this.text.search(this.cloze) === -1) {
		console.log("The cloze statement is not contained within the full text.")
	}
}


// Created arrays to store the cards, but could not get more than one piece of inquirer response data to persist in these arrays
var basicCards = [];
var clozeCards = [];

// Took a stab at the front-end user interface with the below
inquirer.prompt([
{
	type: "list",
	message: "What kind of flashcard would you like to create?",
	choices: ["Basic Card", "Cloze Card"],
	name: "cardType"
}
]).then(function(user) {
	if (user.cardType === "Basic Card") {
		inquirer.prompt([
		{
			type: "input",
			message: "Enter text for front of Basic Card",
			name: "basicCardFront"
		}, {
			type: "input",
			message: "Enter text for back of Basic Card",
			name: "basicCardBack"
		}
	]).then(function(answers) {
		var basicCard = new BasicCard(answers.basicCardFront, answers.basicCardBack);
		console.log(basicCard);
		basicCards.push(basicCard);
		console.log(basicCards);
	})
	}
	else if (user.cardType === "Cloze Card") {
		inquirer.prompt([
		{
			type: "input",
			message: "Enter full text",
			name: "clozeCardFullText"
		}, {
			type: "input",
			message: "Enter cloze deletion",
			name: "clozeCardCloze"
		}
	]).then(function(answers) {
		if(answers.clozeCardFullText.search(answers.clozeCardCloze) === -1) {
			console.log("Error: the cloze statement is not contained within the full text.");
		} else {
				var clozeCard = new ClozeCard(answers.clozeCardFullText, answers.clozeCardCloze);
				console.log(clozeCard);
				clozeCards.push(clozeCard);
				console.log("New card created succesfully.")
		}
	})
	}
})

// Below was to test that the properties and methods of new objects functioned properly:
// var firstState = new ClozeCard("The first state in the US was Delaware", "Montana");
// firstState.checkError();
// firstState.returnCloze();
// firstState.returnPartial();
// firstState.returnFull();

