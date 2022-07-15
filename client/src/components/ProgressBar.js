import React from 'react';

const Progress_bar = ({ bgcolor, progress, height }) => {
  const Parentdiv = {
    height: height,
    width: '80%',
    backgroundColor: 'whitesmoke',
    borderRadius: 40,
    margin: 50,
  };

  const Childdiv = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: 'right',
  };

  const progresstext = {
    padding: 10,
    color: 'black',
    fontWeight: 900,
    textDecoration: 'none',
  };

  return (
    <div style={Parentdiv} className='progress-bar'>
      <div style={Childdiv} className='progress-bar-child'>
        <span
          style={progresstext}
          className='progress-bar-text'
        >{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default Progress_bar;
