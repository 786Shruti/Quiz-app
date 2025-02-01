import React from "react";
import { motion } from "framer-motion";
import "./Summary.css";

const Summary = ({ score, total }) => {
  const badge =
    score >= total * 0.8
      ? "🏆 Gold"
      : score >= total * 0.5
      ? "🥈 Silver"
      : "🥉 Bronze";

  const getMessage = (badge) => {
    const badgeText = badge.split(" ")[1]; // Extract only "Gold", "Silver", or "Bronze"
    if (badgeText === "Gold") {
      return "🏆 Congratulations, You scored the very best!";
    } else if (badgeText === "Silver") {
      return "🥈 Congratulations, You scored well. Try for more!";
    } else {
      return "👍 Good effort! Keep trying.";
    }
  };

  return (
    <motion.div
      className="summary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Quiz Completed!</h1>
      <h2>Your Score: {score} / {total}</h2>
      <h3>🏅 Award: {badge}</h3>
      <h4>{getMessage(badge)}</h4>
      <button onClick={() => window.location.reload()}>Restart Quiz</button>
    </motion.div>
  );
};

export default Summary;
