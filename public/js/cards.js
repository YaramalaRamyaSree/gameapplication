// Global Variables ..
let selectedElement = document.querySelector("#playerOptions");
let submitButton = document.querySelector(".Login-button");
let selectedOption = 0;
let cards = [];

// Card Class
class Card {
  constructor(value, color, symbol,face) {
    this.value = value;
    this.color = color;
    this.symbol = symbol;
    this.face = face;
  }

  display() {
    return this.face + " of ";
  }
}

getcards();

// starting the game  ..
function startGame() {
  let currentOption = Number(
    selectedElement.options[selectedElement.selectedIndex].value
  );
  selectedOption = currentOption;
  if (selectedOption >= 2) {
    player1.classList.remove("collapse");
    player2.classList.remove("collapse");
    player3.classList.add("collapse");
    player4.classList.add("collapse");
  }
  if (selectedOption >= 3) {
    player3.classList.remove("collapse");
    player4.classList.add("collapse");
  }
  if (selectedOption === 4) {
    player4.classList.remove("collapse");
  }
  submitButton.classList.remove("collapse");
  feedback.classList.remove("collapse");
  numcards.max = Math.floor(52 / currentOption);
  numcards.value = 1;
}

function getcards() {
  for (let i = 2; i <= 14; i++) {
    let face = i;
    if(i === 11){
      face = "Jack";
    }else if(i === 12){
      face = "Queen";
    }else if(i === 13){
      face = "King";
    }else if(i === 14){
      face = "A";
    }
    cards.push(new Card(i, "black", "spades",face));
    cards.push(new Card(i, "black", "clubs",face));
    cards.push(new Card(i, "red", "daimonds",face));
    cards.push(new Card(i, "red", "hearts",face));
  }
}

// Generating random cards , validating and checking ..

function check() {
  cards = cards.sort(() => Math.random() - 0.5);
  cards = cards.sort(() => Math.random() - 0.5);
  let playersArray = [];
  if (selectedOption >= 2) {
    let p1Array = cards.slice(0, numcards.value);
    let p2Array = cards.slice(numcards.value, 2 * numcards.value);
    playersArray.push(p1Array);
    playersArray.push(p2Array);
    printcardsSelected(player1text, p1Array);
    printcardsSelected(player2text, p2Array);
  }
  if (selectedOption >= 3) {
    let p3Array = cards.slice(2 * numcards.value, 3 * numcards.value);
    playersArray.push(p3Array);
    printcardsSelected(player3text, p3Array);
  }
  if (selectedOption === 4) {
    let p4Array = cards.slice(3 * numcards.value, 4 * numcards.value);
    playersArray.push(p4Array);
    printcardsSelected(player4text, p4Array);
  }
  giveFeedback(playersArray);
}

// Helper Functions ..

function giveFeedback(playersArray) {
  let maxIndex = 0;
  sumsArray = [];
  getSums(sumsArray, playersArray);
  let tieFLag = false;
  for (let i = 0; i < sumsArray.length; i++) {
    if (sumsArray[i] > sumsArray[maxIndex]) maxIndex = i;
  }
  for (let i = 0; i < sumsArray.length; i++) {
    if (sumsArray[i] === sumsArray[maxIndex] && maxIndex != i) tieFLag = true;
  }

  if (!tieFLag)
    feedback.innerHTML = "Player " + (maxIndex + 1) + " is the Winner🥳 !";
  else feedback.innerHTML = "OOPS ! It's a TIE !!!";
}

function getSums(sumsArray, playersArray) {
  for (let i = 0; i < playersArray.length; i++) {
    let sum = 0;
    for (let j = 0; j < playersArray[i].length; j++) {
      sum += playersArray[i][j].value;
    }
    sumsArray.push(sum);
  }
}

function printcardsSelected(playerID, playersArray) {
  playerID.innerHTML = "";
  for (let i = 0; i < playersArray.length; i++) {
    playerID.innerHTML += "<span>" + playersArray[i].display() + "</span>";
    if (playersArray[i].symbol === "clubs") {
      playerID.innerHTML +=
        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-suit-club-fill" viewBox="0 0 16 16">
      <path d="M11.5 12.5a3.493 3.493 0 0 1-2.684-1.254 19.92 19.92 0 0 0 1.582 2.907c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847a19.919 19.919 0 0 0 1.582-2.907 3.5 3.5 0 1 1-2.538-5.743 3.5 3.5 0 1 1 6.708 0A3.5 3.5 0 1 1 11.5 12.5z"/>
    </svg>` + " <br>";
    } else if (playersArray[i].symbol === "spades") {
      playerID.innerHTML +=
        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-suit-spade-fill" viewBox="0 0 16 16">
      <path d="M7.184 11.246A3.5 3.5 0 0 1 1 9c0-1.602 1.14-2.633 2.66-4.008C4.986 3.792 6.602 2.33 8 0c1.398 2.33 3.014 3.792 4.34 4.992C13.86 6.367 15 7.398 15 9a3.5 3.5 0 0 1-6.184 2.246 19.92 19.92 0 0 0 1.582 2.907c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847a19.919 19.919 0 0 0 1.582-2.907z"/>
    </svg>` + " <br>";
    } else if (playersArray[i].symbol === "diamonds") {
      playerID.innerHTML +=
        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-suit-diamond-fill" viewBox="0 0 16 16">
      <path d="M2.45 7.4 7.2 1.067a1 1 0 0 1 1.6 0L13.55 7.4a1 1 0 0 1 0 1.2L8.8 14.933a1 1 0 0 1-1.6 0L2.45 8.6a1 1 0 0 1 0-1.2z"/>
    </svg>` + " <br>";
    } else {
      playerID.innerHTML +=
        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
      <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
    </svg>` + " <br>";
    }
  }
}
