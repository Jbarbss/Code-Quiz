
var resetBtn = document.querySelector("#resetBtn");
var clearScore = document.querySelector("#clearScore");
// get scores and turn them into a list
var topScore = JSON.parse(localStorage.getItem("topScores") || "[]");

var listScores = document.getElementById("listScores");

// sorts scores high to low
topScore.sort(function (a, b) {
    return b.score - a.score
    
})
// gets name and scores from local storage and puts them on high score list
for (var i = 0; i < topScore.length; i++) {
    var listLi = document.createElement("li")
     listLi.textContent = topScore[i].name + "  -  " + topScore[i].score + "      Points"
    listScores.appendChild(listLi)
   
}
// sets button to redirect to home page
resetBtn.addEventListener("click", function () {
    window.location.replace("./index.html");
    
});
// sets button to clear scores
clearScore.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
    });
