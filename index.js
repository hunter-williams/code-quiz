

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

var quizTimer = 0;

var currentQuestionIndex = 0;
var currentQuestion = questions[currentQuestionIndex];

var correctAnswers = 0;
 
 

function decreaseQuizTimer(quizInterval){
    if(isGameOver){
        console.log("decreaseQuizTimer() game over");
        clearInterval(quizInterval);
        gameOver();
    } else if (quizTimer <= 1){
        // if timer is done
        clearInterval(quizInterval);
        isGameOver = true;
    } else {
        // timer running 
        quizTimer--;
        document.querySelector('.quizTimer').innerHTML = '';
        document.querySelector('.quizTimer').innerHTML = quizTimer;
    }
}

function decreaseQuestionTimer(questionInterval){
    if(isGameOver){
        console.log("decreaseQuestionTimer() game over");
        clearInterval(questionInterval);
        gameOver();
    } else if (questionTimer <= 0 && currentQuestionIndex >= 2) {
        // out of time  AND  no more questions
        clearInterval(questionInterval);
        console.log("decreaseQuestionsTimer() out of time AND no more questions!",quizTimer, currentQuestionIndex);
        quizTimer = 1;
        isGameOver = true;
    } else if (questionTimer <= 0 && currentQuestionIndex < 2) {
        // out of time  AND  next question
        clearInterval(questionInterval);
        console.log("decreaseQuestionsTimer() out of time AND showing next question!", quizTimer, currentQuestionIndex);

        currentQuestionIndex ++;
        displayQuestion(currentQuestionIndex);  // start timer
        quizTimer -= 10;

    } else if (currentQuestionIndex >= 3){
        // out of questions
        console.log('decreaseQuestionsTimer() end of questions', currentQuestionIndex);
        clearInterval(questionInterval);
        isGameOver = true;
    } else {
        // timer running
        questionTimer--;
        document.querySelector('.questionTimer').innerHTML = '';
        document.querySelector('.questionTimer').innerHTML = questionTimer;
    }
}

function quiz(){

    console.log("=== start ===")
    quizTimer = 60;

    document.querySelector('.score').innerHTML = 0;
    
    // start timer
    decreaseQuizTimer(quizInterval); // skip first interval
    var quizInterval = setInterval(() => {decreaseQuizTimer(quizInterval)}, 1000);
    
    // first question
    displayQuestion(currentQuestionIndex);

    // onclick local storage
    document.querySelector(".saveScore").addEventListener('click', () => {
        // console.log("name:", document.querySelector(".name").value);
        // console.log("correct answers:", correctAnswers);
        
        window.localStorage.setItem( document.querySelector(".name").value, correctAnswers);
        var get = localStorage.getItem(document.querySelector(".name").value);
        document.querySelector(".leaderboard").innerHTML = ` ${document.querySelector(".name").value} - ${get} `;
    })
    
}

function displayQuestion(currentQuestionIndex){
    // if time is out  OR  no more questions
    if (quizTimer <= 0 || currentQuestionIndex >=3){
        console.log('displayQuestions() end of quiz timer OR no more questions', quizTimer, currentQuestionIndex);
        clearInterval(questionInterval);
        isGameOver = true;
    } else {
        console.log("=== display question ===");
        
        // reset and start timer
        questionTimer = 10;
        decreaseQuestionTimer(questionInterval); // skip first interval
        var questionInterval = setInterval(() => {decreaseQuestionTimer(questionInterval)}, 1000);

        // reset old options
        document.querySelector('.options').innerHTML = '';
        document.querySelector('.question').innerHTML = '';
        document.querySelector('.questionTimer').innerHTML = '';
        
        // set new question
        var currentQuestion = questions[currentQuestionIndex];
        document.querySelector('.question').textContent = currentQuestion.question;
 
        // create new options
        currentQuestion.options.forEach( option => {
            var optionButton = document.createElement("button");
            optionButton.textContent = option.toUpperCase();
            optionButton.setAttribute("value",option);

            optionButton.addEventListener("click", () => {checkAnswer(optionButton.value)} );
            document.querySelector('.options').appendChild(optionButton);
        })
    }
 
 
}

// call on option click
function checkAnswer(clickedOption){
    var currentQuestion = questions[currentQuestionIndex];

    // current question
    if (clickedOption === currentQuestion.correctAnswer ){
        // if true  
        document.querySelector('.result').innerHTML = "TRUE";
        document.querySelector('.result').style.color = "green";
        correctAnswers++;
        console.log("true - correct answers: ", correctAnswers);
        document.querySelector('.score').innerHTML = '';
        document.querySelector('.score').innerHTML = correctAnswers;

    } else if (clickedOption !== currentQuestion.correctAnswer ){
        // if false  
        document.querySelector('.result').innerHTML = "FALSE";
        document.querySelector('.result').style.color = "red";
        console.log("false - correct answers: ", correctAnswers);
    } 

    // next question
    if (currentQuestionIndex < 2){
        // more questions
        currentQuestionIndex++;
        console.log("checkanswer() more quesions  ", currentQuestionIndex);
        displayQuestion(currentQuestionIndex);

    } else if (currentQuestionIndex >= 2){
         // no more quesions
        console.log("checkanswer() no more questions", currentQuestionIndex);
        isGameOver = true;
    }
}

    



function gameOver(){
    isGameOver = true;

    console.log("game over");

    document.querySelector('.quizTimer').innerHTML='Done';
    document.querySelector('.questionTimer').innerHTML='Done';

    // remove quesitons
    document.querySelector(".question").style.display = 'none';
    document.querySelector(".options").style.display = 'none';
    document.querySelector(".resultContainer").style.display = 'none';
    
    // prompt local host
    document.querySelector(".endGame").style.display = 'flex';
    document.querySelector(".saveScore").style.display = 'block';
    document.querySelector(".leaderboard").style.display = 'block';
    document.querySelector(".name").style.display = 'block';
    

    
}

