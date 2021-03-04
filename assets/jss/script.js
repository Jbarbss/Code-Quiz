var startButton = document.getElementById("start-btn");
var questionContainerEl = document.getElementById("question-container");
var timerEl = document.getElementById("time");
var titleScreen = document.getElementById("intro");
var questionElement = document.getElementById("question");
var answerButtonElement = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");
var submitScore = document.getElementById('submit-score');
var startScreen = document.getElementById("startIntro");
var quizTimer;

let timerTotal = 75;
let shuffledQuestions, currentQuestionIndex;
let correctAnswers = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  titleScreen.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerEl.classList.remove("hide");

  timeAlert();

  setNextQuestion();
}

function timeAlert() {
  quizTimer = setInterval(() => {
    if (timerTotal > 0) {
      timerEl.textContent = timerTotal;
      timerTotal--;
    } else if (timerTotal === 0) {
      timerEl.textContent = timerTotal;
      timerTotal--;
    } else {
      gameOver();
    }
  }, 1000);
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
}
function selectAnswer(e) {
  var selectedButton = e.target;
  var correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  if (!correct) {
    timerTotal -= 10;
  }
  Array.from(answerButtonElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    gameOver()
  }
  if (selectedButton.dataset = correct) {
      correctAnswers +=10;
  }
  console.log(correctAnswers);
document.getElementById("correctAnswers").innerHTML = correctAnswers
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
   element.classList.remove("correct");
   element.classList.remove("wrong");
}

function gameOver(quizTimer) {
    questionContainerEl.classList.add("hide")
    startScreen.classList.add("hide")
    submitScore.classList.remove("hide")
clearInterval(quizTimer)
    
}

function addScore () {
    userNameInput = document.getElementById('userName').value.trim()

//create a object with name and score
    var newScore = {
        name: userNameInput,
        score: correctAnswers
    };
    console.log(newScore);
    // check if there are any scores in local storage first and take value
    //if not, make a blank array
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    // push object into score array
    highScores.push(newScore)
    // turn objects into an array of strings + put it into local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}


// var startBtn = document.getElementById("startBtn");
// var timerEl = document.getElementById("time");
// var submitBtn = document.getElementById("submitBtn");
// var titleScreen = document.getElementById("intro");
// var quizScreen = document.getElementById("quizBox");
// var resetBtn = document.getElementById("reset");
// var clearBtn = document.getElementById("clearScore")
// var scoreDis = document.getElementById("scoreDisplay")
// var questionEl = document.getElementById("questions")
// var answerBtn = document.getElementById("answerBtn")
// var choices = document.getElementById("choice")

// var quizTimer;
// var timerStart = 75;
// var finalQuestionIndex = quizQuestions.length;
// var currentQuestionIndex = 0;
// var score = 0;

// startBtn.addEventListener('click', startQuiz);

// function startQuiz() {
//     console.log("Started");
//     titleScreen.classList.add("hide")
//     quizScreen.classList.remove("hide")
//     // scoreDis.classList.remove("hide")
//     timerStart = 75;
//     quizTimer = setInterval(timeAlert, 1000);
//    showQuestion();
// }

// function timeAlert() {
//     if (timerStart > 0) {

//         timerStart--;
//        return timerEl.textContent = timerStart;
//     }

//     clearInterval(quizTimer);
// }

// function showQuestion() {
//     for (var i = 0; i < quizQuestions.length; i++) {
//     var currentQuestion = quizQuestions[currentQuestionIndex];
//     questionEl.innerHTML = currentQuestion.title;
//     choices.textContent = currentQuestion.choices[i];

//     }
// }
