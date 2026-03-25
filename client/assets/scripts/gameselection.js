// list of the questions
const questions = [
    {
        question: "question 1 (easy)?",
        options: ["item 1", "item 2", "item 3", "item 4"],
        correct:2,
        hint:"the hint for question 1"
    },
    {
        question: "question 2 (easy)?",
        options: ["item 1", "item 2", "item 3", "item 4"],
        correct:2,
        hint:"the hint for question 2"
    },
    {
        question: "question 3 (medium)?",
        options: ["item 1", "item 2", "item 3", "item 4"],
        correct:2,
        hint:"the hint for question 3"
    },
    {
        question: "question 4 (medium)?",
        options: ["item 1", "item 2", "item 3", "item 4"],
        correct:2,
        hint:"the hint for question 4"
    },
    {
        question: "question 5(hard)?",
        options: ["item 1", "item 2", "item 3", "item 4"],
        correct:2,
        hint:"the hint for question 5"
    },
];

// counter from questions, strikes, score
let currentQuestion = 0; 
let strikes = 0;
let myScore = 0;
let answer = false; //track if  user has answered the current qn

// start the game
function startGame () {
    const card = document.getElementById("cardInner").classList.add("flip");
    loadQuestion();
}

// LOAD QUESTION
// display  the test on the screen
function loadQuestion() {
    strikes = 0 // reset strikes for new question
    answered = false;
    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;

    // clear old buttons
    let area = document.getElementById("answer");
    area.innerHTML = "";

    // create buttons
    for(let i= 0; i < q.options.length; i++) {
        let btn = document.createElement("button")
        btn.textContent = q.options [i];
        btn.className = "btn btn-outline-primary m-1";

    // when clicked, check if the index is the correct one
    btn.onclick = function () {
        checkAnswer(i);
    }
    area.appendChild(btn);
    }

    };

//strikes logic
function checkAnswer(userChoice) {
    answered = true; //user clicked answer
    const q = questions[currentQuestion];
    //look the buttons so they can't get more points
    const buttons = document.querySelectorAll("#answer button")
    

    if (userChoice === q.correct) {
        for (let i=0; i<buttons.length; i++) {
        buttons[i].disabled = true;}
        alert("Correct! Vault security bypassed! Click 'Next' to try the next security layer")
        myScore = myScore + 1;
            console.log(myScore)

    if(currentQuestion === 4) {
        alert("Congrats! You cracked the vault! The heist is a success")
        goToResults();
        return;
    }
    
    }else {
        //wronf answer: add strike
        strikes= strikes + 1;

        if (strikes >=2) {
            alert("Busted! The correct answer was: " + q.options[q.correct] + " Moving to results ...")
            goToResults(); //game stops here
            return;

        } else{
        alert ("Wrong! Strike 1: Try again");
        }
    }
}

// Ending the game
function nextQuestion() {
    if(!answered){
        alert("you must select an answer before moving on!");
        return;
    }
    // If they have 2 strikes, go to results page 
    if (strikes >= 2) {
        // redirected to the result page
        goToResults();
        return
    };

//Move to the next question
currentQuestion = currentQuestion + 1;

//If we passed the question 9, go to result
if (currentQuestion > 8) {
    goToResults();
}else {
    loadQuestion();
}
}

// sending data to the next page
function goToResults () {
    localStorage.setItem("finalScore", myScore)
    window.location.href = "results.html";
}


// function to display the hint
function showHint() {
    const q = questions[currentQuestion];
    alert("Hint: " + q.hint)
}

//resets the selection for the current question
function retryQuestion() {

loadQuestion();    
}

module.exports = {
  startGame,
  loadQuestion,
  checkAnswer,
  nextQuestion,
  goToResults,
  showHint,
  retryQuestion,
  questions
};
