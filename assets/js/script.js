
var startButton = document.getElementById("start-btn");
var questionContainerEl = document.getElementById("question-container");
var timerEl = document.getElementById("time");
var titleScreen = document.getElementById("intro");
var questionElement = document.getElementById("question");
var answerButtonElement = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");
var submitScreen = document.getElementById("submit-score");
var submitScore = document.getElementById("submitBtn");
var startScreen = document.getElementById("startIntro");
var quizTimer;

let timerTotal = 75;
let shuffledQuestions, currentQuestionIndex, userNameInput
let correctAnswers = 0;

// event listeners for start button 
startButton.addEventListener("click", startGame);
// event listener for next button, moves to next question
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
// event listener for submit button, propagation of the same event from being called. call to add score function
submitScore.addEventListener("click",function (e) {
  e.stopPropagation();
  addScore();
// direct to highscore page when button is clicked
  window.location.href = "highscore.html"
  
});

// this stop return button from working in input BhxBrowser. was returning 404 error
window.addEventListener('keydown',function(e){
  if(e.keyIdentifier=='Enter'||e.keyCode==13)
  {if(e.target.nodeName=='INPUT'&&e.target.type=='text'){
    e.preventDefault();return false;
  }}},true);

// starts gameOver. hides start button and title screen and shows question screen.
function startGame() {
  startButton.classList.add("hide");
  titleScreen.classList.add("hide");
  // randomly shuffles questions 
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerEl.classList.remove("hide");

  // call to timer function
  timeAlert();
// call to next question function
  setNextQuestion();
}
// starts timer. if 0 is reached ends game
function timeAlert() {
  quizTimer = setInterval(() => {
    if (timerTotal >= 0) {
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
// sets next question and resets page
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
// shows questions and and answers in container  
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
// resets quiz to original start and replaces questions and answers with new data
function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
}
// select answer function. check is button is correct. if not takes away 10 seconds
function selectAnswer(e) {
  var selectedButton = e.target;
  var correct = selectedButton.dataset.correct;
  if (!correct) {
    timerTotal -= 10;
  }
  // checks other button to see if correct, changes return to array 
  Array.from(answerButtonElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
// when questions run out game is over
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    gameOver()
  }
  // if question is answered correct add 10 points to score
  if (selectedButton.dataset = correct) {
      correctAnswers +=10;
  }
  // logs score amount
  console.log(correctAnswers);
document.getElementById("correctAnswers").innerHTML = correctAnswers
}

// changes class of buttons to display correct or wrong answers
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

// clear element of class
function clearStatusClass(element) {
   element.classList.remove("correct");
   element.classList.remove("wrong");
}
// ends game, hides question container and shows submit highscore screen. clears timer
function gameOver(timerTotal) {
    questionContainerEl.classList.add("hide");
    startScreen.classList.add("hide");
    submitScreen.classList.remove("hide");
    clearInterval(quizTimer)
    
}
// adds score 
function addScore () {
    userNameInput = document.getElementById('userName').value.trim()

//create a object with name and score
    var newScore = {
        name: userNameInput,
        score: correctAnswers
    };
    console.log(newScore);
    // check if there are any scores in local storage first and take value
    //if no scores, makes empty array
    var topScores = JSON.parse(localStorage.getItem("topScores") || "[]");
    // push newScore into score array
    topScores.push(newScore)
    // turn objects into an array of strings + put it into local storage
    localStorage.setItem("topScores", JSON.stringify(topScores));
}



