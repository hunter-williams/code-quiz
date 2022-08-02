// all questions
var questions = [
    {
        question: "what is javascript",
        options: ['coffee', 'language', 'browser'],
        correctAnswer: 'language'
    },
    {
        question: "what is chrome",
        options: ['browser', 'language', 'coffee'],
        correctAnswer: 'browser'
    },
    {
        question: "what is roast beans",
        options: ['language', 'coffee', 'browser'],
        correctAnswer: 'coffee'
    }
]

// global timer
var quizTimer = 60;
if (quizTimer <= 0){
    // gameOver();
    alert('end of quiz')
    clearInterval(quizInterval);
    // currentQuestionIndex = 4;
}

var currentQuestionIndex = 0
if (currentQuestionIndex >= 3){
    // gameOver();
    alert('end of questions')
    clearInterval(questionInterval);
    // currentQuestionIndex = 4;

}
var currentQuestion = questions[currentQuestionIndex];
var correctAnswers = 0;
 
 

function decreaseQuizTimer(quizInterval){
    quizTimer--;
    document.querySelector('.quizTimer').innerHTML = '';
    document.querySelector('.quizTimer').innerHTML = quizTimer;
    // console.log("quiz timer", quizTimer)
   
    if (quizTimer === 0){
        document.querySelector('.quizTimer').innerHTML='Done';
        // gameOver();
        clearInterval(quizInterval);
        alert("quiz You're out of time!");
    }
}

function decreaseQuestionTimer(questionInterval){
    questionTimer--;
     document.querySelector('.questionTimer').innerHTML = '';
     document.querySelector('.questionTimer').innerHTML = questionTimer;
    //  console.log("question timer", questionTimer)
   
     if (questionTimer <= 0){
        clearInterval(questionInterval);
        // gameOver();
        alert("question You're out of time!");
        currentQuestionIndex ++;
        displayQuestion(currentQuestionIndex);
        // questionTimer = 10;
        quizTimer -= 10;
    }
}

function quiz(){
    console.log("=== start ===")
    
    document.querySelector('.score').innerHTML = 0;
    // start timer
    var quizInterval = setInterval(() => {decreaseQuizTimer(quizInterval)}, 1000);

    // first question
    displayQuestion(currentQuestionIndex);

}

function displayQuestion(currentQuestionIndex){
    console.log("=== display question ===")
    questionTimer = 10;

    // 
    var questionInterval = setInterval(() => {decreaseQuestionTimer(questionInterval)}, 1000);


    var currentQuestion = questions[currentQuestionIndex]
    document.querySelector('.options').innerHTML = ''
    document.querySelector('.question').innerHTML = ''
    document.querySelector('.questionTimer').innerHTML = ''

 

    // question 
    document.querySelector('.question').textContent = currentQuestion.question;

    // options
     currentQuestion.options.forEach( option => {
        var optionButton = document.createElement("button");
        optionButton.textContent=option
        optionButton.setAttribute("value",option)

        optionButton.addEventListener("click", () => {checkAnswer(optionButton.value)} );
        document.querySelector('.options').appendChild(optionButton);
    })

     if (questionTimer === 0){
        alert('out of time');
        clearInterval(questionInterval);
    }
 
    if (currentQuestionIndex >= 3){
        gameOver();
    }
 
}

// call on click
function checkAnswer(clickedOption){

    var currentQuestion = questions[currentQuestionIndex]

    // if true
    if (clickedOption === currentQuestion.correctAnswer){
        document.querySelector('.result').innerHTML = "true";
        correctAnswers++;
        console.log("true - correct answers: ", correctAnswers)
        document.querySelector('.score').innerHTML = '';
        document.querySelector('.score').innerHTML = correctAnswers;

    }else if (clickedOption !== currentQuestion.correctAnswer ){
        document.querySelector('.result').innerHTML = "false";
        quizTimer -= 10;
        console.log("false - correct answers: ", correctAnswers)
        alert('out of time');
        clearInterval(questionInterval);
    }

    currentQuestionIndex++;
    console.log("current index", currentQuestionIndex);
    displayQuestion(currentQuestionIndex);
}

function gameOver(){

    alert("game over");
    clearInterval(quizInterval);
    clearInterval(questionInterval);

}

