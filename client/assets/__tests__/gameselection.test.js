describe ("gameselection.html"), () => {
// Look at the start game button
it("has a start button", () => {
    const btn = document.querySelector("btn-primary")
    expect(btn).toBeTruthy()
    expect(btn.innerHTML).toContain("Start Game")
  })

  it("question is empty when website load", () => {
    const h3 = document.querySelector("h3");
    expect(h3).toBeTruthy()
    expect(h3.innerHTML).toBe("")
  })

  it("displays the first question when the start button is clicked", () => {
    const btn = document.querySelector("btn-primary")
    btn.click();
    const h3 = document.querySelector('h3')
    expect(h3.innerHTML).toBe("question 1")
  })

  
  it("displays the next question when the next button is clicked", () => {
    const btn = document.querySelector("button")
    expect(btn.innerHTML).toBe("")
  })

}

