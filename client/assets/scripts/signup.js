document.getElementById("form-box").addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(e.target.username.value);
  const form = new FormData(e.target);

  console.log(form.get("username"));

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: form.get("username"),
      password: form.get("password"),
    }),
  };

  const response = await fetch(
    "https://six-seven-quizzes.onrender.com/register",
    options,
  );
  const data = await response.json();

  if (response.status == 201) {
    alert("Registered Sucessfully!");
    window.location.assign("login.html");
  } else {
    alert(data.error);
  }
});
