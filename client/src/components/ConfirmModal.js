import React from 'react';
import ReactDom from 'react-dom';
export default function ConfirmModal(props) {
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
      <div style={overlay_style}></div>
    </>,
    document.getElementById('portal')
  );
}
