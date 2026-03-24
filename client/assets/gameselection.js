const questions = [
    {
        question: "question 1 (easy)?",
        answers: ["item 1", "item 2", "item 3", "item 4"],
        correct:2,
        hint:"the hint for question 1"
    },
    {
        question: "question 2 (easy)?",
        answers: ["item 1", "item 2", "item 3", "item 4"],
        correct:2,
        hint:"the hint for question 1"
    },
    {
        question: "question 3 (easy)?",
        answers: ["item 1", "item 2", "item 3", "item 4"],
        correct:2,
        hint:"the hint for question 1"
    },
    {
        question: "question 4 (medium)?",
        answers: ["item 1", "item 2", "item 3", "item 4"],
        correct:2,
        hint:"the hint for question 1"
    },
    {
        question: "question 5(medium)?",
        answers: ["item 1", "item 2", "item 3", "item 4"],
        correct:2,
        hint:"the hint for question 1"
    },
    {
        question: "question 6 (medium)?",
        answers: ["item 1", "item 2", "item 3", "item 4"],
        correct:2,
        hint:"the hint for question 1"
    },
    {
        question: "question 7 (hard)?",
        answers: ["item 1", "item 2", "item 3", "item 4"],
        correct:2,
        hint:"the hint for question 1"
    },
    {
        question: "question 8 (hard)?",
        answers: ["item 1", "item 2", "item 3", "item 4"],
        correct:2,
        hint:"the hint for question 1"
    },
    {
        question: "question 9 (hard)?",
        answers: ["item 1", "item 2", "item 3", "item 4"],
        correct:2,
        hint:"the hint for question 1"
    },
];

// counter from questions, strikes, score
let currentQuestion = 0; 
let strikes = 0;
let score = 0;


// START GAME (flip card)
function startGame() {
    document
        .getElementById("cardInner")
        .classList.add("flip");

    loadQuestion();
}


// LOAD QUESTION
function loadQuestion() {

    const q = questions[currentQuestion];

    // show question
    document.getElementById("question").textContent = q.question;

    // clear old answers
    const answerDiv = document.getElementById("answer");
    answerDiv.innerHTML = "";

    // create buttons
    q.answers.forEach((ans,index) => {
        const btn = document.createElement("button");
        btn.textContent = ans;
        btn.className = "btn btn-outline-primary m-1";
        answerDiv.appendChild(btn);
    });
}


// NEXT QUESTION
function nextQuestion() {
    // Logic: Redirect if 2 strikes reached OR if finished 9 questions
    if (strikes >= 2 || currentQuestion >= questions.length - 1) {
        // Save score  so result.html can read it

        // redirected to the result page
        window.location.href = "results.html";
        return;
    }

    currentQuestion++;
    loadQuestion();
}

// function to check the anwers in the index from the const q
function checkAnswer(Index) {
    const q = questions[currentQuestion];

    if (Index === q.correct) {
        score++;
    } else {
        strikes
    }

}

// function to display the hint
function showHint() {

}

//resets the selection for the current question
function retryQuestion() {

loadQuestion();    
}