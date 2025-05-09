let playerMenuOptions = ["Start", "Rules", "Monsters"];
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
  } else if (isCurrentTurn === false) {
    window.removeEventListener("keydown", playerKeyDownsAction);
  }
}

//button outputs for enter
function playerMenuOptionSelected() {
  if (firstOptions === false) return;
  if (index === 0) {
    selectDungeon();
  } else if (index === 1) {
    rules("entering");
  } else if (index == 2) {
    alert("monsterDex");
  }
}

//Start Menu Appears to Pick Dungeon
function selectDungeon() {
  firstOptions = false;
  document.getElementById("startMenuBG").classList.add("d-none");
  document.getElementById("gameSelectDungeon").classList.remove("d-none");
  isMenu();
}

function rules(gateway) {
  firstOptions = false;
  if (gateway === "entering") {
    document.getElementById("startMenuBG").classList.add("d-none");
    document.getElementById("rulesSelect").classList.remove("d-none");
  } else if (gateway === "exit") {
    document.getElementById("rulesSelect").classList.add("d-none");
    document.getElementById("startMenuBG").classList.remove("d-none");
    firstOptions = true;
  }
}
/////////////////////////////////////////////////////////////////////
//START OF CODE FOR ACTUAL GAME

//GAME VARIABLES
let previousPlayerTurnMoves = [];
let playerMoveAction = ["Attack", "Shield", "Surrender"];
let isCurrentTurn = false;
let playerActionChoice = 0;
let roundCount = 1;
let playerHp = 100;
let maxPlayerHp = 100;
let opponentHp = 100;
let enemy;
let isShielding = false;
let damageMultiplier = 1;
let displayHp;
let monstersSeen = [];
let monstersLocated = JSON.parse(sessionStorage.getItem("enemies"));
//when button is clicked this will get the location (variable) and save it across HTML Pages
function startGame(location, destinationPage) {
  function innerStartGame() {
    localStorage.setItem("level", location);
    window.location.href = destinationPage;
  }
  // Add flash class to all dungeon buttons
  document.querySelectorAll(".dungeonBtn").forEach((btn) => {
    btn.classList.add("flash");
  });

  // Hide all dungeon buttons that are NOT the selected location
  const btns = Array.from(
    document.querySelectorAll(`.dungeonBtn:not(.${location})`)
  );
  btns.forEach((btn) => {
    btn.classList.add("d-none");
  });

  setTimeout(innerStartGame, 2000);
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
  if (document.getElementById("loadingType")) {
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
    gameEnding("You lose");
    playerHp = 0;
    updateHealthBars();
  }
}

function numberCodeEnemy() {
  let enemyNumber;
  if (roundCount === 1) {
    enemyNumber = 0;
  } else if (roundCount === 2 && level === "forest") {
    enemyNumber = numberGenOp(1, 1);
  } else if (roundCount === 2 && level === "seas") {
    enemyNumber = numberGenOp(3, 3);
  } else if (roundCount === 2 && level === "volcano") {
    enemyNumber = numberGenOp(6, 6);
  } else if (roundCount === 3 && level === "forest") {
    enemyNumber = 7;
  } else if (roundCount === 3 && level === "seas") {
    enemyNumber = 8;
  } else if (roundCount === 3 && level === "volcano") {
    enemyNumber = 9;
  }

  if (enemyNumber === 0) {
    enemy = new Enemy(50, "Slime", 50);
    document.getElementById("opponentCharacter").src =
      "imgs/Slime_JavaKnight.png";
    check(1);
  } else if (enemyNumber === 1) {
    //forest mons 1
    enemy = new Enemy(100, "Thing", 100);
    document.getElementById("opponentCharacter").src =
      "imgs/Chicken_JavaKnight.png";
    check(2);
  } else if (enemyNumber === 2) {
    //Forest Mons 2
    enemy = new Enemy(100, "Goblin", 100);
    check(3);
  } else if (enemyNumber === 3) {
    //Seas Mons 1
    enemy = new Enemy(100, "Crab", 100);
    document.getElementById("opponentCharacter").src =
      "imgs/Crab_JavaKnight.png";
    check(4);
  } else if (enemyNumber === 4) {
    //Seas Mons 2
    enemy = new Enemy(100, "Pirate", 100);
    check(5);
  } else if (enemyNumber === 5) {
    //Volcano Mons 1
    enemy = new Enemy(100, "Baby Dragon", 100);
    check(6);
  } else if (enemyNumber === 6) {
    //Volcano Mons 2
    enemy = new Enemy(100, "Rock", 100);
    document.getElementById("opponentCharacter").src =
      "imgs/Rock_JavaKnight.png";
    check(7);
  } else if (enemyNumber === 7) {
    //Forest Boss
    enemy = new Enemy(200, "ForestBoss", 200);
    document.getElementById("opponentCharacter").src =
      "imgs/Tree_Monster_JavaKnight.png";
    check(8);
  } else if (enemyNumber === 8) {
    //Seas Boss
    enemy = new Enemy(200, "SeaBoss", 200);
    document.getElementById("opponentCharacter").src =
      "imgs/Pirate_JavaKnight.png";
    check(9);
  } else if (enemyNumber === 9) {
    //Volcano Boss
    enemy = new Enemy(200, "VolcanoBoss", 200);
    document.getElementById("opponentCharacter").src =
      "imgs/Lava_JavaKnight.png";
    check(10);
  }
}

