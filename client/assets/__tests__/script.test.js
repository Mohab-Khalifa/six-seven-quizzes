// const {loadResults} = require("../scripts/script.js")



// describe("loadResults", () => {
//   beforeEach(() => {
//     // Mock
//     document.body.innerHTML = `
//       <div id="main-container"></div>
//       <h1 id="result-title"></h1>
//       <p id="result-message"></p>
//       <span id="result-score"></span>
//     `;

//     // Mock localStorage
//     Storage.prototype.getItem = jest.fn((key) => {
//       if (key === "token") return "fake-token";
//       if (key === "finalScore") return "5";
//     });

//     // Mock fetch
//     global.fetch = jest.fn();

//     // Silence console
//     console.log = jest.fn();
//     console.error = jest.fn();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("displays WIN state when score is 5", async () => {
    
//     });

//     expect(document.getElementById("result-title").textContent).toBe("YOU WON!");
//     expect(document.getElementById("result-score").textContent).toBe("5/5");

//     expect(document.getElementById("main-container").classList.contains("win-bg")).toBe(true);
//   });

//   it("displays LOSE state when score is less than 5", async () => {
//   })

//   it("sends correct token and score to API", async () => {
    
//   })
//   it("handles fetch error", async () => {
    
// });