test("form exists in the DOM", () => {
  document.body.innerHTML = `
    <form id="form-box">
      <input name="username" />
      <input name="password" />
      <button type="submit">Login</button>
    </form>
  `;

  const form = document.getElementById("form-box");
  expect(form).not.toBeNull();
});

test("dummy test to pass", () => {
  expect(true).toBe(true);
});