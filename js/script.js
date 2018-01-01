var userSeq = [];
var simonSeq = [];
var id;
var color;
var level = 0;

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
        startSequence();
    });

    //User listener
    $('.simon-btn').click(function() {
       id = $(this).attr('id');
       color = $(this).attr('class').split(' ')[1];
       addClassSound(id, color)
    });
});

//Simon Sequence
function startSequence() {
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
    //playSound(id);

    setTimeout(function(){
        $('#'+id).removeClass(color + '-active');
    }, 500);
}

function playSound(id) {

}

