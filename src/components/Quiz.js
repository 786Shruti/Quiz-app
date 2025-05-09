import { useState, useEffect } from "react";
import axios from "axios";
import Summary from "./Summary"; // Ensure the path is correct
import "./Quiz.css";

const API_URL = "https://quiz-app-go3x.onrender.com/api/quiz";



const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log(response.data);
      
      setQuestions(
        response.data.results.map((q) => ({
          description: q.question,
          options: [
            ...q.incorrect_answers.map((answer) => ({
              description: answer,
              is_correct: false,
            })),
            { description: q.correct_answer, is_correct: true },
          ].sort(() => Math.random() - 0.5), // Shuffle options
        }))
      );
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const handleAnswer = (selectedOption) => {
    setUserAnswers((prev) => [
      ...prev,
      {
        question: questions[currentQuestion].description,
        selected: selectedOption.description,
        correct: questions[currentQuestion].options.find((opt) => opt.is_correct).description
      }
    ]);

    if (selectedOption.is_correct) setScore((prevScore) => prevScore + 4);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      setQuizOver(true);
    }
  };

  return (
    <div className="quiz-wrapper">
      <header>
        <h1>Quiz App</h1>
      </header>
      <main>
        <div className="quiz-container">
          {!quizOver ? (
            questions.length > 0 ? (
              <div className="quiz-content">
                <h2>{questions[currentQuestion].description}</h2>
                <div className="options">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className="option-btn"
                      onClick={() => handleAnswer(option)}
                    >
                      {option.description}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p>Loading questions...</p>
            )
          ) : (
            <Summary 
              score={score} 
              total={questions.length * 4} 
              userAnswers={userAnswers} 
            />
          )}
        </div>
      </main>
      <footer>
        <p>© 2025 Shruti's Quiz App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Quiz;