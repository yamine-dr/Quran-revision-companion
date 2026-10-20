// inspiration for card flip feature:
// https://dev.to/michael-gokey/flip-for-knowledge-building-a-flashcard-game-with-html-css-javascript-3o9j

const card = document.querySelector(".card");
const cardFront = document.querySelector(".card-front");
const cardBack = document.querySelector(".card-back");

card.addEventListener("click", () => {
  let isFlipped = card.classList.toggle("flipped");
  setTimeout(() => {
    if (isFlipped) {
      cardFront.hidden = true;
      cardBack.hidden = false;
    } else {
      cardFront.hidden = false;
      cardBack.hidden = true;
    }
  }, 150);
});