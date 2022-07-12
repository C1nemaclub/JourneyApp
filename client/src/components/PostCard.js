import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { TbHexagon } from 'react-icons/tb';

export default function PostCard(props) {
  return (
    <>
      <div className='card'>
        <div className='title'>{props.title}</div>

        <img
          src={`http://localhost:5000/${props.cover}`}
          alt='post'
          onClick={() => {
            props.handleClick();
            props.handleModal(props);
          }}
        />

        <div className='location'>
          <FaMapMarkerAlt className='icon' />
          <a
            href={`http://maps.google.com/?q=${props.location}`}
            className='text'
          >
            {props.location}
          </a>
        </div>
        <div className='user'>{props.user}</div>
        <div className='description'>{props.description}</div>
      </div>
    </>
  );
}
