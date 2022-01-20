import React from 'react';

export default function Board(props) {
  const elements = props.questions.map((item, index) => {
    let unshuffledAnswers = item.incorrect_answers;
    let shuffledAnswers = unshuffledAnswers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    console.log(shuffledAnswers);
    let question = atob(item.question);

    return (
      <div key={index} className='question--container'>
        <h2 className='question'>{question}</h2>
        <div className='answers--container'>
          {shuffledAnswers.map((item) => {
            let answer = atob(item);
            return <div className={'answer'}>{answer}</div>;
          })}
        </div>
      </div>
    );
  });

  console.log(props.questions);

  return (
    <section className='board--container'>
      {elements}
      <button className='check--answers-btn'>Check answers</button>
    </section>
  );
}
