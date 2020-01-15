function gameRoutes(app) {
  let goodAnswers = 0;
  let isGameOver = false;
  let callToAFriend = false;
  let questionToTheCrowdUsed = false;
  let fiftyFifty = false;

  const questions = [
    {
      question:
        "Jaki język programowania jest używany do interaktywności na stronach www?",
      answers: ["C++", "Fortran", "JavaScript", "Java"],
      correctAnswer: 2
    },
    {
      question: "Jaka rzeka zasila poznańskie jezioro Malta?",
      answers: ["Maltanka", "Główna", "Cybina", "Warta"],
      correctAnswer: 2
    },
    {
      question: "Jakie miasto jest stolicą Monako?",
      answers: ["Monako", "Monte Carlo", "Fontvieille", "Larvotto"],
      correctAnswer: 0
    }
  ];

  app.get("/question", (req, res) => {
    if (goodAnswers === questions.length) {
      res.json({
        winner: true
      });
    } else if (isGameOver) {
      res.json({
        loser: true
      });
    } else {
      const nextQuestion = questions[goodAnswers];

      const { question, answers } = nextQuestion;

      res.json({
        question,
        answers
      });
    }
  });

  app.post("/answer/:index", (req, res) => {
    if (isGameOver) {
      res.json({
        loser: true
      });
    }
    const { index } = req.params;
    const question = questions[goodAnswers];
    const isGoodAnswer = question.correctAnswer === Number(index);

    if (isGoodAnswer) {
      goodAnswers++;
    } else {
      isGameOver = true;
    }

    res.json({
      correct: isGoodAnswer,
      goodAnswers
    });
  });
}

module.exports = gameRoutes;
