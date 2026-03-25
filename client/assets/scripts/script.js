async function loadResults() {
  const token = localStorage.getItem("token");
  const finalScore = localStorage.getItem("finalScore");
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ score: Number(finalScore) }),
    };
    const res = await fetch(
      "https://six-seven-quizzes.onrender.com/score",
      options,
    );
    const data = await res.json();
    console.log("Token:", token);
    console.log("Final score:", finalScore);
    console.log("Status Code:", res.status);
    console.log("Overall response:", data);
    const titleEl = document.getElementById("result-title");
    const messageEl = document.getElementById("result-message");
    const scoreEl = document.getElementById("result-score");
    const mainEl = document.getElementById("main-container");
    
    const resultData = data.response;
    const score = resultData.score;
    const total = 5; 
    // SWITCH BASED ON RESULT
    if (score == 5) {
      titleEl.textContent = "YOU WON!";
      messageEl.innerHTML = `
        🎉You bypassed every firewall.<br>
        Outsmarted every challenge💻<br>
        And cracked the Brain Bank💰
      `;
      mainEl.classList.add("win-bg");
    } else {
      titleEl.textContent = "Game Over";
      messageEl.innerHTML = `
        🚨Uh-oh!<br>
        👮The police found you before you escaped.<br>
         Try again and make a smarter plan!
      `;
      mainEl.classList.add("lose-bg");
    }

    // Score
  scoreEl.textContent = `${score}/${total}`;
  } catch (err) {
    console.error("Error fetching results:", err);

    document.getElementById("result-title").textContent = "Error";
    document.getElementById("result-message").textContent =
      "Failed to load results. Please try again.";
  }
}
loadResults();
