let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    let wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log("Wrong");
  }

}


function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name) {
  let audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
  /* Alternativni nacin
  switch (name) {
      case "blue":
        let blue = new Audio("./sounds/blue.mp3")
        blue.play();
        break;
      case "green":
        let green = new Audio("./sounds/green.mp3")
        green.play();
        break;
      case "red":
        let red = new Audio("./sounds/red.mp3")
        red.play();
        break;
      case "yellow":
        let yellow = new Audio("./sounds/yellow.mp3")
        yellow.play();
        break;
      default:
      console.log("Error");
   }
   */
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 50);
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
