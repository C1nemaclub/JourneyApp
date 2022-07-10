import React from 'react';
import ReactDom from 'react-dom';

export default function FullPostView(props) {
  console.log(props);

  const modal_style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ccc',
    padding: '50px',
    zIndex: '1000',
    borderRadius: '5px',
  };

  const overlay_style = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 1000,
  };

  if (!props.open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      (
      <div style={overlay_style}>
        <div style={modal_style} onClick={(e) => props.handleClick(e)}>
          {props.info.title}
          {props.info.location}
          {props.info.description}
          <img src={`http://localhost:5000/${props.info.image}`} alt='' />
          <button className='btn primary' onClick={props.handleClose}>
            Close
          </button>
        </div>
      </div>
      )
    </>,
    document.getElementById('portal2')
  );
}
