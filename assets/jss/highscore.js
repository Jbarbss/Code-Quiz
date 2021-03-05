var resetBtn = document.querySelector("#resetBtn");
var clearScore = document.querySelector("#clearScore");

var topScore = JSON.parse(localStorage.getItem("topScores") || "[]");

var listScores = document.getElementById("listScores");

topScore.sort(function (a, b) {
    return b.score - a.score
    
})

for (var i = 0; i < topScore.length; i++) {
    var listLi = document.createElement("li")
     listLi.textContent = topScore[i].name + "-" + topScore[i].score
    listScores.appendChild(listLi)
   
}

resetBtn.addEventListener("click", function () {
    window.location.replace("./index.html");
    
});

clearScore.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
    });
