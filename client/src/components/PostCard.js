import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function PostCard(props) {
  return (
    <>
      <div
        className='card'
        onClick={() => {
          props.handleClick();
          props.handleModal(props);
        }}
      >
        <div className='title'>{props.title}</div>
        <img src={`http://localhost:5000/${props.image}`} alt='post' />

        <div className='location'>
          <FaMapMarkerAlt className='icon' />
          {props.location}
        </div>
        <div className='user'>{props.user}</div>
        <div className='description'>{props.description}</div>
      </div>
    </>
  );
}
