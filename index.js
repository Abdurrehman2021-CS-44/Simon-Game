var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userPattern = [];
var l = 0;
var count = 0;


function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("." + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(input){

    var audio = new Audio("sound/" + input + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    },100); 
}

function checkPattern(){
    var check = false;
    count = userPattern.length;
    for (var i = 0; i < userPattern.length; i++){
        if (gamePattern[i] == userPattern[i]){
            check = true;
        } else {
            check = false;
            playSound("wrong");
            $("#title").text("Game Over, to restart Press A key");
            gameStart = false;
            l = 0;
            gamePattern = [];
            userPattern = [];
            break;
        }
    }
    if (check == false){
        console.log("False");
        console.log(gamePattern);
        console.log(userPattern);
    }
    if (gamePattern.length == count) {
        nextSequence();
        l++;
        $("#title").text("Level " + l);
        userPattern = [];
    }
}

$(".btn").click(function(){
    userPattern.push(this.id);
    
    checkPattern();

    animatePress(this.id);

    playSound(this.id);
})

var gameStart = true;

$(document).keydown(function(){
    gameStart = true;
    $("#title").text("Level " + l);
    if(gameStart){
        nextSequence();
        gameStart = false
    }
})
