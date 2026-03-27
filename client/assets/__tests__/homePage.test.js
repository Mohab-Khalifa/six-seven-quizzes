const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
 
let document;
 
beforeEach(() => {
  const dom = new JSDOM(html);
  document = dom.window.document;
});
 
 
describe("Page structure", () => {
  test("page has a heading", () => {
    const h1 = document.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1.textContent).toMatch(/choose a game/i);
  });
 
  test(".games container exists", () => {
    expect(document.querySelector(".games")).not.toBeNull();
  });
 
  test("renders exactly 3 game cards", () => {
    expect(document.querySelectorAll(".card").length).toBe(3);
  });
});
 