import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPost } from '../features/posts/postSlice';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { FaFileImage } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { projectStorage } from '../firebase/config';
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';

export default function PostForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _id, title, description, location, likes, cover } = props.post;
  const { user } = useSelector((state) => state.auth);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState([]);
  const [formData, setFormData] = useState({
    _id: _id,
    title: title,
    description: description,
    location: location,
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
    },
  });

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
    data.append('imageRef', image.name + user._id);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('likes', 0);
    data.append('oldId', formData._id);

    //* Check if image exists
    if (image == null) return;
    const imageRef = ref(projectStorage, `images/${image.name + user._id}`);
    const uploadTask = uploadBytesResumable(imageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        console.log('Upload completed');
        dispatch(editPost(data));
        navigate('/profile');
        toast.success('Post edited successfully');
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  }
  const images = file.map((file, index) => (
    <img key={index} src={file.preview} alt='image' className='prev' />
  ));

  function Cancel() {
    navigate(-1);
  }

  return (
    <>
      <div className='post-main'>
        <h1 className='post-title'>Edit Post</h1>
        <form onSubmit={(e) => onSubmit(e)} className='post-form'>
          <div className='left-col-post'>
            <div className='input-group'>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={(e) => onChange(e)}
                className='text'
              />
              <label>Title</label>
            </div>
            <div className='input-group'>
              <textarea
                cols='4'
                rows='6'
                type='text'
                name='description'
                value={formData.description}
                onChange={(e) => onChange(e)}
                className='text'
              />
              <label>Description</label>
            </div>
          </div>
          <div className='right-col-post'>
            <div className='input-group'>
              <input
                type='text'
                name='location'
                value={formData.location}
                onChange={(e) => onChange(e)}
                className='text'
              />
              <label>Location</label>
            </div>
            <div className='input-group photo'>
              <div {...getRootProps()} className='image-container'>
                <input {...getInputProps()} />
                <div className='img-info'>
                  <p>
                    Drag & Drop your image or <span>Browse</span>
                  </p>
                  <FaFileImage className='icon' />
                  <p>Supports JPEG, JPG, PNG</p>
                </div>
                {images}
              </div>
              <label>Photo</label>
            </div>

            <div className='buttons'>
              <button type='button' className='btn danger' onClick={Cancel}>
                Cancel
              </button>
              <button type='submit' className='btn primary'>
                Update
              </button>
            </div>
          </div>
        </form>
        {/* <img src={`http://localhost:5000/${cover}`} alt='' /> */}
      </div>
    </>
  );
}
