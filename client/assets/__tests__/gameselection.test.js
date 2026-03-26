const { renderDOM } = require("./helpers");

let dom;
let document;
let game;

describe("Gameselection.html", () => {
  beforeEach(async () => {
    jest.resetModules();

    dom = await renderDOM("./assets/gameselection.html");
    document = await dom.window.document;

    global.window = dom.window;
    global.document = document;
    global.localStorage = dom.window.localStorage;

    game = require("../scripts/gameselection.js");
  });

  it("when startGame runs, the card flips and the first question is shown", () => {
    game.startGame();

    const cardInner = document.getElementById("cardInner");
    const question = document.getElementById("question");
    const buttons = document.querySelectorAll("#answer button");

    expect(cardInner.classList.contains("flip")).toBe(true);
    expect(question.textContent).toBe(
      "The great wall is located in which country?",
    );
    expect(buttons.length).toBe(4);
  });

  //Possibly write tests for js functions in gameselection.html
});
