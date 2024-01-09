var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
$(document).one("keypress", function () {
    nextSequence();
});
$(".btn").click(function(){
    if (gamePattern.length === 0){return}
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});
function nextSequence() {
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}
function playSound(name){
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}
function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length){
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        }
    }else{
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 100);
        audio = new Audio('./sounds/wrong.mp3');
        audio.play();
        startOver();;
    }
}
function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $(document).one("keypress", function () {
        nextSequence();
    });
}