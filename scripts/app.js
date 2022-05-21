const cards = document.querySelectorAll(".card");

const movesCounter = document.querySelector("p");

const MOVE_DURATION = 500;

let memories = [
  "shrek",
  "fiona",
  "donkey",
  "wolf",
  "shrekhuman",
  "dragon",
  "lord",
  "cat",
];

const counter = {
  shrek: 0,
  fiona: 0,
  donkey: 0,
  wolf: 0,
  shrekhuman: 0,
  dragon: 0,
  lord: 0,
  cat: 0,
  card: [],
  clicks: 0,
  moves: 0,
  pairs: 0
};

cards.forEach((element) => {
  const cardBack = document.createElement("div");
  cardBack.classList.add("cardBack");

  element.addEventListener("click", checkIfCorrect);
  const memoName = memories[Math.floor(Math.random() * memories.length)];

  counter[memoName]++;

  element.dataset.name = memoName;
  element.style.backgroundImage = `url('../assets/photos/${memoName}.png')`;
  element.style.backgroundSize = "cover";
  for (const prop in counter) {
    if (counter[prop] > 1) {
      memories = memories.filter((element) => element !== prop);
    }
  }
  element.appendChild(cardBack);
});

function checkIfCorrect(e) {
  if (counter.clicks >= 2) {
    return;
  }
  if(e.target.classList.contains('card')) {
    return;
  }
  visibility(e);
  if (counter.clicks > 0) {
    if (counter.card[0] === counter.card[1]) {
      cards.forEach((element) => {
        if (element.dataset.name === counter.card[0]) {
          element.removeEventListener("click", checkIfCorrect);
          element.firstChild.classList.add("cardMatched");
          element.classList.add('cardMatchedMain');
        }
      });
      counter.card = [];
      console.log("You got pair!");
      counter.pairs++;
      allowMove(100);
    } else {
      setTimeout(() => {
        cards.forEach((element) => {
          if (element.firstChild.classList.contains("cardBackTransparent")) {
            element.firstChild.classList.remove("cardBackTransparent");
          }
        });
      }, MOVE_DURATION);
      counter.card = [];
      allowMove(MOVE_DURATION);
    }
  }
  counter.clicks++;
  if (counter.clicks > 1) {
    counter.moves++;
  }
  movesCounter.innerText = `Moves: ${counter.moves}`;
  if(counter.pairs === cards.length/2) {
    movesCounter.innerText = `You won! Moves: ${counter.moves}`;
  }
}

function visibility(e) {
  counter.card.push(e.target.closest(".card").dataset.name);
  console.log(counter.card);
  if (!e.target.classList.contains("cardBack")) {
    e.target.firstChild.classList.toggle("cardBackTransparent");
  } else {
    e.target.classList.toggle("cardBackTransparent");
  }
}

function allowMove(time) {
  setTimeout(() => {
    counter.clicks = 0;
  }, time);
}