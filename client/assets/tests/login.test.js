const { loginUser } = require("./login");

// fake fetch (so no real API call)
global.fetch = jest.fn();

test("login works with correct credentials", async () => {
  // pretend API response
  fetch.mockResolvedValue({
    status: 200,
    json: async () => ({ token: "abc123" }),
  });

  const result = await loginUser("user", "password");

  expect(result).toBe("success");
});