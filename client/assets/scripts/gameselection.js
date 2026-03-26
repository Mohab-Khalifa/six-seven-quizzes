// list of the questions
const questions = [
    {
        question: "The great wall is located in which country?",
        options: ["Japan", "Korea", "China", "Russia"],
        correct:2,
        hint:"It was build to defend aganist northern invasions of Asia"
    },
    {
        question: "Who discovered America in 1492?",
        options: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan", "Marco Polo"],
        correct:1,
        hint:"This explorer sailed west across the Atlantic Ocean from Spain."
    },
    {
        question: "On which date did Ukraine declare independence from the Soviet Union?",
        options: ["July 16, 1990", "December 25, 1991", "January 1, 1992", "August 24, 1991"],
        correct:3,
        hint:"Think late August 1991, right after the failed coup in Moscow."
    },
    {
        question: "Who led the Indian independence movement using nonviolent protest?",
        options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Bhagat Singh"],
        correct:1,
        hint:"He is known for peaceful protests and civil disobedience."
    },
    {
        question: "Which treaty ended World War I?",
        options: ["Treaty of Versailles", "Treaty of Paris", "Treaty of Tordesillas", "Treaty of Ghent"],
        correct:0,
        hint:"It’s named after a famous French palace."
    },
];

// counter from questions, strikes, score
let currentQuestion = 0; 
let strikes = 0;
let myScore = 0;
let answer = false; //track if  user has answered the current qn
let pendingResults = false;

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
        showPopup("✅ Correct! Vault security bypassed! Click Next to try the next security layer");
        myScore = myScore + 1;
            console.log(myScore)


    if(currentQuestion === 4) {
        showPopup("🎉 Congrats! You cracked the vault!");
        goToResults();
        return;
    }
    
    }else {
        //wrong answer: add strike
        strikes= strikes + 1;

        if (strikes >=2) {
            showPopup("🚨 Busted! Correct answer: " + q.options[q.correct] +" Moving to results ...");
            // goToResults(); //game stops here
            pendingResults = true;
            return;

        } else{
      showPopup("❌ Wrong! Strike 1: Try again", "wrong");
        }
    }
}

// Ending the game
function nextQuestion() {
    if(!answered){
     showPopup("⚠️ You must answer before moving on!");
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
    showPopup("💡 Hint: " + q.hint);
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
};
function showPopup(message, type){
    const popup = document.getElementById("popup");
    const box = document.querySelector(".popup-box");

    document.getElementById("popupMessage").innerText = message;

    // remove old styles
    box.classList.remove("wrong");

    // apply red style if wrong
    if(type === "wrong"){
        box.classList.add("wrong");
    }

    popup.classList.remove("hidden");
}
function closePopup(){
    document.getElementById("popup").classList.add("hidden");
    if(pendingResults) {
        pendingResults = false;
        goToResults();
    }
}