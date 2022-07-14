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
            {/* <img src={`http://localhost:5000/${props.info.cover}`} alt='' /> */}
            <img
              src={`https://firebasestorage.googleapis.com/v0/b/uploadingimage-71d87.appspot.com/o/images%2F${props.info.imageRef}?alt=media&token=3888e9f7-7d66-4d72-b542-300c16d2a3c5`}
              alt=''
            />
          </div>
        </div>
      </div>
      )
    </>,
    document.getElementById('portal2')
  );
}
