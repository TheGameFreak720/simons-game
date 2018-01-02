var userSeq = [];
var simonSeq = [];
const NUM_OF_LEVELS = 3;
var id;
var color;
var level = 0;
var error;

var boardSound = [
    'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', //green
    'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', //blue
    'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', //yellow
    'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3' //green
];

$(document).ready(function() {

    //Initialize board sequence
    $('.start-btn').click(function() {
        level++;
        simonSequence();
    });

    //User listener
    $('.simon-btn').click(function() {
       id = $(this).attr('id');
       color = $(this).attr('class').split(' ')[1];
       userSeq.push(id);
       console.log(id + ' ' + color);
       addClassSound(id, color);
       checkUserSeq();

       if (error === false) {
            displayError();
            userSeq = [];
       }

       if (userSeq.length === simonSeq.length && userSeq.length < NUM_OF_LEVELS) {
           level++;
           userSeq = [];
           simonSequence();
       }

       if (userSeq.length === NUM_OF_LEVELS) {
           $('.display').text('WIN');
       }
    });
});

function checkUserSeq() {
    for (var i = 0; i < userSeq.length; i++) {
        if (userSeq[i] != simonSeq[i]) {
            error = false;
        } else {
            error = true;
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

