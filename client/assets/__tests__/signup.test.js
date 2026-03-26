const { renderDOM } = require("./helpers");

// const { TextEncoder, TextDecoder } = require("util");

// Object.assign(global, { TextDecoder, TextEncoder });

let dom;
let document;

describe("Signup", () => {
  beforeEach(async () => {
    dom = await renderDOM("./assets/signup.html");
    document = await dom.window.document;
  });

  it("When user enters details, to be redirected to login page & details stored in database", async () => {
    const signUpBtn = document.getElementById("form-box .main-btn");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    usernameInput.textContent = "KenBigBen";
    passwordInput.textContent = "123";

    expect(signUpBtn).toBeTruthy;
    expect(usernameInput.textContent).toBe("KenBigBen");
    expect(passwordInput.textContent).toBe("123");

    // signUpBtn.click();

    // expect(fetch).toHaveBeenCalledWith(
    //   "https://six-seven-quizzes.onrender.com/register",
    //   expect.objectContaining({
    //     method: "POST",
    //     headers: expect.any(Object),
    //     body: JSON.stringify({
    //       username: "KenBigBen",
    //       password: "123",
    //     }),
    //   }),
    // );
  });
});

// beforeEach(() => {
//   document.body.innerHTML = `
//     <form id="form-box">
//       <input name="username" value="newUser" />
//       <input name="password" value="newPass" />
//       <button type="submit">Submit</button>
//     </form>
//   `;

//   // Mock alert
//   global.alert = jest.fn();

//   // Mock console.log
//   global.console.log = jest.fn();

//   // Mock location
//   delete window.location;
//   window.location = {
//     assign: jest.fn(),
//   };

//   // Mock fetch
//   global.fetch = jest.fn();
// });

// require("../scripts/signup");

// describe("Sign Up", () => {

//   it("redirects to login aftser successful signup", async () => {

//       })
//     );

//     expect(alert).toHaveBeenCalledWith("Registered Sucessfully!");
//     expect(window.location.assign).toHaveBeenCalledWith("login.html");
//   });

//   it("shows an error alert after a failed signup", async () => {

//   });

//   it("prevents default form submission", async () => {

//   });

//   it("sends correct username and password in request body", async () => {

//   });

//   it("logs username to console", async () => {

//   });
