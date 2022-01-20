import React, { useState } from 'react';
import './App.css';
import IntroPage from './components/IntroPage';
import Board from './components/Board';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizSettings, setQuizSettings] = useState({
    category: 'any category',
    level: 'easy',
    numOfQuest: 10,
  });
  const [questions, setQuestions] = useState([]);

  function handleChangeSettings(event) {
    const { name, value } = event.target;
    console.log(value);
    setQuizSettings((prevQuizSettings) => {
      return { ...prevQuizSettings, [name]: value };
    });
  }
  function handleStartQuiz() {
    let categoryEndpoint =
      quizSettings.category !== 'any category'
        ? `&category=${quizSettings.category}`
        : '';
    const url = `https://opentdb.com/api.php?amount=${quizSettings.numOfQuest}${categoryEndpoint}&difficulty=${quizSettings.level}&type=multiple&encode=base64`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setQuestions(data.results));
    console.log(questions);
    setIsPlaying((prevState) => !prevState);
  }
  console.log(quizSettings);
  return (
    <div className='App'>
      {!isPlaying ? (
        <IntroPage
          handleChangeSettings={handleChangeSettings}
          quizSettings={quizSettings}
          handleStartQuiz={handleStartQuiz}
        />
      ) : (
        <Board questions={questions} />
      )}
    </div>
  );
}

export default App;
