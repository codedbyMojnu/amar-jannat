"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LearningContext = createContext();

export function LearningProvider({ children }) {
  const [progress, setProgress] = useState({});

  // Load progress from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProgress = localStorage.getItem("learningProgress");
      if (savedProgress) {
        try {
          setProgress(JSON.parse(savedProgress));
        } catch (e) {
          console.error("Failed to parse learning progress", e);
        }
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("learningProgress", JSON.stringify(progress));
    }
  }, [progress]);

  const completeLesson = (lessonId, score) => {
    setProgress((prev) => ({
      ...prev,
      [lessonId]: {
        completed: true,
        score: score,
        completedAt: new Date().toISOString(),
      },
    }));
  };

  const isLessonCompleted = (lessonId) => {
    return !!progress[lessonId]?.completed;
  };

  const getLessonScore = (lessonId) => {
    return progress[lessonId]?.score || 0;
  };

  return (
    <LearningContext.Provider value={{ progress, completeLesson, isLessonCompleted, getLessonScore }}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  return useContext(LearningContext);
}
