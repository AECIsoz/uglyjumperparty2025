document.addEventListener("DOMContentLoaded", () => {
  // card options - an array of objects with two key/value pairs
  const cardArray = [
    {
      name: "canes",
      img: "memory-images/canes.png",
      number: 1,
    },

    {
      name: "christmas-tree",
      img: "memory-images/christmas-tree.png",
      number: 2,
    },

    {
      name: "glögg",
      img: "memory-images/glogg.png",
      number: 3,
    },

    {
      name: "halmstar",
      img: "memory-images/halmstar.png",
      number: 4,
    },

    {
      name: "parcel_bauble",
      img: "memory-images/parcel_bauble.png",
      number: 5,
    },

    {
      name: "skater",
      img: "memory-images/skater.png",
      number: 6,
    },

    {
      name: "skier",
      img: "memory-images/skier.png",
      number: 7,
    },

    {
      name: "snowman",
      img: "memory-images/snowman.png",
      number: 8,
    },

    {
      name: "sledging",
      img: "memory-images/sledging.png",
      number: 9,
    },

    {
      name: "star",
      img: "memory-images/star.png",
      number: 10,
    },
  ];

  // create new card array to hold half the cards
  let newCardArray = [];
  // get a variable to hold a random number
  let randomNumber;
  // write a function to get a random number between 1 and 2
  let getRandomNumber = function (min, max) {
    randomNumber = Math.floor(Math.random() * (max - min) + min);
    return randomNumber;
  };
  // run the function to get the number
  getRandomNumber(1, 3);
  // console log the number to check what it is, just for testing purposes
  console.log(randomNumber);

  // sort through the card array and push cards to the new array twice to get pairs
  cardArray.forEach((e) => {
    newCardArray.push(e);
    newCardArray.push(e);
  });
  // console log the new cards array to see that it's even or odd cards, just for testing purposes
  console.log(newCardArray);

  newCardArray.sort(() => 0.5 - Math.random());

  // variable to hold the grid, targeted by its class of "grid"
  const grid = document.querySelector(".grid");
  // variable to hold the div where the result will be displayed, targeted by its id of "result"
  const resultDisplay = document.querySelector("#result");
  // empty arrays for later
  var cardsChosen = [];
  var cardsChosenId = [];
  var cardsWon = [];

  // create game board

  function createBoard() {
    // loop through array of cards
    for (let i = 0; i < newCardArray.length; i++) {
      // variable to hold the new element of the type "img"
      var card = document.createElement("img");
      // assign class to put padding around cards
      card.setAttribute("class", "grid-image");
      // set default image of current card by locating its src and adding path to image
      card.setAttribute("src", "images/Logo_ny.webp");
      // give each card a data-id using i
      card.setAttribute("data-id", i);
      // add event listener to card so that it flips when clicked
      card.addEventListener("click", flipCard);
      // add the card to the grid
      grid.appendChild(card);
    }
  }

  // check for matches
  function checkForMatch() {
    // variable that represents each image using query selector "img"
    var cards = document.querySelectorAll("img");
    // variables to hold the id of the cards that have been clicked
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    // check if the ids of the two clicked cards match
    if (cardsChosen[0] === cardsChosen[1]) {
      //alert('You found a match')
      cards[optionOneId].setAttribute("src", "images/blank.png");
      cards[optionTwoId].setAttribute("src", "images/blank.png");
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute("src", "images/Logo_ny.webp");
      cards[optionTwoId].setAttribute("src", "images/Logo_ny.webp");
      //alert('Sorry, try again')
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === newCardArray.length / 2) {
      resultDisplay.textContent = "Congratulations! You found all the pairs.";
    }
  }

  // flip card

  function flipCard() {
    // variable to hold the attribute of data-id of the card that has been clicked
    var cardId = this.getAttribute("data-id");
    // push the name of the card that has been clicked to cardsChosen array
    cardsChosen.push(newCardArray[cardId].name);
    // push the card id to the cardsChosenId arrat
    cardsChosenId.push(cardId);
    // set the image to the image attribute of the card that has been clicked
    this.setAttribute("src", newCardArray[cardId].img);
    // once two cards have been clicked, check for match
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 1000);
    }
  }
  createBoard();
});
