let playerMenuOptions = ["Start", "Options",];
let index = 0;
let firstOptions = true

window.onload = function(){
isMenu()
updatePlayerActionOption()
}
//Arrow Keys for selections if selections go over then they loop
function playerKeyDownsMenuOne(event){
    if(firstOptions === false) return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      index++
      if (index > playerMenuOptions.length - 1){
        index = 0;
        }
        updatePlayerActionOption();
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    index--
    if (index < 0){
        index = playerMenuOptions.length - 1;
}
        updatePlayerActionOption();
  } else if (event.key === 'Enter'){
    playerMenuOptionSelected();
  }
}

//creates the arrow > based on where the index is
  function updatePlayerActionOption(){
    for (let i = 0; i < playerMenuOptions.length; i++) {
      document.getElementsByClassName("selectionBox")[i].textContent =
        playerMenuOptions[i];
    }
    document.getElementsByClassName("selectionBox")[index].textContent =
        "> " + document.getElementsByClassName("selectionBox")[index].textContent;
  }

  //turns on and off event listeners
  function isMenu(){
    if (firstOptions === true){
  window.addEventListener("keydown", playerKeyDownsMenuOne);
    } else{
  window.removeEventListener("keydown", playerKeyDownsMenuOne);
    }
  }

  //button outputs for enter
  function playerMenuOptionSelected(){
    if (firstOptions === false) return;
    if (index === 0){
        selectDungeon()
    } else if (index === 1){
        alert('Wha?')
    }
        
  }

  //Start Menu Appears to Pick Dungeon
  function selectDungeon(){
    firstOptions = false
    document.getElementById('startMenuBG').classList.add('d-none')
    document.getElementById('gameSelectDungeon').classList.remove('d-none')
    isMenu()
  }


  //START OF CODE FOR ACTUAL GAME

  

  //GAME VARIABLES
  let previousPlayerTurnMoves = [];
  let previousOpponentTurnMoves = [];

  //when button is clicked this will get the location (variable) and save it across HTML Pages
  function startGame(location, destinationPage){
    localStorage.setItem("level", location)
    window.location.href = destinationPage
  }

  let level = localStorage.getItem("level");
  if(level === 'forest' || level === 'seas' || level === 'volcano'){
    genLoadingType()
  }
//random number
  function getLoadingNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Random Number Creates A Message For Load Screen (Maybe tips for player in Future)
function genLoadingType() {
  let loadingNumber = getLoadingNumber(0, 3);
  if (loadingNumber === 0){
    document.getElementById('loadingType').innerText =`Traveling...`
  } else if (loadingNumber === 1){
    document.getElementById('loadingType').innerText =`Discovering...`
  } else if (loadingNumber === 2){
    document.getElementById('loadingType').innerText =`Journeying...` 
  } else if (loadingNumber === 3){
    document.getElementById('loadingType').innerText =`Preparing...` 
  }
  //after 4 seconds (4000 milliseconds) it calls this function to make it vanish
  setTimeout(loadScreenVanish, 4000,)
}
//what to do after time delay in genLoadingType
function loadScreenVanish(){
  if(level === 'forest'){
    document.body.style.backgroundImage = "url('imgs/ForestBG.jpg')"
    document.getElementById('loadingType').classList.add('d-none')
    document.getElementById('playArea').classList.remove('d-none')
  } else if(level === 'seas'){
    document.body.style.backgroundImage = "url('imgs/Shores.webp')"
    document.getElementById('loadingType').classList.add('d-none')
    document.getElementById('playArea').classList.remove('d-none')
  } else if(level === 'volcano'){
    document.body.style.backgroundImage = "url('imgs/Volcanic-Wastelands.png')"
    document.getElementById('loadingType').classList.add('d-none')
    document.getElementById('playArea').classList.remove('d-none')
  }
}