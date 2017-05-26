//Javascript/JQuery//

var quiz = [
{
    "question": "What is the full form of IP?",
    "choices": ["Internet Provider", "Internet Port", "Internet Protocol"],
    "correct": "Internet Protocol"
}, 
{
    "question": "Who is the founder of Microsoft?",
    "choices": ["Bill Gates", "Steve Jobs", "Steve Wozniak"],
    "correct": "Bill Gates"
}, 
{
    "question": "1 byte = ?",
    "choices": ["8 bits", "64 bits", "1024 bits"],
    "correct": "8 bits"
}, 
{
    "question": "The C programming language was developed by?",
    "choices": ["Brendan Eich", "Dennis Ritchie", "Guido van Rossum"],
    "correct": "Dennis Ritchie"
}, 
{
    "question": "What does CC mean in emails?",
    "choices": ["Carbon Copy", "Creative Commons", "other"],
    "correct": "Carbon Copy"
},
{
    "question": "What year was Facebook founded?",
    "choices": ["2004", "2006", "2001"],
    "correct": "2004"
},
{
    "question": "The companies HP, Microsoft and Apple were all started in a what?",
    "choices": ["Barn", "Trailer", "Garage"],
    "correct": "Garage"
},
{
    "question": "What is the name of the main protagonist in the Legend of Zelda series of video games?",
    "choices": ["Cage", "Zelda", "Link"],
    "correct": "Link"
},
{
    "question": "Fonts that contain small decorative lines at the end of a stroke are known as what?",
    "choices": ["Arial", "Serif", "Verdana"],
    "correct": "Serif"
},
{
    "question": "In what year was the iPhone first released?",
    "choices": ["2010", "2005", "2007"],
    "correct": "2007"
}
];


var intervalId;
var timer = 31;

function run() {
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    timer--;
    $("#gameClock").html("<h2> Time Left: " + timer + "</h2>");
    if (timer === 0) {
        stop();
        if (askingQuestion) {
            timerExpired();
        }
    }
}

function stop() {
    clearInterval(intervalId);
}

// init vars
var currentQuestion = 0;
var gameScore = 0;
var askingQuestion = false;


function askQuestion() {
    $("#score").html(gameScore);
    askingQuestion = true;
    $("#message").empty();
    $("#question").html("<h3> Q" + (currentQuestion + 1) + ": " + quiz[currentQuestion].question + "</h3>");
    var choices = quiz[currentQuestion].choices,
        choicesHtml = "";
    // loop through choices, and create radio buttons
    for (var i = 0; i < choices.length; i++) {
        choicesHtml += "<button type='button' class='btn btn-secondary' name='quiz" + currentQuestion +
            "' id='choice" + (i + 1) +
            "' value='" + choices[i] + "'>" + choices[i] + "</button>";
        choicesHtml += "<br/>";
    }
    $("#choices").html(choicesHtml);
    //start timer
    timer = 31;
    run();
}

function timerExpired() {
    askingQuestion = false;
    var correctAnswer = quiz[currentQuestion].correct;
    var correctChoice = $("button[value='" + correctAnswer + "']");
    correctChoice.removeClass("btn-secondary");
    correctChoice.addClass("btn-success");
    $("#message").html("Time Up !! The right answer is " + correctAnswer);
    setTimeout(checkProgress, 1000 * 5);
}

function checkAnswer(ans) {
    if (askingQuestion) {
        stop();
        var correctAnswer = quiz[currentQuestion].correct;
        if (ans == correctAnswer) {
            $("button[value='" + correctAnswer + "']").removeClass("btn-secondary").addClass("btn-success");
            gameScore++;
            $("#score").html(gameScore);
            $("#message").html("Right Answer !!!");
        } else {
            $("button[value='" + ans + "']").removeClass("btn-secondary").addClass("btn-danger");
            $("#message").html("Wrong Answer !! The right answer is " + correctAnswer);
        }
        askingQuestion = false;
    }
    setTimeout(checkProgress, 1000 * 5);
}



function checkProgress() {
    if (currentQuestion < quiz.length - 1) {
        currentQuestion++;
        askQuestion();
    } else {
        askingQuestion = false;
        showFinalResults();
    }

}

function showFinalResults() {
    $("#gameClock").empty();
    $("#question").empty();
    $("#choices").empty();
    $("#message").html("<h2>You've completed the quiz!</h2>" +
        "<h2>Below are your results:</h2>" +
        "<h2>" + gameScore + " out of " + quiz.length + " questions, " +
        Math.round(gameScore / quiz.length * 100) + "%<h2>");
    $("#restart").css("display", "block");
}

//When document is ready start your game;
$(document).ready(function() {





    $("#btnRestart").click(function() {
        $("#restart").css("display", "none");
        currentQuestion = 0;
        gameScore = 0;
        $("#score").html(gameScore);
        askingQuestion = false;
        askQuestion();
    });

    $('#choices').on('click', 'button.btn-secondary', function() {
        if (timer > 0 && askingQuestion == true) {
            stop();

            var userpick = $(this).val();
            checkAnswer(userpick);
        }
    });

    // $(".btn-secondary").click(function() {
    //     if (timer > 0 && askingQuestion) { //
    //         stop();
    //         var userpick = $(this).val();
    //         checkAnswer(userpick);
    //     }
    // });

});

//askQuestion();

window.addEventListener("load", askQuestion, false);
