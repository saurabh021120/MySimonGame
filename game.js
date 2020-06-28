var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var i=0;
var count = 1;

$(document).keypress(function() {
  if (count === 1) {
    $("h1").text("Level " + level);
    nextSequence();
    count = 0;
  }
});

function nextSequence() {
  userClickedPattern = [];

  var x = Math.random();
  var randomNumber = Math.floor(x * 4);
  var randomColorChoosen = buttonColors[randomNumber];
  gamePattern.push(randomColorChoosen);

  $("#" + randomColorChoosen).fadeOut(80).fadeIn(80);

  playSound(randomColorChoosen);
  level++;
}

$(".btn").click(function() {
  var userColorChoosen = this.id;
  playSound(userColorChoosen);
  animatePress(userColorChoosen);
  userClickedPattern.push(userColorChoosen);
  var u = userClickedPattern.length - 1;
  checkAnswer(u);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

var right = 0;

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      console.log(gamePattern);
      console.log(userClickedPattern);
      $("h1").text("Level " + level);
      setTimeout(function() {
        nextSequence();
      }, 500);
    }
  } else {
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    $("h1").text("Game over!! Press any key to start again");
    $(document).keypress(function() {
      startOver();
      }
    );
  }

}

function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
  $("h1").text("Level "+level);
  nextSequence();
}
