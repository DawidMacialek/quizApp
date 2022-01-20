import React, { useState } from 'react';

export default function IntroPage() {
  return (
    <main className='container is-fullhd has-background-primary'>
      <h1>Quiz App</h1>
      <form>
        <select name='category' id='category'>
          <option value='any category'>Any category</option>
          <option value='general knowladge'>General knowladge</option>
          <option value='animal'>Animal</option>
          <option value='art'>Art</option>
        </select>
        <select name='difficulty' id='difficulty'>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>
        <label htmlFor='numberOfQuestions'>Number Of Questions (max=40)</label>
        <input type='number' id='numberOfQuestions' max='40' min='1' />
      </form>
    </main>
  );
}
