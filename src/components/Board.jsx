import React from 'react';

export default function Board({
  handleCheckedAnswer,
  questions,
  handleToCheckBoard,
}) {
  const elements = questions.map((item, index) => {
    let question = atob(item.question);
    let styleElem;

    return (
      <div key={index} id={item.questionId} className='question--container'>
        <h2 className='question'>{question}</h2>
        <div className='answers--container'>
          {item.answers.map((element) => {
            let answer = atob(element);
            // styling
            if (item.isAnswerChecked) {
              if (item.correctAnswer === element) {
                styleElem = {
                  border: '3px solid green',
                };
              } else if (
                item.userAnswer === answer &&
                item.userAnswer !== item.correctAnswer
              ) {
                styleElem = {
                  border: '3px solid red',
                };
              } else {
                styleElem = {
                  color: '#555',
                };
              }
            }

            return (
              <div
                key={element}
                id={item.questionId}
                className={
                  answer === item.userAnswer ? 'answer checked' : 'answer'
                }
                style={styleElem}
                onClick={handleCheckedAnswer}
              >
                {answer}
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <section className='board--container'>
      {elements}
      <button onClick={handleToCheckBoard} className='check--answers-btn'>
        Check answers
      </button>
    </section>
  );
}
