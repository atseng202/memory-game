"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  let idx = 0;
  for (let color of colors) {
    // missing code here ...
    let newCard = document.createElement("div");
    const cardClasses = ["card", color];
    newCard.classList.add(...cardClasses);
    newCard.id = `card-${idx}`;
    idx += 1;

    // can access card color with data-color but may not use 
    newCard.dataset.color = color;

    // Add click event listener
    newCard.addEventListener("click", handleCardClick);

    // Append card to our DOM
    let cardsList = document.querySelector(".cards-list");
    cardsList.append(newCard);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  // first of classlist is "card", second of classList is color 
  card.style.backgroundColor = card.classList[1];
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  card.style.backgroundColor = "white";
}

/** Handle clicking on a card: this could be first-card or second-card. */

// track click and matched
let clicks = 0;
let clickedCards = [];
let matched = new Set();

function handleCardClick(evt) {
  // ... you need to write this ...
  // change color if the click is less than 2 and it is not Matched 
  let isMatched = matched.has(evt.target.id);
  if (clicks < 2 && !isMatched) {
    flipCard(evt.target);
    console.log(clicks);
    clickedCards.push(evt.target);
    clicks++;
    //prevent same card clicking 
    if (clickedCards.length === 2 && clickedCards[0].id === evt.target.id) {
      clicks--;
      clickedCards.pop();
    }
    console.log(clickedCards);
  }

  if (clicks === 2) {
    //if cards are the same, flip
    let firstCard = clickedCards[0];
    let secondCard = clickedCards[1];
    if (firstCard.classList[1] !== secondCard.classList[1]) {
      console.log('color1', firstCard.classList[1]);
      console.log('color2', secondCard.classList[1]);
      // set timeout and unflip 
      setTimeout(function () {
        unFlipCard(firstCard);
        unFlipCard(secondCard);
        //clear
        clicks = 0;
        clickedCards = [];
      }, FOUND_MATCH_WAIT_MSECS)
      console.log("clearing clicks")


    }
    // if matching colors, do not unflip, clear 
    else {
      matched.add(firstCard.id);
      matched.add(secondCard.id);
      clicks = 0;
      clickedCards = [];
    }

  }

}
