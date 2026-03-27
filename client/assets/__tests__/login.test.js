// const loginPath = require('../scripts/login.js')
const { renderDOM } = require("./helpers");
const jsdom = require("jsdom");
let dom;
let document;

describe("login", () => {
  beforeEach(async () => {
    dom = await renderDOM("./assets/login.html");
    document = await dom.window.document;
  });

  it("When existing user inputs details and presses submit, it redirects to gameselection", async () => {
    const loginBtn = document.getElementById("form-box .main-btn");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    usernameInput.textContent = "KenBigBen";
    passwordInput.textContent = "123";

    expect(loginBtn).toBeTruthy;
    expect(usernameInput.textContent).toBe("KenBigBen");
    expect(passwordInput.textContent).toBe("123");

    loginBtn.click();

    expect(localStorage.getItem("token")).toBeTruthy;
    expect(window.location).toBe("HomePage.html");
  });
});

// it("alerts error message on failure", async () => {
// })
