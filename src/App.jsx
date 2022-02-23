import React, { useState } from 'react';
import './App.css';
import IntroPage from './components/IntroPage';
import Board from './components/Board';
import Results from './components/Results';
import Timer from './components/Timer';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizSettings, setQuizSettings] = useState({
    category: 'any category',
    level: 'easy',
    numOfQuest: 10,
  });
  const [questions, setQuestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [timerStart, setTimerStart] = useState(true);
  //  tick choosen answer
  function handleCheckedAnswer(event) {
    const { innerText, id } = event.target;
    console.log(typeof parseInt(id));

    const checked = questions.map((item) => {
      if (!item.isAnswerChecked) {
        if (innerText === item.userAnswer) {
          item.userAnswer = '';
        } else if (parseInt(id) === item.questionId) {
          console.log(item.questionId);
          console.log(id);
          item.userAnswer = innerText;
        }
      }
      return item;
    });
    setQuestions(checked);
  }
  function checkingAnswers(arr) {
    let answersToCheck = arr.map((item) => {
      return { ...item, isAnswerChecked: true };
    });
    setQuestions(answersToCheck);
  }
  function numberOfCorrectAnswers(arr) {
    let correctAnswersArray = arr.filter(
      (item) => item.userAnswer === atob(item.correctAnswer)
    );

    console.log(correctAnswersArray);
    return correctAnswersArray.length;
  }

  // handle on click check the answers
  function handleToCheckBoard() {
    checkingAnswers(questions);
    setShowResults(true);
    numberOfCorrectAnswers(questions);
    setTimerStart(false);
  }
  function handlePlayAgain() {
    setIsPlaying(false);
    setShowResults(false);
    setTimerStart(true);
  }
  function suffleAnswers(arrToShuffle, correctAnswer) {
    let unshuffledAnswers = arrToShuffle;
    unshuffledAnswers.push(correctAnswer);
    let shuffledAnswers = unshuffledAnswers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return shuffledAnswers;
  }
  function handleChangeSettings(event) {
    const { name, value } = event.target;

    setQuizSettings((prevQuizSettings) => {
      return { ...prevQuizSettings, [name]: value };
    });
  }
  async function handleStartQuiz() {
    let categoryEndpoint =
      quizSettings.category !== 'any category'
        ? `&category=${quizSettings.category}`
        : '';
    const url = `https://opentdb.com/api.php?amount=${quizSettings.numOfQuest}${categoryEndpoint}&difficulty=${quizSettings.level}&type=multiple&encode=base64`;

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const gameState = [];
        data.results.forEach((item, index) => {
          gameState.push({
            questionId: index,
            question: item.question,
            correctAnswer: item.correct_answer,
            answers: suffleAnswers(item.incorrect_answers, item.correct_answer),
            category: item.category,
            userAnswer: '',
            isAnswerChecked: false,
          });
          return gameState;
        });

        if (data.results.length) {
          setQuestions(gameState);
          setIsPlaying((prevState) => !prevState);
        } else {
          alert(
            'There is not enough questions in this category, please set number of questions again.'
          );
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  return (
    <div className='app'>
      {!isPlaying ? (
        <IntroPage
          handleChangeSettings={handleChangeSettings}
          quizSettings={quizSettings}
          handleStartQuiz={handleStartQuiz}
        />
      ) : (
        <>
          <Board
            questions={questions}
            handleCheckedAnswer={handleCheckedAnswer}
            handleToCheckBoard={handleToCheckBoard}
          />
          <Timer
            numOfMinutes={questions.length}
            timerStart={timerStart}
            handleToCheckBoard={handleToCheckBoard}
          />
        </>
      )}
      {showResults && (
        <Results
          numOfQuest={questions.length}
          numberOfCorrectAnswers={numberOfCorrectAnswers(questions)}
          handlePlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}

export default App;
