//Variables
let previousPlayerTurnMoves = [];
let previousOpponentTurnMoves = [];


//Gets random Number
window.onload = genLoadingType();

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
    document.body.style.backgroundImage = "url('imgs/ForestBG.jpg')"
    document.getElementById('loadingType').classList.add('d-none')
    document.getElementById('playArea').classList.remove('d-none')
}