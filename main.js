const memoryBoard = document.querySelector(".memoryboard");
let boardFields = null;
let root = document.documentElement;
let notAlivabeMoves = [];
let revealFields = [];

let numberOfCols = 6;
let numberOfRows = 6;

const generateFields = function () {
  root.style.setProperty("--number-of-cols", numberOfCols);

  for (let i = 0; i < numberOfCols * numberOfRows; i++) {
    field = document.createElement("div");

    memoryBoard.appendChild(field);
  }

  boardFields = [...document.querySelectorAll(".memoryboard div")];

  randomFileds();
};

const randomFileds = () => {
  let firstRandom = Math.floor(Math.random() * boardFields.length);
  let secondRandom = Math.floor(Math.random() * boardFields.length);

  let notAlivabeMovesLenght = notAlivabeMoves.length;
  let boardFieldsLenght = boardFields.length;

  while (
    (notAlivabeMoves.includes(firstRandom) &&
      notAlivabeMovesLenght <= boardFieldsLenght) ||
    (notAlivabeMoves.includes(secondRandom) &&
      notAlivabeMovesLenght <= boardFieldsLenght)
  ) {
    if (notAlivabeMoves.includes(firstRandom)) {
      firstRandom = Math.floor(Math.random() * boardFields.length);
    }

    if (notAlivabeMoves.includes(secondRandom)) {
      secondRandom = Math.floor(Math.random() * boardFields.length);
    }
  }

  if (notAlivabeMovesLenght <= boardFieldsLenght) {
    setColors(firstRandom, secondRandom);
  }
};

const setColors = function (firstRandom, secondRandom) {
  const randomRed = Math.floor(Math.random() * 255);
  const randomGreen = Math.floor(Math.random() * 255);
  const randomBlue = Math.floor(Math.random() * 255);

  notAlivabeMoves.push(firstRandom, secondRandom);

  boardFields[
    firstRandom
  ].style.backgroundColor = `rgb(${randomRed} ${randomGreen} ${randomBlue} )`;

  boardFields[
    secondRandom
  ].style.backgroundColor = `rgb(${randomRed}  ${randomGreen} ${randomBlue} )`;

  randomFileds();
};

generateFields();

const checkPairs = () => {
  const revealField = document.getElementsByClassName("reveal");

  if (
    revealField.length >= 2 &&
    revealField[0].style.backgroundColor ===
      revealField[1].style.backgroundColor
  ) {
    revealField[1].classList.add("win");
    revealField[0].classList.add("win");

    revealField[1].classList.remove("reveal");
    revealField[0].classList.remove("reveal");

    console.log(revealField);
  } else if (revealField.length >= 2) {
    setTimeout(() => {
      revealField[1].classList.add("hide");
      revealField[0].classList.add("hide");

      revealField[1].classList.remove("reveal");
      revealField[0].classList.remove("reveal");
    }, 1000);
  }
};

boardFields.forEach((element) => {
  element.addEventListener("click", () => {
    element.classList.add("reveal");
    element.classList.remove("hide");

    checkPairs();
  });
});

setTimeout(() => {
  boardFields.forEach((field) => {
    field.classList.add("hide");
  });
}, 2500);
