import React from 'react';

export default function Results(props) {
  return (
    <div className='results--container'>
      <p>
        Your results:{' '}
        <span>
          {props.numberOfCorrectAnswers}/{props.numOfQuest}
        </span>
      </p>
      <button className="btn-play-again" onClick={props.handlePlayAgain}>Play Again</button>
    </div>
  );
}
