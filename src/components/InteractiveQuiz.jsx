"use client";

import { useState } from "react";
import styles from "./InteractiveQuiz.module.css";
import { useLearning } from "./LearningContext";

export default function InteractiveQuiz({
  questions,
  lessonId,
  title = "Quiz Time!",
  titleBn = "অনলাইনে পরীক্ষা দিন!",
  onComplete,
}) {
  const { completeLesson } = useLearning();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle case where questions might be undefined or empty
  if (!questions || questions.length === 0) {
    return <div className={styles.quizContainer}>No questions available.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  // Use qid for tracking answers
  const hasSelectedAnswer = selectedAnswers[currentQuestion.qid] !== undefined;

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question) => {
      const selectedOption = selectedAnswers[question.qid];
      if (selectedOption === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  const handleOptionSelect = (option) => {
    if (isSubmitted) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.qid]: option,
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScore = calculateScore();
      setScore(finalScore);
      setShowResults(true);
      setIsSubmitted(true);

      // Award points based on performance
      const percentage = (finalScore / questions.length) * 100;
      let points = 0;
      if (percentage >= 90) points = 100;
      else if (percentage >= 80) points = 80;
      else if (percentage >= 70) points = 60;
      else if (percentage >= 60) points = 40;
      else points = 20;

      completeLesson(`${lessonId}-quiz`, points);
      onComplete?.(finalScore, questions.length);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setIsSubmitted(false);
  };

  if (showResults) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className={styles.quizContainer}>
        <div className={styles.resultsContainer}>
          <div className={styles.resultsHeader}>
            <div
              className={styles.scoreCircle}
              style={{ "--percentage": `${percentage}%` }}
            >
              <div className={styles.scoreText}>
                {score}/{questions.length}
              </div>
              <div className={styles.percentageText}>
                {Math.round(percentage)}%
              </div>
            </div>
            <h2 className={styles.resultsTitle}>
              {percentage >= 80
                ? "🎉 চমৎকার!"
                : percentage >= 60
                ? "👏 ভাল!"
                : "💪 আরো চেষ্টা!"}
            </h2>
          </div>

          <div className={styles.resultsSummary}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryIcon}>✅</span>
              <span>সঠিক উত্তর: {score}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryIcon}>❌</span>
              <span>ভুল উত্তর: {questions.length - score}</span>
            </div>
          </div>

          <div className={styles.resultActions}>
            <button onClick={handleRestart} className={styles.retryButton}>
              🔄 আবার চেষ্টা করুন
            </button>
          </div>

          {/* Detailed Review */}
          <div className={styles.reviewSection}>
            <h3 className={styles.reviewTitle}>📝 বিস্তারিত পর্যালোচনা</h3>
            <div className={styles.reviewList}>
              {questions.map((question, index) => {
                const selectedOption = selectedAnswers[question.qid];
                const isCorrect = selectedOption === question.correctAnswer;

                return (
                  <div
                    key={question.qid}
                    className={`${styles.reviewItem} ${
                      isCorrect ? styles.correct : styles.incorrect
                    }`}
                  >
                    <div className={styles.reviewHeader}>
                      <span className={styles.questionNumber}>
                        প্রশ্ন {index + 1}
                      </span>
                      <span
                        className={
                          isCorrect
                            ? styles.correctBadge
                            : styles.incorrectBadge
                        }
                      >
                        {isCorrect ? "✅ সঠিক" : "❌ ভুল"}
                      </span>
                    </div>
                    <div className={styles.reviewQuestion}>
                      {question.question}
                    </div>
                    <div className={styles.reviewAnswers}>
                      <div className={styles.answerRow}>
                        <strong>আপনার উত্তর:</strong>{" "}
                        {selectedOption || "কোনো উত্তর দেওয়া হয়নি"}
                      </div>
                      {!isCorrect && (
                        <div className={styles.answerRow}>
                          <strong>সঠিক উত্তর:</strong> {question.correctAnswer}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeader}>
        <h2 className={styles.quizTitle}>
          {titleBn} <span className={styles.titleEn}>({title})</span>
        </h2>
        <div className={styles.progressInfo}>
          <div className={styles.questionCounter}>
            প্রশ্ন {currentQuestionIndex + 1} / {questions.length}
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className={styles.questionCard}>
        <div className={styles.questionContent}>
          <h3 className={styles.questionText}>{currentQuestion.question}</h3>

          <div className={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`${styles.optionButton} ${
                  selectedAnswers[currentQuestion.qid] === option
                    ? styles.selected
                    : ""
                } ${
                  isSubmitted && option === currentQuestion.correctAnswer
                    ? styles.correct
                    : ""
                } ${
                  isSubmitted &&
                  selectedAnswers[currentQuestion.qid] === option &&
                  option !== currentQuestion.correctAnswer
                    ? styles.incorrect
                    : ""
                }`}
                disabled={isSubmitted}
              >
                <span className={styles.optionLetter}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className={styles.optionText}>{option}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.navigationButtons}>
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={styles.navButton}
          >
            ← পূর্ববর্তী
          </button>

          <button
            onClick={handleNext}
            disabled={!hasSelectedAnswer}
            className={`${styles.navButton} ${styles.nextButton}`}
          >
            {isLastQuestion ? "ফলাফল দেখুন" : "পরবর্তী →"}
          </button>
        </div>
      </div>
    </div>
  );
}
