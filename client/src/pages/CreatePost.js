import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost, reset } from '../features/posts/postSlice';
import { useDropzone } from 'react-dropzone';
import '../styles/PostForm.css';
import { useSelector } from 'react-redux';
import ProgressBar from '../components/ProgressBar';
import { FaFileImage } from 'react-icons/fa';
import { projectStorage } from '../firebase/config';
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { toast } from 'react-toastify';

export default function CreatePost() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadStart, setUploadStart] = useState(null);
  const [acceptedFiles, setAcceptedFiles] = useState([
    'image/jpeg',
    'image/png',
  ]);

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
      //console.log(acceptedFiles);
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
    data.append('imageRef', image.name + user._id);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('likes', 0);

    const data2 = {
      imageRef: image.name + user._id,
      title: formData.title,
      description: formData.description,
      location: formData.location,
      likes: 0,
    };
    console.log(data2);

    //* Check if image exists
    if (image == null) return;
    if (acceptedFiles.includes(image.type)) {
      const imageRef = ref(projectStorage, `images/${image.name + user._id}`);
      const metadata = {
        contentType: 'image/jpeg',
        contentType: 'image/png',
      };

      const uploadTask = uploadBytesResumable(imageRef, image, metadata);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setUploadStart(true);
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          dispatch(createPost(data2));
          dispatch(reset());
          navigate('/profile');
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {});
        }
      );
    } else {
      toast.error('Supported files are JPEG and PNG');
    }
  }

  function Cancel() {
    navigate(-1);
  }

  return (
    <>
      <div className='post-main'>
        <div className='post-container'>
          <h1 className='post-title'>New Post</h1>
          <form onSubmit={(e) => onSubmit(e)} className='post-form'>
            <div className='left-col-post'>
              <div className='input-group'>
                <input
                  type='text'
                  name='title'
                  value={formData.title}
                  onChange={(e) => onChange(e)}
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
                  {uploadStart && (
                    <ProgressBar
                      bgcolor='#4d58ec'
                      progress={uploadProgress}
                      height={15}
                    />
                  )}

                  {/* {uploadStart && (
                    <h3 className='upload'>{`${uploadProgress.toFixed(
                      0
                    )}%`}</h3>
                  )} */}
                </div>
                <label>Photo</label>
              </div>

              <div className='buttons'>
                <button type='button' className='btn danger' onClick={Cancel}>
                  Cancel
                </button>
                <button type='submit' className='btn primary'>
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
