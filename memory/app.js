document.addEventListener("DOMContentLoaded", () => {
  const cardArray = [
    {
      name: "cards",
      img: "images/cards.svg",
    },
    {
      name: "cards",
      img: "images/cards.svg",
    },
    {
      name: "fish-tank",
      img: "images/fish-tank.svg",
    },
    {
      name: "fish-tank",
      img: "images/fish-tank.svg",
    },
    {
      name: "ping-pong",
      img: "images/ping-pong.svg",
    },
    {
      name: "ping-pong",
      img: "images/ping-pong.svg",
    },
    {
      name: "rubik",
      img: "images/rubik.svg",
    },
    {
      name: "rubik",
      img: "images/rubik.svg",
    },
    {
      name: "skincare",
      img: "images/skincare.svg",
    },
    {
      name: "skincare",
      img: "images/skincare.svg",
    },
    {
      name: "cactus",
      img: "images/cactus.svg",
    },
    {
      name: "cactus",
      img: "images/cactus.svg",
    },
  ];

  //NOTE CREATE BOARD !!!
  const grid = document.querySelector(".grid");
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let result = document.querySelector("#result");
  let health = document.querySelector(".health");
  let healthPoints = 100;

  function createBoard() {
    cardArray.sort(() => 0.5 - Math.random());
    grid.innerHTML = "";
    for (let i = 0; i < cardArray.length; i++) {
      let card = document.createElement("img");
      card.setAttribute("src", "images/blank.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.append(card);
    }
  }
  createBoard();

  // Check for matches...
  function checkForMatches() {
    let cards = document.querySelectorAll("img");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].setAttribute("src", cardArray[optionOneId].img);
      cards[optionTwoId].setAttribute("src", cardArray[optionTwoId].img);
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute("src", "images/blank.png");
      cards[optionTwoId].setAttribute("src", "images/blank.png");
      healthPoints -= 25;
      health.style.width = healthPoints + "%";
      health.textContent = healthPoints + "%";
    }
    cardsChosen = [];
    cardsChosenId = [];
    // result.textContent = cardsWon.length;
    if (healthPoints === 0) {
      result.textContent = "You Lost!";
      result.style.color = "red";
      removeAllEventListeners();
    }
    if (cardsWon.length === cardArray.length / 2) {
      result.style.color = "lime";
      result.textContent = "You Won !";
    }
  }

  // Flip Card..
  function flipCard() {
    let cardId = this.getAttribute("data-id");
    if (cardsChosen.length < 3 || cardsChosenId.length < 3) {
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute("src", cardArray[cardId].img);
    }
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatches, 400);
    }
  }

  // Reset Game..
  const reset = document.querySelector("button");
  reset.addEventListener("click", () => {
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    result.textContent = "";
    healthPoints = 100;
    health.style.width = "100%";
    health.textContent = "100%";
    createBoard();
  });

  function removeAllEventListeners() {
    let cards = document.querySelectorAll("img");
    cards.forEach((card) => {
      card.removeEventListener("click", flipCard);
    });
  }
});
