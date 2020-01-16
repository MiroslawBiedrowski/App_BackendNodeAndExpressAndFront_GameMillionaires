function gameRoutes(app) {
  let goodAnswers = 0;
  let isGameOver = false;
  let callToAFriendUsed = false;
  let questionToTheCrowdUsed = false;
  let fiftyFiftyUsed = false;

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

  app.get("/help/friend", (req, res) => {
    if (callToAFriendUsed) {
      return res.json({
        text: "To koło ratunkowe zostało już wykorzystane."
      });
    }

    callToAFriendUsed = true;

    const doesFriendKnowAnswer = Math.random() < 0.5;
    const question = questions[goodAnswers];

    res.json({
      text: doesFriendKnowAnswer
        ? `Według mnie jest to odpowiedź ${
            question.answers[question.correctAnswer]
          }`
        : `Niestety nie wiem`
    });
  });

  //Obsługa ścieżki koło ratunkowe pół na pół
  app.get("/help/fifty", (req, res) => {
    if (fiftyFiftyUsed) {
      return res.json({
        text: "To koło ratunkowe zostało już wykorzystane."
      });
    }

    fiftyFiftyUsed = true;

    const question = questions[goodAnswers];
    const answersCopy = question.answers.filter(
      (s, index) => index !== question.correctAnswer
    );
    answersCopy.splice(~~(Math.random() * answersCopy.length1), 1);

    res.json({
      answersToRemove: answersCopy
    });
  });

  // Obsługa koła ratunkowego - Pytanie do publiczności
  app.get("/help/crowd", (req, res) => {
    if (questionToTheCrowdUsed) {
      return res.json({
        text: "To koło ratunkowe zostało już wykorzystane."
      });
    }

    const chart = [10, 20, 30, 40];
    for (let i = chart.length - 1; i > 0; i--) {
      const change = Math.floor(Math.random() * 20 - 10);
      chart[i] += change;
      chart[i - 1] -= change;
    }
    questionToTheCrowdUsed = true;
    const question = questions[goodAnswers];
    const { correctAnswer } = question;
    [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]];

    res.json({
      chart
    });
  });
}

module.exports = gameRoutes;
