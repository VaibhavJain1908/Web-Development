var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var buttonColors = ["red", "blue", "green", "yellow"];

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function () {

  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);

  $("#"+randomChoosenColor).delay(90).fadeIn().fadeOut().fadeIn();

  playSound(randomChoosenColor);
  level++;
}

function playSound(name) {
  new Audio("sounds/"+name+".mp3").play();
}

function animatePress(currentColor) {

  $("#"+currentColor).addClass("pressed");
  setTimeout(function (){
    $("#"+currentColor).removeClass("pressed");
  }, 90);
}

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    else {
      playSound("wrong");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
  }

  else {
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }

}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}
