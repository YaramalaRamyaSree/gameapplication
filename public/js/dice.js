// Global Variables ..
let selectedElement = document.querySelector("#playerOptions");
let submitButton = document.querySelector(".Login-button");
let selectedOption = 0;

// starting the game  ..
function startGame() {
  player1text.textContent = "";
  player2text.textContent = "";
  player3text.textContent = "";
  player4text.textContent = "";
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
  // playerOptions.classList.add("collapse");
  submitButton.classList.remove("collapse");
  feedback.classList.remove("collapse");
}

// Generating random numbers , validating and checking ..

function diceAssign(n){
  if(n === 1){
    return '<p id="player1Num">1</p>';
  }else if(n == 2){
    return '<p id="player2Num">2</p>';
  }else if(n == 3){
    return '<p id="player3Num">3</p>';
  }else if(n == 4){
    return '<p id="player4Num">4</p>';
  }else if(n == 5){
    return '<p id="player5Num">5</p>';
  }else{
    return '<p id="player6Num">6</p>';
  }
}
function check() {
  let numsArray = [];
  if (selectedOption >= 2) {
    var p1RandomNumber = getRandomNumber();
    var p2RandomNumber = getRandomNumber();
    numsArray.push(p1RandomNumber);
    numsArray.push(p2RandomNumber);
    player1text.innerHTML = "<p>" + diceAssign(p1RandomNumber) + "</p>" + "<br>";
    player2text.innerHTML = "<p>" + diceAssign(p2RandomNumber) + "</p>" + "<br>";
  }
  if (selectedOption >= 3) {
    var p3RandomNumber = getRandomNumber();
    numsArray.push(p3RandomNumber);
    player3text.innerHTML = "<p>" + diceAssign(p3RandomNumber) + "</p>" + "<br>";
  }
  if (selectedOption === 4) {
    var p4RandomNumber = getRandomNumber();
    numsArray.push(p4RandomNumber);
    player4text.innerHTML = "<p>" + diceAssign(p4RandomNumber) + "</p>" + "<br>";
  }
  giveFeedback(numsArray);
}

// Helper Functions ..

function getRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 6 + 1);
  return randomNumber;
}

function giveFeedback(numsArray) {
  let maxIndex = 0;
  let tieFLag = false;
  for (let i = 0; i < numsArray.length; i++) {
    if (numsArray[i] > numsArray[maxIndex]) maxIndex = i;
  }
  for (let i = 0; i < numsArray.length; i++) {
    if (numsArray[i] === numsArray[maxIndex] && maxIndex != i) tieFLag = true;
  }

  if (!tieFLag)
    feedback.innerHTML = "Player " + (maxIndex + 1) + " is the Winner🥳 !";
  else feedback.innerHTML = "OOPS ! It's a TIE !!!";
  console.log(numsArray);
}
