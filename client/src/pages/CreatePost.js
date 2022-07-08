import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost, reset } from '../features/posts/postSlice';
import { useDropzone } from 'react-dropzone';

export default function CreatePost() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setImagePreview(URL.createObjectURL(acceptedFiles[0]));
      setImage(acceptedFiles[0]);
      setFile(
        acceptedFiles.map((file) =>
          Object.assign('file', {
            preview: URL.createObjectURL(file),
          })
        )
      );
      console.log(acceptedFiles);
    },
  });

  const images = file.map((file, index) => (
    <img key={index} src={file.preview} alt='image' className='prev' />
  ));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('file', image);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('likes', 0);
    dispatch(createPost(data));
    dispatch(reset());
    navigate('/profile');
  }

  return (
    <>
      <div>
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={(e) => onChange(e)}
          />
          <input
            type='text'
            name='location'
            value={formData.location}
            onChange={(e) => onChange(e)}
          />
          <input
            type='text'
            name='description'
            value={formData.description}
            onChange={(e) => onChange(e)}
          />
          <div {...getRootProps()} className='container'>
            <input {...getInputProps()} />
            <p>Drag & Drop your files or Browse</p>
            {images}
          </div>
          <button>Create Post</button>
        </form>
      </div>
    </>
  );
}
