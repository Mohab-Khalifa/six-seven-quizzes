// ko
describe("login.js", () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="form-box">
        <input name="username" value="testUser" />
        <input name="password" value="secret" />
        <button type="submit">Login</button>
      </form>
    `;

    // Mock alert
    global.alert = jest.fn();

    // Mock localStorage
    global.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn()
    };

    // Mock window.location.assign
    delete window.location;
    window.location = { assign: jest.fn() };

    // Mock fetch
    global.fetch = jest.fn();

    // Loading the script AFTER mocks + DOM exist
    jest.resetModules();
    require("../scripts/login.js");
  });

  it("sends login request with correct body", async () => {
    fetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({ token: "abc123" })
    });

    const form = document.getElementById("form-box");
    await form.dispatchEvent(new Event("submit"));

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3015/login",
      expect.objectContaining({
        method: "POST",
        headers: expect.any(Object),
        body: JSON.stringify({
          username: "testUser",
          password: "secret"
        })
      })
    );
  });

  it("stores token and redirects on success", async () => {
    fetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({ token: "abc123" })
    });

    const form = document.getElementById("form-box");
    await form.dispatchEvent(new Event("submit"));

    expect(localStorage.setItem).toHaveBeenCalledWith("token");
    expect(window.location.assign).toHaveBeenCalledWith("HomePage.html");
  });

  it("alerts error message on failure", async () => {
    fetch.mockResolvedValueOnce({
      status: 401,
      json: async () => ({ error: "Invalid credentials" })
    });

    const form = document.getElementById("form-box");
    await form.dispatchEvent(new Event("submit"));

    expect(alert).toHaveBeenCalledWith("Invalid credentials");
  });

});
