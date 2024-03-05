const questions = [
    {
      question: "What is K-means clustering used for?",
      options: ["Classification", "Regression", "Clustering", "Dimensionality Reduction"],
      answer: "Clustering"
    },
    {
      question: "What does 'K' represent in K-means clustering?",
      options: ["Number of clusters", "Number of features", "Number of iterations", "None of the above"],
      answer: "Number of clusters"
    },
    {
      question: "K-means clustering algorithm is an unsupervised algorithm.",
      options: ["True", "False"],
      answer: "True"
    },
    {
      question: "Why do we use K-means clustering in Weka tool?",
      options: ["To perform data preprocessing", "To create decision trees", "To perform clustering analysis", "To perform regression analysis"],
      answer: "To perform clustering analysis"
    },
    {
      question: "What is Weka tool?",
      options: ["A machine learning library", "A data visualization tool", "An integrated collection of machine learning algorithms", "A database management system"],
      answer: "An integrated collection of machine learning algorithms"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 60;
  let timerInterval;
  
  // Retrieve scores from local storage or initialize an empty array
  let highestScores = JSON.parse(localStorage.getItem("highestScores")) || [];
  
  function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    
    questionElement.textContent = questions[currentQuestion].question;
    optionsElement.innerHTML = "";
    
    questions[currentQuestion].options.forEach((option, index) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("option");
      optionElement.textContent = option;
      optionElement.addEventListener("click", () => checkAnswer(option));
      optionsElement.appendChild(optionElement);
    });
  }
  
  function checkAnswer(selectedOption) {
    if (selectedOption === questions[currentQuestion].answer) {
      score++;
      document.getElementById("result").textContent = "Correct!";
    } else {
      document.getElementById("result").textContent = "Incorrect!";
    }
    
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
  function updateTimer() {
    const timerElement = document.getElementById("timer");
    if (timeLeft > 0) {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = `Time Left: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    } else {
      clearInterval(timerInterval);
      endQuiz();
    }
  }
  
  function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById("question").textContent = "";
    document.getElementById("options").textContent = "";
    document.getElementById("timer").textContent = "";
    document.getElementById("result").textContent = `Quiz ended! Your score: ${score}/${questions.length}`;
  
    // Display correct answers
    const correctAnswersElement = document.createElement("div");
    correctAnswersElement.classList.add("correct-answers");
    questions.forEach((question, index) => {
      const answerElement = document.createElement("div");
      answerElement.textContent = `${index + 1}. ${question.question} - ${question.answer}`;
      correctAnswersElement.appendChild(answerElement);
    });
    document.querySelector(".container").appendChild(correctAnswersElement);
  
    // Show result page
    const resultPage = document.createElement("div");
    resultPage.classList.add("result-page");
    resultPage.innerHTML = `
      <h2>Quiz Result</h2>
      <p>You scored: ${score}/${questions.length}</p>
      <p>${score >= questions.length / 2 ? "Well done!" : "You can do better!"}</p>
    `;
    document.querySelector(".container").appendChild(resultPage);
  
    // Update highest scores if applicable
    const personName = prompt("Enter your name:");
    highestScores.push({ name: personName, score: score });
    highestScores.sort((a, b) => b.score - a.score);
    highestScores = highestScores.slice(0, 10); // Keep only the top 10 scores
    localStorage.setItem("highestScores", JSON.stringify(highestScores)); // Save scores to local storage
    displayHighScores();
  }
  
  function displayHighScores() {
    const highScoresElement = document.createElement("div");
    highScoresElement.classList.add("high-scores");
    highScoresElement.innerHTML = `
      <h3>Highest Scores</h3>
      <ul>
        ${highestScores.map((person, index) => `<li>${index + 1}. ${person.name}: ${person.score}</li>`).join("")}
      </ul>
    `;
    document.querySelector(".container").appendChild(highScoresElement);
  }
  
  displayQuestion();
  timerInterval = setInterval(updateTimer, 1000);