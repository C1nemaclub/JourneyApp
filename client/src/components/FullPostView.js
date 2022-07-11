import React from 'react';
import ReactDom from 'react-dom';
import { FaWindowClose } from 'react-icons/fa';

export default function FullPostView(props) {
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
        <div onClick={() => props.handleClick()} className='image-modal'>
          <div className='modal-title'>
            <h2>{props.info.title}</h2>
            <FaWindowClose onClick={props.handleClose} className='icon-close' />
          </div>
          <div className='modal-content'>
            <img src={`http://localhost:5000/${props.info.cover}`} alt='' />
          </div>
        </div>
      </div>
      )
    </>,
    document.getElementById('portal2')
  );
}
