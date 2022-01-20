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
          <option value='general knowladge'>General knowladge</option>
          <option value='sports'>Sports</option>
          <option value='history'>History</option>
          <option value='geography'>Geography</option>
          <option value='politicts'>Politics</option>
          <option value='animal'>Animal</option>
          <option value='art'>Art</option>
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
        <label htmlFor='numberOfQuestions'>Number Of Questions (max=40)</label>
        <input
          onChange={props.handleChangeSettings}
          value={props.quizSettings.numOfQuest}
          name='numOfQuest'
          type='number'
          id='numberOfQuestions'
          max="40"
          min='1'
        />
      </form>
      <button className='intro--btn'>Let's Play!</button>
    </main>
  );
}
