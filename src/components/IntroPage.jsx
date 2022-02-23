import React, { useState } from 'react';

export default function IntroPage(props) {
  return (
    <main className='intro--container'>
      <h1>Quiz App</h1>
      <form>
        <select
          value={props.quizSettings.category}
          onChange={props.handleChangeSettings}
          name='category'
          id='category'
        >
          <option value='any category'>Any category</option>
          <option value='9'>General knowladge</option>
          <option value='21'>Sports</option>
          <option value='23'>History</option>
          <option value='22'>Geography</option>
          <option value='24'>Politics</option>
          <option value='27'>Animal</option>
          <option value='28'>Vehicles</option>
          <option value='25'>Art</option>
        </select>
        <select
          name='level'
          onChange={props.handleChangeSettings}
          value={props.quizSettings.level}
          id='difficulty'
        >
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>
        <label htmlFor='numberOfQuestions'>
          Number Of Questions (max=40) <br />
          Some categories don't have more than 10 questions.
        </label>
        <input
          onChange={props.handleChangeSettings}
          value={props.quizSettings.numOfQuest}
          name='numOfQuest'
          type='number'
          id='numberOfQuestions'
          max={40}
          min={1}
        />
      </form>
      <button className='intro--btn' onClick={props.handleStartQuiz}>
        Let's Play!
      </button>
    </main>
  );
}
