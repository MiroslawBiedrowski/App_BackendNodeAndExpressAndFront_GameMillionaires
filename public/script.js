const question = document.getElementById("question");

function fillQuestionElements(data) {
  console.log(data);
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

function sendAnswer(answerIndex) {
  fetch(`/answer/${answerIndex}`, {
    method: "POST"
  })
    .then(res => res.json())
    .then(data => console.log(data));
}

const buttons = document.querySelectorAll("button");
for (const button of buttons) {
  button.addEventListener("click", e => {
    const answerIndex = e.target.dataset.answer;
    sendAnswer(answerIndex);
  });
}
