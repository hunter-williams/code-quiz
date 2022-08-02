

// all questions - array of objects
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

var isGameOver = false;

// global timer
var quizTimer = 1;

// if timer is done 
if (quizTimer <= 0 || document.querySelector('.quizTimer').innerHTML === 'Done'){
    console.log('end of quiz timer');
    clearInterval(quizInterval);
    gameOver();
}  

var currentQuestionIndex = 0
if (currentQuestionIndex >= 3){
    console.log('end of questions')
    clearInterval(questionInterval);
    gameOver();
}
var currentQuestion = questions[currentQuestionIndex];
var correctAnswers = 0;
 
 

function decreaseQuizTimer(quizInterval){
    quizTimer--;
    document.querySelector('.quizTimer').innerHTML = '';
    document.querySelector('.quizTimer').innerHTML = quizTimer;
   
    if (quizTimer === 0){
        document.querySelector('.quizTimer').innerHTML='Done';
        clearInterval(quizInterval);
        console.log("decreaseQuizTimer() end of quiz");
        gameOver();
    }
}

function decreaseQuestionTimer(questionInterval){
    questionTimer--;
     document.querySelector('.questionTimer').innerHTML = '';
     document.querySelector('.questionTimer').innerHTML = questionTimer;
   
     if (questionTimer <= 0 && currentQuestionIndex >= 2) {
        // out of time no more questions

        console.log("decreaseQuestionsTimer() out of time no mas q!");
        quizTimer = 0;
        gameOver();
    } else if (questionTimer <= 0 && currentQuestionIndex <= 2) {
        // out of time show next question
       
        clearInterval(questionInterval); // stop timer
        console.log("decreaseQuestionsTimer() out of time showing next question!");

        // show next question - that starts another timer
        currentQuestionIndex ++;
        displayQuestion(currentQuestionIndex);
        quizTimer -= 10;
    }if (questionTimer <= 0){
        // out of time
        clearInterval(questionInterval); // stop timer
        console.log("decreaseQuestionsTimer() out of time  n!");
    }
    // else if (currentQuestionIndex >= 3){
    //     //out of questions
    //     console.log('displayQuestions() end of questions');
    //     gameOver();
    // } 
}

function quiz(){
    console.log("=== start ===")
    quizTimer = 60;

    document.querySelector('.score').innerHTML = 0;
    
    // start timer
    decreaseQuizTimer(quizInterval); //skip first interval
    var quizInterval = setInterval(() => {decreaseQuizTimer(quizInterval)}, 1000);
    
    // first question
    displayQuestion(currentQuestionIndex);
    
    if(isGameOver){
        return
    }
}

function displayQuestion(currentQuestionIndex){
    if (quizTimer === 0){
        console.log('displayQuestions() end of quiz timer');
        clearInterval(questionInterval);
        gameOver();
    }
 
    // if (currentQuestionIndex >= 2){
    //     console.log('displayQuestions() end of questions');
    //     gameOver();
        
    // }
    
    console.log("=== display question ===");
    questionTimer = 10;
    
    decreaseQuestionTimer(questionInterval); //skip first interval
    var questionInterval = setInterval(() => {decreaseQuestionTimer(questionInterval)}, 1000);

    var currentQuestion = questions[currentQuestionIndex];
    document.querySelector('.options').innerHTML = '';
    document.querySelector('.question').innerHTML = '';
    document.querySelector('.questionTimer').innerHTML = '';

 

    // question 
    if (currentQuestionIndex <= 2 || currentQuestion.question){
        console.log("current question")
        document.querySelector('.question').textContent = currentQuestion.question;
    } else{
        console.log('displayQuestions() end of questions');
        gameOver();
    }

    // options
     currentQuestion.options.forEach( option => {
        var optionButton = document.createElement("button");
        optionButton.textContent=option;
        optionButton.setAttribute("value",option);

        optionButton.addEventListener("click", () => {checkAnswer(optionButton.value)} );
        document.querySelector('.options').appendChild(optionButton);
    })


 
}

// call on click
function checkAnswer(clickedOption){

    var currentQuestion = questions[currentQuestionIndex];

    // if true
    if (clickedOption === currentQuestion.correctAnswer){
        document.querySelector('.result').innerHTML = "true";
        correctAnswers++;
        console.log("true - correct answers: ", correctAnswers);
        document.querySelector('.score').innerHTML = '';
        document.querySelector('.score').innerHTML = correctAnswers;

    }else if (clickedOption !== currentQuestion.correctAnswer ){
        document.querySelector('.result').innerHTML = "false";
        
        if(quizTimer > 10){
            quizTimer -= 10;
        } else{
            gameOver()
        }

        console.log("false - correct answers: ", correctAnswers);
        console.log('out of time');
        clearInterval(questionInterval);
    }

    currentQuestionIndex++;
    console.log("current index", currentQuestionIndex);
    displayQuestion(currentQuestionIndex);
}

function gameOver(){
    isGameOver = true;

    console.log("game over");

    document.querySelector('.quizTimer').innerHTML='Done';
    document.querySelector('.questionTimer').innerHTML='Done';
    // clearInterval(quizInterval);
    // clearInterval(questionInterval);

    // return
    // prompt local host
    document.querySelector(".saveScore").style.display = 'block';
    document.querySelector(".leaderboard").style.display = 'block';
    document.querySelector(".name").style.display = 'block';
    
    document.querySelector(".saveScore").addEventListener('click', () => {
        
            console.log(document.querySelector(".name").value)
            console.log(correctAnswers)
            
        // var saved = window.localStorage.setItem( document.querySelector(".name").value, correctAnswers)
        var get = localStorage.getItem(document.querySelector(".name").value)
        console.log(saved, get);
    })

    document.querySelector(".leaderboard").innerHTML = get;


}

