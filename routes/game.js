function gameRoutes(app) {
  let goodAnswers = 0;
  let callToAFriend = false;
  let questionToTheCrowdUsed = false;
  let fiftyFifty = false;

  const questions = [
    {
      question:
        "Jaki jeżyk programowania jest używany do interaktywności na stronach www?",
      answers: ["C++", "Fortran", "JavaScript", "Java"],
      correctAnswer: 2
    },
    {
      question: "Jaka rzeka zasila poznańskie jezioro Malta?",
      answers: ["Maltanka", "Główna", "Cybina", "Warta"],
      correctAnswer: 3
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
    } else {
      const nextQuestion = questions[goodAnswers];

      const { question, answers } = nextQuestion;

      res.json({
        question,
        answers
      });
    }
  });
}

module.exports = gameRoutes;
