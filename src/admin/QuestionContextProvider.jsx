import { createContext, useContext, useState } from 'react';

const QuestionContext = createContext();
export function QuestionContextProvider({ children }) {
  const [grade, setGrade] = useState(0);
  const [level, setLevel] = useState(0);
  const [subject, setSubject] = useState(0);
  const [query, setQuery] = useState('');

  return (
    <QuestionContext.Provider
      value={{
        grade,
        setGrade,
        level,
        setLevel,
        subject,
        setSubject,
        query,
        setQuery,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
export function useQuestionContext() {
  return useContext(QuestionContext);
}
