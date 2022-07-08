import React from 'react';

export default function AvatarGallery(props) {
  const style = {
    background: props.selected ? '#4000FF' : '',
  };

  if (props.id === props.current) {
    return;
  }

  return (
    <img
      src={props.image}
      selected={props.selected}
      style={style}
      alt='avatar'
      className='avatar'
      onClick={props.handleClick}
    />
  );
}
