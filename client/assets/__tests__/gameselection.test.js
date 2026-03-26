const questions = require("../scripts/gameselection.js")
const {
  startGame,
  loadQuestion,
  checkAnswer,
  nextQuestion,
  goToResults, 
  showHint,
  retryQuestion,
} = require("../scripts/gameselection.js");

let dom;
let document;

describe("Gameselection.html", () => {
  beforeEach(async () =>{
    dom = await renderDOM('gameselection.html')
    document = await dom.window.document;
})

  it("When I select BBH, the game enters the BBH quiz and runs")
    const gameSelectionBtn = document.getElementById()

})