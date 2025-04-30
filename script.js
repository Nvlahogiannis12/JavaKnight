let playerMenuOptions = ["Start", "Options"];
let index = 0;
let firstOptions = true;

window.onload = function () {
  isMenu();
  updatePlayerActionOption();
};
//Arrow Keys for selections if selections go over then they loop
function playerKeyDownsMenuOne(event) {
  if (firstOptions === false) return;
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    index++;
    if (index > playerMenuOptions.length - 1) {
      index = 0;
    }
    updatePlayerActionOption();
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    index--;
    if (index < 0) {
      index = playerMenuOptions.length - 1;
    }
    updatePlayerActionOption();
  } else if (event.key === "Enter") {
    playerMenuOptionSelected();
  }
}

//creates the arrow > based on where the index is
function updatePlayerActionOption() {
  for (let i = 0; i < playerMenuOptions.length; i++) {
    document.getElementsByClassName("selectionBox")[i].textContent =
      playerMenuOptions[i];
  }
  document.getElementsByClassName("selectionBox")[index].textContent =
    "> " + document.getElementsByClassName("selectionBox")[index].textContent;
}

//turns on and off event listeners
function isMenu() {
  if (firstOptions === true) {
    window.addEventListener("keydown", playerKeyDownsMenuOne);
  } else {
    window.removeEventListener("keydown", playerKeyDownsMenuOne);
  }
  if (isCurrentTurn === true) {
    window.addEventListener("keydown", playerKeyDownsAction);
  } else {
    window.removeEventListener("keydown", playerKeyDownsAction);
  }
}

//button outputs for enter
function playerMenuOptionSelected() {
  if (firstOptions === false) return;
  if (index === 0) {
    selectDungeon();
  } else if (index === 1) {
  }
}

//Start Menu Appears to Pick Dungeon
function selectDungeon() {
  firstOptions = false;
  document.getElementById("startMenuBG").classList.add("d-none");
  document.getElementById("gameSelectDungeon").classList.remove("d-none");
  isMenu();
}

//START OF CODE FOR ACTUAL GAME

//GAME VARIABLES
let previousPlayerTurnMoves = [];
let playerMoveAction = ["Attack", "Shield", "Surrender"];
let isCurrentTurn = false;
let playerActionChoice = 0;
let roundCount = 1;
let playerHp = 100;
let opponentHp = 100;
let enemy;
let isShielding = false;

//when button is clicked this will get the location (variable) and save it across HTML Pages
function startGame(location, destinationPage) {
  localStorage.setItem("level", location);
  window.location.href = destinationPage;
}

let level = localStorage.getItem("level");
if (level === "forest" || level === "seas" || level === "volcano") {
  genLoadingType();
}
//random number
function getLoadingNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Random Number Creates A Message For Load Screen (Maybe tips for player in Future)
function genLoadingType() {
  let loadingNumber = getLoadingNumber(0, 3);
  if (loadingNumber === 0) {
    document.getElementById("loadingType").innerText = `Traveling...`;
  } else if (loadingNumber === 1) {
    document.getElementById("loadingType").innerText = `Discovering...`;
  } else if (loadingNumber === 2) {
    document.getElementById("loadingType").innerText = `Journeying...`;
  } else if (loadingNumber === 3) {
    document.getElementById("loadingType").innerText = `Preparing...`;
  }
  //after 4 seconds (4000 milliseconds) it calls this function to make it vanish
  setTimeout(loadScreenVanish, 4000);
}
//what to do after time delay in genLoadingType
function loadScreenVanish() {
  if (level === "forest") {
    document.body.style.backgroundImage = "url('imgs/ForestBG.jpg')";
  } else if (level === "seas") {
    document.body.style.backgroundImage = "url('imgs/Shores.webp')";
  } else if (level === "volcano") {
    document.body.style.backgroundImage = "url('imgs/Volcanic-Wastelands.png')";
  }
  document.getElementById("loadingType").classList.add("d-none");
  document.getElementById("playArea").classList.remove("d-none");

  ///FANCY ANIMATION STUFF HERE

  numberCodeEnemy();

  isCurrentTurn = true;
  updatePlayerMoveOption();
  window.addEventListener("keydown", playerKeyDownsAction);
}

function playerKeyDownsAction(event) {
  if (isCurrentTurn === false) return;
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    playerActionChoice++;
    if (playerActionChoice > playerMoveAction.length - 1) {
      playerActionChoice = 0;
    }
    updatePlayerMoveOption();
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    playerActionChoice--;
    if (playerActionChoice < 0) {
      playerActionChoice = playerMoveAction.length - 1;
    }
    updatePlayerMoveOption();
  } else if (event.key === "Enter") {
    playerActionOptionSelected();
  }
}

