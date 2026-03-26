const {
  startGame,
  loadQuestion,
  checkAnswer, // to do
  nextQuestion,
  goToResults, // to do
  showHint,
  retryQuestion,
} = require("../scripts/gameselection.js");

describe("gameselection.html", () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="cardInner"></div>

      <h3 id="question"></h3>

      <div id="answer"></div>

      <button id="startBtn" class="btn-primary">Start Game</button>
      <button id="nextBtn">Next</button>
      <button id="retryBtn">Retry</button>
      <button id="hintBtn">Hint</button>
    `;

    global.alert = jest.fn();

    // Reset game state
    global.currentQuestion = 0;
    global.strikes = 0;
    global.myScore = 0;
  });

  it("has a start button", () => {
    const btn = document.querySelector(".btn-primary");
    expect(btn).toBeTruthy();
    expect(btn.innerHTML).toContain("Start Game");
  });

  it("question is empty when website loads", () => {
    const h3 = document.querySelector("#question");
    expect(h3.innerHTML).toBe("");
  });

  //start

  it("displays the first question when the start button is clicked", () => {
    const btn = document.querySelector("#startBtn");
    btn.onclick = startGame;

    btn.click();

    const h3 = document.querySelector("#question");
    expect(h3.innerHTML).toBe(questions[0].question);
  });

  // Next question loads


  it("displays the next question when the next button is clicked", () => {
    currentQuestion = 0;
    loadQuestion();

    const nextBtn = document.querySelector("#nextBtn");
    nextBtn.onclick = nextQuestion;

    nextBtn.click();

    const h3 = document.querySelector("#question");
    expect(h3.innerHTML).toBe(questions[1].question);
  });

  // question loads

  it("creates 4 answer buttons when a question loads", () => {
    loadQuestion();

    const buttons = document.querySelectorAll("#answer button");
    expect(buttons.length).toBe(4);
    expect(buttons[0].innerHTML).toBe("item 1");
  });

  // next question loads

  it("moves to the next question when not at the end", () => {
    currentQuestion = 0;
    strikes = 0;

    const spy = jest.spyOn(global, "loadQuestion");

    nextQuestion();

    expect(currentQuestion).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it("goes to results when currentQuestion becomes 9", () => {
    currentQuestion = 8;
    strikes = 0;

    const spy = jest.spyOn(global, "goToResults");

    nextQuestion();

    expect(currentQuestion).toBe(9);
    expect(spy).toHaveBeenCalled();
  });

  // checking answer

  it("increments score when correct answer is clicked", () => {
    myScore = 0;
    currentQuestion = 0;
    loadQuestion();

    const correctIndex = questions[0].correct;
    const buttons = document.querySelectorAll("#answer button");

    buttons[correctIndex].onclick();

    expect(myScore).toBe(1);
  });

  // strikes
  it("adds a strike when the wrong answer is clicked", () => {
    strikes = 0;
    currentQuestion = 0;
    loadQuestion();

    const wrongIndex = 0;
    const buttons = document.querySelectorAll("#answer button");

    buttons[wrongIndex].onclick();

    expect(strikes).toBe(1);
  });
  
//strike 2
  it("goes to results after 2 strikes", () => {
    strikes = 1;
    currentQuestion = 0;
    loadQuestion();

    const spy = jest.spyOn(global, "goToResults");

    const wrongIndex = 0;
    const buttons = document.querySelectorAll("#answer button");

    buttons[wrongIndex].onclick();

    expect(spy).toHaveBeenCalled();
  });

  // Hint

  it("shows the correct hint when showHint() is called", () => {
    currentQuestion = 0;

    showHint();

    expect(alert).toHaveBeenCalledWith("Hint: " + questions[0].hint);
  });

  // Retry

  it("retryQuestion reloads the same question", () => {
    const spy = jest.spyOn(global, "loadQuestion");

    retryQuestion();

    expect(spy).toHaveBeenCalled();
  });

});