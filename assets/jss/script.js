var startBtn = document.getElementById("startBtn");
var timerEl = document.getElementById("time"); 
var submitBtn = document.getElementById("submitBtn");
var titleScreen = document.getElementById("intro");
var quizScreen = document.getElementById("quizBox");
var resetBtn = document.getElementById("reset");
var clearBtn = document.getElementById("clearScore")
var scoreDis = document.getElementById("scoreDisplay")
var questionEl = document.getElementById("questions")
var answerBtn = document.getElementById("answerBtn")

var quizTimer;
var timerStart = 75;

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    console.log("Started");
    titleScreen.classList.add("hide")
    quizScreen.classList.remove("hide")
    scoreDis.classList.remove("hide")
    timerStart = 75;
    quizTimer = setInterval(timeAlert, 1000);
}

function timeAlert() {
    if (timerStart > 0) {
        
        timerStart--;
       return timerEl.textContent = timerStart;
    }
    clearInterval(quizTimer);
}

