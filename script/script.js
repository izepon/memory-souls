//Declaração variáveis:

const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";
const BACK_ICON = "back_icon";

let hudTimer = document.getElementById("timePassed");
let hudMoves = document.getElementById("numberActions");

let finalTime = document.getElementsByClassName("endTimer")[0];
let finalMoves = document.getElementsByClassName("endMoves")[0];
let gameOverScreen = document.getElementById("gameOver");

let madeMove = false;

let moves;
let timer;

let seconds;
let minutes;
let hours;

startGame();

//Função de iniciar o jogo.
function startGame() {
  hudTimer.innerHTML = "00:00:00";
  hudMoves.innerHTML = "0";
  madeAMove = false;
  seconds = 0;
  minutes = 0;
  hours = 0;
  moves = 0;

  initializeCards(game.createCardFromSouls());
}

//Função contar tempo:
function countTime() {
  seconds = parseInt(seconds);
  minutes = parseInt(minutes);
  hours = parseInt(hours);

  seconds++;

  if (seconds >= 60) {
    seconds = 0;
    minutes += 1;
  }

  if (minutes >= 60) {
    minutes = 0;
    hours += 1;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (hours < 10) {
    hours = "0" + hours;
  }

  hudTimer.innerHTML = hours + ":" + minutes + ":" + seconds;
}

//Função que insere as cartas no html.
function initializeCards(cards) {
  let gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  game.cards.forEach((card) => {
    let cardElement = document.createElement("div");
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;

    createCardContent(card, cardElement);

    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

//Função que identifica e cria a carta frente ou trás.
function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement("div");
  cardElementFace.classList.add(face);
  if (face == FRONT) {
    let iconElement = document.createElement("img");
    iconElement.classList.add(ICON);
    iconElement.src = "./assets/images/" + card.icon + ".png";
    cardElementFace.appendChild(iconElement);
  } else {
    let backFace = document.createElement("img");
    backFace.classList.add(BACK_ICON);
    backFace.src = "./assets/images/backcard.jpg";
    cardElementFace.appendChild(backFace);
  }
  element.appendChild(cardElementFace);
}

//Função que vira as cartas ao clicar
function flipCard() {
  if (!madeMove) {
    timer = setInterval(countTime, 1000);
    madeMove = true;
  }

  if (game.setCard(this.id)) {
    this.classList.add("flip");
    if (game.secondCard) {
      updateMoveUI();

      if (game.checkMatch()) {
        game.clearCards();

        if (game.checkGameOver()) {
          setTimeout(() => {
            clearInterval(timer);
            finalTime.innerHTML = "Tempo de jogo: " + hudTimer.innerHTML;
            finalMoves.innerHTML =
              "Você precisou de " + moves + " movimentos para vencer.";
            gameOverScreen.style.display = "flex";
          }, 200);
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);

          firstCardView.classList.remove("flip");
          secondCardView.classList.remove("flip");
          game.unflipCards();
        }, 500);
      }
    }
  }
}
//Atualiza movimento realizado
function updateMoveUI() {
  moves++;
  hudMoves.innerHTML = moves;
}

//Reinicio do jogo
function restart() {
  flipAllCards();

  setInterval(() => {
    game.clearCards();
    startGame();

    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = "none";
  }, 600);
}

function flipAllCards() {
  game.cards.forEach((card) => {
    let currentCard = document.getElementById(card.id);
    currentCard.classList.remove("flip");
  });
}
