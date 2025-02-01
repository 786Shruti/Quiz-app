import React, { useState } from "react";
import Quiz from "./components/Quiz";
import "./App.css"; // Import CSS for styling

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div className="app-container">
      {!quizStarted ? (
        <div className="welcome-container">
          <header>
            <h1>Quiz App</h1>
          </header>
          <main>
            <div className="welcome-screen">
              <h1>Welcome to the Quiz!</h1>
              <p>Test your knowledge and earn points.</p>
              <button className="start-btn" onClick={() => setQuizStarted(true)}>
                Start Quiz
              </button>
            </div>
          </main>
          <footer>
            <p>© 2025 Shruti's Quiz App. All rights reserved.</p>
          </footer>
        </div>
      ) : (
        <Quiz />
      )}
    </div>
  );
}

export default App;
