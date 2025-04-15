let playerMenuOptions = ["Start", "Options",];
let index = 0;
let firstOptions = true
let secondOptions = false
isMenu()
updatePlayerActionOption()

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
    secondOptions = true
    document.getElementById('startMenuBG').classList.add('d-none')
    document.getElementById('gameSelectDungeon').classList.remove('d-none')
    isMenu()
  }