//creates the arrow > based on where the index is
function updatePlayerMoveOption() {
  for (let count = 0; count < playerMoveAction.length; count++) {
    document.getElementsByClassName("actionChoice")[count].textContent =
      playerMoveAction[count];
  }
  document.getElementsByClassName("actionChoice")[
    playerActionChoice
  ].textContent =
    "> " +
    document.getElementsByClassName("actionChoice")[playerActionChoice]
      .textContent;
}

function playerActionOptionSelected() {
  if (isCurrentTurn === false) return;
  if (playerActionChoice === 0) {
    playerAttacking();
  } else if (playerActionChoice === 1) {
    playerShielding();
  } else {
  }
}

function numberCodeEnemy() {
  let enemyNumber;
  if (roundCount === 1) {
    enemyNumber = 0;
  } else if (roundCount === 2 && level === "forest") {
    enemyNumber = numberGenOp(1, 2);
  } else if (roundCount === 2 && level === "seas") {
    enemyNumber = numberGenOp(3, 4);
  } else if (roundCount === 2 && level === "volcano") {
    enemyNumber = numberGenOp(5, 6);
  } else if (roundCount === 3 && level === "forest") {
    enemyNumber = 7;
  } else if (roundCount === 3 && level === "seas") {
    enemyNumber = 8;
  } else if (roundCount === 3 && level === "volcano") {
    enemyNumber = 9;
  }

  if (enemyNumber === 0) {
    enemy = new Enemy(50, "Slime", 50);
  } else if (enemyNumber === 1) {
    //forest mons 1
    enemy = new Enemy(100, "Thing", 100);
  } else if (enemyNumber === 2) {
    //Forest Mons 2
    enemy = new Enemy(100, "Goblin", 100);
  } else if (enemyNumber === 3) {
    //Seas Mons 1
    enemy = new Enemy(100, "Crab", 100);
  } else if (enemyNumber === 4) {
    //Seas Mons 2
    enemy = new Enemy(100, "Pirate", 100);
  } else if (enemyNumber === 5) {
    //Volcano Mons 1
    enemy = new Enemy(100, "Baby Dragon", 100);
  } else if (enemyNumber === 6) {
    //Volcano Mons 2
    enemy = new Enemy(100, "Rock", 100);
  } else if (enemyNumber === 7) {
    //Forest Boss
    enemy = new Enemy(200, "ForestBoss", 200);
  } else if (enemyNumber === 8) {
    //Seas Boss
    enemy = new Enemy(200, "SeaBoss", 200);
  } else if (enemyNumber === 9) {
    //Volcano Boss
    enemy = new Enemy(200, "VolcanoBoss", 200);
  }
}

function numberGenOp(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateHealthBars() {
  let playerHealthBar = document.getElementById("playerHealthBar");
  let opponentHealthBar = document.getElementById("opponentHealthBar");
  playerHealthBar.setAttribute("style", `width: ${playerHp}%;`);
  opponentHealthBar.setAttribute("style", `width: ${enemy.decrement}%;`);
  if (playerHp <= 0) {
    alert("GAME OVER");
  }
  if (enemy.hp <= 0) {
    alert("Round Win");
    roundCount++;
    numberCodeEnemy();
  }
}

function playerAttacking() {
  let playerAttackDamage = numberGenOp(0, 10);
  if (playerAttackDamage < 6) {
    enemy.hp -= 10;
    //enemy.hp -= enemy.decrement
  } else if (playerAttackDamage >= 6 && playerAttackDamage > 10) {
    enemy.hp -= 20;
  } else {
    enemy.hp -= 30;
  }
  if (enemy.hp <= 0) {
    enemy.hp = 0;
  }
  updateHealthBars();
  isCurrentTurn = false;
  isMenu();
  enemyAttacking();
  previousPlayerTurnMoves.push("Attack");
}

function enemyAttacking() {
  let enemyAttackDamage = numberGenOp(0, 10);
  if (isShielding === true){
    isShielding = false
    return;
  }
  else if (enemyAttackDamage < 6) {
    playerHp -= 10;
  } else if (enemyAttackDamage >= 6 && enemyAttackDamage > 10) {
    playerHp -= 20;
  } else {
    playerHp -= 30;
  }
  if (playerHp <= 0) {
    playerHp = 0;
  }
  updateHealthBars();
  isCurrentTurn = true;
  isMenu();
}

function playerShielding() {
  alert("workin");
  isShielding = true
  enemy.hp -= 5
  previousPlayerTurnMoves.push("Shield");
}

//Source: Remy
class Enemy {
  hp;
  name;
  maxHealth;
  constructor(hp, name, maxHealth) {
    this.hp = hp;
    this.name = name;
    this.maxHealth = maxHealth;
  }
  stats() {
    return `My HP is ${this.hp}`;
  }
  get decrement() {
    //solve equation for decrement value;

    return (this.hp / this.maxHealth) * 100;
  }
}

/*
//Demonstration
let slime = new Enemy(100, "Slime");
let skeleton = new Enemy(50, "Skeleton");
console.log("slime", slime, slime.stats());
console.log("skeleton", skeleton);

*/
// End of code learned from Remy
