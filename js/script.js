var userSeq = [];
var simonSeq = [];
const NUM_OF_LEVELS = 3;
var id;
var color;
var level = 0;
var error;
var strict = false;
//switch to turn game on or off
var gameOn = false;

var boardSound = [
    'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', //green
    'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', //blue
    'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', //yellow
    'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3' //green
];

$(document).ready(function() {

    $('.display').text('');

    //Initialize board sequence
    $('.start-btn').click(function() {
        strict = false;
        error = false;
        level = 0;
        level++;
        simonSeq = [];
        userSeq = [];
        simonSequence();
    });

    //User listener
    $('.simon-btn').click(function() {
       id = $(this).attr('id');
       color = $(this).attr('class').split(' ')[1];
       userSequence()
    });

    //strict mode listener
    $(".strict-btn").click(function() {
        level = 0;
        level++;
        simonSeq = [];
        userSeq = [];
        strict = true;
        simonSequence();
    });

    //listener for switch button
    $(".switch").click(function() {
        gameOn = (gameOn == false) ? true : false;
        console.log(gameOn);
        if(gameOn) {
            $(".inner-switch").addClass("inner-inactive");
            $(".switch").addClass("outer-active");
            $(".display").text("00");
        }
        else {
            $(".inner-switch").removeClass("inner-inactive");
            $(".switch").removeClass("outer-active");
            $(".display").text("");
        }
    });
});

function userSequence() {
    userSeq.push(id);
    console.log(id + ' ' + color);
    addClassSound(id, color);

    //Check user sequence
    if(!checkUserSeq()) {
        if (strict) {
            console.log('strict');
            simonSeq = [];
            level = 1;
        }
        error = true;
        displayError();
        userSeq = [];
        simonSequence()
    } else if(userSeq.length == simonSeq.length && userSeq.length < NUM_OF_LEVELS) {
        level++;
        userSeq = [];
        error = false;
        console.log("start simon")
        simonSequence();
    }

    if(userSeq.length == NUM_OF_LEVELS) {
        displayWinner();
        resetGame();
    }
}

//Simon Sequence
function simonSequence() {
    console.log(level);
    $('.display').text(level);
    getRandomNum();
    var i = 0;

    var myInterval = setInterval(function() {
        id = simonSeq[i];
        color = $('#'+id).attr('class').split(' ')[1];
        console.log(id + ' ' + color);
        addClassSound(id, color);
        i++;

        if (i === simonSeq.length) {
            clearInterval(myInterval);
        }

    }, 1000);
}

function checkUserSeq() {
    for (var i = 0; i < userSeq.length; i++) {
        if (userSeq[i] != simonSeq[i]) {
            return false;
        } else {
            return true;
        }
    }
}

function displayError() {
    console.log('Error');
    var counter = 0;

    var myError = setInterval(function() {
        counter++;
        $('.display').text('!!');

        if (counter === 3) {
            $('.display').text(level);
            clearInterval(myError);
            userSeq = [];
            counter = 0;
        }
    }, 500);
}

function getRandomNum() {
    var random = Math.floor(Math.random() * 4);
    simonSeq.push(random);
}

function addClassSound(id, color) {
    $('#'+id).addClass(color + '-active');
    playSound(id);

    setTimeout(function(){
        $('#'+id).removeClass(color + '-active');
    }, 500);
}

function playSound(id) {
    var sound = new Audio(boardSound[id]);
    sound.play();
}

function displayWinner() {
    var count = 0;
    var winInterval = setInterval(function() {
        count++;
        $(".display").text("Win");
        if(count == 5) {
            clearInterval(winInterval);
            $(".display").text("00");
            count = 0;
        }
    }, 500);
}

/* reset game */
function resetGame() {
    userSeq = [];
    simonSeq = [];
    level = 0;
    $(".display").text("00");
}