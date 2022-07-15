import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { TbHexagon } from 'react-icons/tb';

export default function FirebasePostCard(props) {
  return (
    <>
      <div className='card'>
        <div className='title'>{props.title}</div>

        <img
          src={`https://firebasestorage.googleapis.com/v0/b/uploadingimage-71d87.appspot.com/o/images%2F${props.imageRef}?alt=media&token=3888e9f7-7d66-4d72-b542-300c16d2a3c5`}
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
        <div className='card-user'>{props.user}</div>
        <div className='description'>{props.description}</div>
      </div>
    </>
  );
}
