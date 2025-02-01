import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Summary.css";

const Summary = ({ score, total, userAnswers }) => {
  const [showAnswers, setShowAnswers] = useState(false); // Toggle for answer review

  const badge =
    score >= total * 0.8
      ? "🏆 Gold"
      : score >= total * 0.5
      ? "🥈 Silver"
      : "🥉 Bronze";

  const getMessage = (badge) => {
    const badgeText = badge.split(" ")[1];
    if (badgeText === "Gold") return "🏆 Congratulations, You scored the very best!";
    if (badgeText === "Silver") return "🥈 Great job! Try for a perfect score.";
    return "👍 Good effort! Keep practicing.";
  };

  return (
    <motion.div className="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>Quiz Completed!</h1>
      <h2>Your Score: {score} / {total}</h2>
      <h3>🏅 Award: {badge}</h3>
      <h4>{getMessage(badge)}</h4>

      <button onClick={() => setShowAnswers(!showAnswers)}>
        {showAnswers ? "Hide Answers" : "Review Answers"}
      </button>

      {showAnswers && (
        <div className="answer-review">
          <h3>Answer Review</h3>
          {userAnswers.map((answer, index) => (
            <div key={index} className="answer-item">
              <p><strong>Q{index + 1}:</strong> {answer.question}</p>
              <p className={answer.selected === answer.correct ? "correct" : "incorrect"}>
                <strong>Your Answer:</strong> {answer.selected}
              </p>
              <p className="correct-answer">
                <strong>Correct Answer:</strong> {answer.correct}
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}

      <button onClick={() => window.location.reload()}>Restart Quiz</button>
    </motion.div>
  );
};

export default Summary;