function check(num) {
  if (!monstersSeen.includes(Number(num))) {
    monstersSeen.push(Number(num));
  }
}

function numberGenOp(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateHealthBars() {
  playerHpCalc();
  let playerHealthBar = document.getElementById("playerHealthBar");
  let opponentHealthBar = document.getElementById("opponentHealthBar");
  playerHealthBar.setAttribute("style", `width: ${displayHp}%;`);
  opponentHealthBar.setAttribute("style", `width: ${enemy.decrement}%;`);
  if (playerHp <= 0) {
    isCurrentTurn = false;
    isMenu();
    document.getElementById("resultBox").classList.remove("d-none");
    gameEnding("-You Lose-");
  }
  if (enemy.hp <= 0) {
    isCurrentTurn = false;
    isMenu();
    if (roundCount < 3) {
      document.getElementById("boostOption").classList.remove("d-none");
    } else {
      document.getElementById("resultBox").classList.remove("d-none");
      gameEnding("-You Win-");
    }
  }
}

function playerAttacking() {
  let playerAttackDamage = numberGenOp(0, 10);
  if (playerAttackDamage < 6) {
    enemy.hp -= 10 * damageMultiplier;
  } else if (playerAttackDamage >= 6 && playerAttackDamage > 10) {
    enemy.hp -= 20 * damageMultiplier;
  } else {
    enemy.hp -= 30 * damageMultiplier;
  }
  if (enemy.hp <= 0) {
    enemy.hp = 0;
  }
  updateHealthBars();
  isCurrentTurn = false;
  isMenu();
  isShielding = false;
  enemyAttacking();
  previousPlayerTurnMoves.push("Attack");
}

function enemyAttacking() {
  let enemyAttackDamage = numberGenOp(0, 10);
  if (isShielding == true) {
  } else if (enemyAttackDamage < 6) {
    playerHp -= 10;
  } else if (enemyAttackDamage >= 6 && enemyAttackDamage > 10) {
    playerHp -= 20;
  } else {
    playerHp -= 30;
  }
  if (playerHp <= 0) {
    playerHp = 0;
  }
  isCurrentTurn = true;
  updateHealthBars();
  isMenu();
}

function playerShielding() {
  if (
    previousPlayerTurnMoves[previousPlayerTurnMoves.length - 1] === "Shield"
  ) {
    alert("You can't shield twice in a row!");
  } else {
    isShielding = true;
    enemy.hp -= 5;
    previousPlayerTurnMoves.push("Shield");
    updateHealthBars();
  }
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

function boost(selected) {
  playerHp = maxPlayerHp;
  if (selected === "health") {
    playerHp = playerHp * 1.5;
    maxPlayerHp = maxPlayerHp * 1.5;
  } else {
    damageMultiplier = damageMultiplier * 1.5;
  }
  roundCount++;
  numberCodeEnemy();
  updateHealthBars();
  isCurrentTurn = true;
  isMenu();
  document.getElementById("boostOption").classList.add("d-none");
}

function playerHpCalc() {
  displayHp = (playerHp / maxPlayerHp) * 100;
}

function gameEnding(result) {
  document.getElementById("resultOfGame").innerText = `${result}`;
  //saves an array
  let temp = JSON.parse(sessionStorage.getItem("enemies"));
  if (temp) {
    temp.push(...monstersSeen);
    //removed duplicates in saved array (enemies)
    temp = [...new Set(temp)];
    sessionStorage.setItem("enemies", JSON.stringify(temp));
  } else sessionStorage.setItem("enemies", JSON.stringify(monstersSeen));
}

//Cache Clear Code
window.addEventListener("keydown", (event) => {
  if (event.key == "!") {
    alert("Cache Cleared");
    sessionStorage.setItem("enemies", null);
  }
});
