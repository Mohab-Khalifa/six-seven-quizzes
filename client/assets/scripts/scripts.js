async function loadResults() {
  try {
    const res = await fetch("http://localhost:3000/api/results"); // your backend
    const data = await res.json();

    const titleEl = document.getElementById("result-title");
    const messageEl = document.getElementById("result-message");
    const scoreEl = document.getElementById("result-score");
    const mainEl = document.getElementById("main-container");

    // SWITCH BASED ON RESULT
    if (data.result === "win") {
      titleEl.textContent = "YOU WON!";
      messageEl.innerHTML = `
        You bypassed every firewall.<br>
        Outsmarted every challenge.<br>
        And cracked the Brain Bank.
      `;
      mainEl.classList.add("win-bg");

    } else {
      titleEl.textContent = "Game Over";
      messageEl.innerHTML = `
        Uh-oh!<br>
        The police found you before you escaped.<br>
        Try again and make a smarter plan!
      `;
      mainEl.classList.add("lose-bg");
    }

    // Score 
    scoreEl.textContent = `${data.score}/${data.total}`;

  } catch (err) {
    console.error("Error fetching results:", err);

    document.getElementById("result-title").textContent = "Error";
    document.getElementById("result-message").textContent =
      "Failed to load results. Please try again.";
  }
}

// Button actions
function playAgain() {
  window.location.href = "./gameselection.html";
}

function goHome() {
  window.location.href = "./HomePage.html";
}

// Load when page opens
loadResults();