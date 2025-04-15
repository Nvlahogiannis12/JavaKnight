let playerMenuOptions = ["Start", "Options",];
let index = 0;
let firstOptions = true
let secondOptions = false
isPlayerTurn()
updatePlayerActionOption()


function playerKeyDowns(event){
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

  function updatePlayerActionOption(){
    for (let i = 0; i < playerMenuOptions.length; i++) {
      document.getElementsByClassName("selectionBox")[i].textContent =
        playerMenuOptions[i];
    }
    document.getElementsByClassName("selectionBox")[index].textContent =
        "> " + document.getElementsByClassName("selectionBox")[index].textContent;
  }
  
  function isPlayerTurn(){
    if (firstOptions === true){
  window.addEventListener("keydown", playerKeyDowns);
    } else{
  window.removeEventListener("keydown", playerKeyDowns);
    }
  }
  function playerMenuOptionSelected(){
    if (firstOptions === false) return;
    if (index === 0){
        alert('yo')
    } else if (index === 1){
        alert('Wha?')
    }
        
  }