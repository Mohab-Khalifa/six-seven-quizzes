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

