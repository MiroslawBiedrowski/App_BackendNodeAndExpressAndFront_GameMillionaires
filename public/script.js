const question = document.getElementById("question");
const gameBoard = document.querySelector("#game-board");
const h2 = document.querySelector("h2");
const goodAnswersSpan = document.querySelector("#good-answers");

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

const buttons = document.querySelectorAll("button");
for (const button of buttons) {
  button.addEventListener("click", e => {
    const answerIndex = e.target.dataset.answer;
    sendAnswer(answerIndex);
  });
}
