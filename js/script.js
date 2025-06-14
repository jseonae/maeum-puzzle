let userState = {
  place: null,
  situation: null,
  feeling: null,
  style: null,
  level: null
};

function nextScreen(id) {
  document.querySelectorAll('.screen').forEach(el => el.classList.remove('show'));
  document.getElementById(id).classList.add('show');
}

function selectOption(type, value) {
  userState[type] = value;
  if (type === 'place') nextScreen('situation-screen');
  else if (type === 'situation') nextScreen('feeling-screen');
  else if (type === 'feeling') nextScreen('style-screen');
  else if (type === 'style') nextScreen('level-screen');
}

function startGame(level) {
  userState.level = level;
  nextScreen('game-screen');
  createBoard(level);
}

function createBoard(level) {
  const board = document.getElementById("game-board");
  board.innerHTML = "";
  const symbols = level === "easy"
    ? ["🍃","🍃","🌸","🌸","☁️","☁️"]
    : ["🍃","🍃","🌸","🌸","☁️","☁️","🌞","🌞","🌙","🌙","⭐","⭐"];
  const shuffled = shuffle([...symbols]);
  shuffled.forEach(symbol => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.symbol = symbol;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let firstCard = null, secondCard = null, lock = false;

function flipCard() {
  if (lock || this.classList.contains("flipped") || this.classList.contains("matched")) return;
  this.textContent = this.dataset.symbol;
  this.classList.add("flipped");
  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lock = true;
    setTimeout(checkMatch, 600);
  }
}

function checkMatch() {
  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
  } else {
    firstCard.textContent = "";
    secondCard.textContent = "";
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
  }
  firstCard = null;
  secondCard = null;
  lock = false;
}

function showPopup() {
  document.getElementById("popup").style.display = "block";
}

function continueGame() {
  document.getElementById("popup").style.display = "none";
}

function goToScreen(id) {
  document.getElementById("popup").style.display = "none";
  nextScreen(id);
}