const question = document.getElementById("question");
const gameBoard = document.querySelector("#game-board");
const h2 = document.querySelector("h2");
const goodAnswersSpan = document.querySelector("#good-answers");
const tipDiv = document.querySelector("#tip");

function fillQuestionElements(data) {
  if (data.winner === true) {
    gameBoard.style.display = "none";
    h2.innerHTML = "Wygrałeś/eś!!!";
    return;
  }

  if (data.loser === true) {
    gameBoard.style.display = "none";
    h2.innerHTML = "Przegrałeś!!! Spróbuj ponownie";
    return;
  }

  question.innerText = data.question;
  for (const i in data.answers) {
    const answerEl = document.querySelector(`#answer${Number(i) + 1}`);
    answerEl.innerText = data.answers[i];
  }
}

function showNextQuestion() {
  fetch("/question", {
    method: "GET"
  })
    .then(res => res.json())
    .then(data => fillQuestionElements(data));
}

showNextQuestion();

function handleAnswerFeedback(data) {
  goodAnswersSpan.innerText = data.goodAnswers;
  showNextQuestion();
}

function sendAnswer(answerIndex) {
  fetch(`/answer/${answerIndex}`, {
    method: "POST"
  })
    .then(res => res.json())
    .then(data => {
      handleAnswerFeedback(data);
    });
}

const buttons = document.querySelectorAll("button.answer-btn");
for (const button of buttons) {
  button.addEventListener("click", e => {
    const answerIndex = e.target.dataset.answer;
    sendAnswer(answerIndex);
  });
}

function handleFrendsAnswer(data) {
  tipDiv.innerText = data.text;
}

function callToAFriend() {
  fetch("/help/friend", {
    method: "GET"
  })
    .then(res => res.json())
    .then(data => handleFrendsAnswer(data));
}

document
  .querySelector("#callToAFriend")
  .addEventListener("click", callToAFriend);

function handlefiftyFiftyAnswer(data) {
  if (typeof data.text === "string") {
    tipDiv.innerText = data.text;
  } else {
    for (const button of buttons) {
      if (data.answersToRemove.indexOf(button.innerText) > -1) {
        button.innerText = "";
      }
    }
  }
}

function fiftyFifty() {
  fetch("/help/fifty", {
    method: "GET"
  })
    .then(res => res.json())
    .then(data => handlefiftyFiftyAnswer(data));
}

document.querySelector("#fiftyFifty").addEventListener("click", fiftyFifty);
