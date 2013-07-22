function Quiz(quizDivId, numberOfQuestions) {
  this.quizRoot = document.getElementById(quizDivId);
  this.questionDiv = this.quizRoot.querySelector('#question');
  this.answerDiv = this.quizRoot.querySelector('#answer');
  this.timerDiv = this.quizRoot.querySelector('#timer');
  this.scoreDiv = this.quizRoot.querySelector('#score');
  this.questionNumberDiv = this.quizRoot.querySelector('#question-number');
  this.questions = new Array(numberOfQuestions);
  this.timePerQuestion = 20;
  var answers = new Array(numberOfQuestions);
  this.score = new Array(numberOfQuestions);
  this.nextButton = this.quizRoot.querySelector('#next-question');
  this.totalScore = 0;
  this.currentIndex = 0;
  this.timeUp = false;
  var quiz = this;
  /**
   * Generate Question to Be Displayed
   */
  this.generateQuestion = function() {
    var firstOperand = quiz.getRandomNumber(20);
    var secondOperand = quiz.getRandomNumber(20);
    var operator = quiz.getRandomOperator();
    //Don't give question where divisor is 0
    if (operator == "/" && secondOperand == 0) {
      return quiz.generateQuestion();
    }
    quiz.questions[quiz.currentIndex] = firstOperand + operator + secondOperand;
    //Answer rounded upto 2 decimal places
    answers[quiz.currentIndex] = Math.floor(eval(quiz.questions[quiz.currentIndex]) * 100) / 100;
    return quiz.questions[quiz.currentIndex];
  }
  /**
   * Display Question
   */
  this.showQuestion = function(index) {
    quiz.questionDiv.innerHTML = "";
    quiz.answerDiv.value = "";
    quiz.questionDiv.appendChild(document.createTextNode(quiz.generateQuestion() + " ?"));
  }
  /**
   * Generate a Random Number between 0 and limit.
   */
  this.getRandomNumber = function(limit)
  {
    return Math.floor((Math.random() * limit));
  }
  /**
   * Generate a Random operator out of add, subtract, multiply and divide.
   */
  this.getRandomOperator = function() {
    var operators = ["+", "-", "*", "/"];
    return operators[quiz.getRandomNumber(operators.length)];
  }
  /**
   * Start Quiz
   */
  this.startQuiz = function() {
    quiz.showQuestion(quiz.currentIndex);
    quiz.showQuestionIndex();
    quiz.showTimer();
    quiz.showScore();
  }
  /**
   * Display Quiz Results
   */
  this.displayResults = function () {
    var resultFragment = document.createDocumentFragment();
    var newRow = resultFragment.appendChild(document.createElement('tr'));
    newRow.appendChild(document.createElement('th')).appendChild(document.createTextNode("Q.No."));
    newRow.appendChild(document.createElement('th')).appendChild(document.createTextNode("Question"));
    newRow.appendChild(document.createElement('th')).appendChild(document.createTextNode("Correct Answer"));
    for (var i = 0; i < numberOfQuestions; i++) {
      if (quiz.score[i] == 0 || quiz.score[i] == -1) {
        var newRow = resultFragment.appendChild(document.createElement('tr'));
        newRow.appendChild(document.createElement('td')).appendChild(document.createTextNode(i + 1));
        newRow.appendChild(document.createElement('td')).appendChild(document.createTextNode(quiz.questions[i]));
        var correctAnswer = newRow.appendChild(document.createElement('td'));
        correctAnswer.appendChild(document.createTextNode(answers[i]));
        if (quiz.score[i] == 0) {
          correctAnswer.setAttribute("style", "color:red;");
        }
        else if (quiz.score[i] == -1) {
          correctAnswer.setAttribute("style", "color:black;");
        }
      }
    }
    quiz.quizRoot.querySelector('#quiz-main').innerHTML = "";
    quiz.quizRoot.querySelector('#quiz-main').appendChild(resultFragment);
    quiz.showScore();
  }
  /**
   * Show Next Question
   */
  this.showNextQuestion = function() {
    quiz.clearTimer();
    quiz.evaluateScore();
    if (quiz.currentIndex == numberOfQuestions - 1) {
      quiz.displayResults();
    }
    else {
      quiz.showQuestion(++quiz.currentIndex);
      quiz.showTimer();
      quiz.showScore();
      quiz.showQuestionIndex();
    }
  }
  /**
   * Show Present Question Index
   */
  this.showQuestionIndex = function() {
    quiz.questionNumberDiv.innerHTML = "";
    quiz.questionNumberDiv.appendChild(document.createTextNode("Question " + (quiz.currentIndex + 1) + " of " + numberOfQuestions));
  }
  /**
   * Evaluate Score
   */
  this.evaluateScore = function() {
    //Give score of 1 for correct answers
    if (!(quiz.answerDiv.value === null) && !(quiz.answerDiv.value == "") && Number(quiz.answerDiv.value) === answers[quiz.currentIndex] && !quiz.timeUp) {
      quiz.score[quiz.currentIndex] = 1;
      quiz.totalScore++;
    }
    //Give a score of -1 for timed up answers
    else if (quiz.timeUp) {
      quiz.score[quiz.currentIndex] = -1;
    }
    //Give score of 0 for wrong answers
    else {
      quiz.score[quiz.currentIndex] = 0;
    }
  }
  /**
   * Display timer
   */
  this.showTimer = function() {
    var i = quiz.timePerQuestion;
    quiz.timerDiv.innerHTML = "Time Remaining : 00:" + i;
    //To check whether time is over or not
    quiz.timeUp = false;
    quiz.presentTimerId = window.setInterval(function() {
      if (i > 0) {
        i--;
        var appendZero = i < 10 ? "0" : "";
        quiz.timerDiv.innerHTML = "Time Remaining : 00:" + appendZero + i;
        if (i == 0) {
          quiz.timerDiv.innerHTML = "Time Up!";
          quiz.timeUp = true;
        }
      }
    }, 1000);
  }
  /**
   * Display score
   */
  this.showScore = function() {
    quiz.scoreDiv.innerHTML = "Score : " + quiz.totalScore;
  }
  /**
   * Clear timer
   */
  this.clearTimer = function() {
    window.clearInterval(quiz.presentTimerId);
    quiz.timerDiv.innerHTML = "";
  }
  this.nextButton.addEventListener('click', quiz.showNextQuestion, false);
}
//Initialise a new Arithmetic Quiz
var arithmeticQuiz = new Quiz("arithmetic-quiz", 20);
arithmeticQuiz.startQuiz();