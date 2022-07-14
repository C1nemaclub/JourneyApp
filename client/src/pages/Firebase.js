import React, { useState, useEffect } from 'react';
import { projectStorage } from '../firebase/config';
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { useSelector } from 'react-redux';

const imageListRef = ref(projectStorage, 'images/');
export default function Firebase() {
  const { user } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [imageList, setImageList] = useState([]);

  function uploadImage() {
    if (file == null) return;
    const fileRef = ref(projectStorage, `images/${file.name + user._id}`);
    const uploadTask = uploadBytesResumable(fileRef, file);
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
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  }

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          console.log(url);
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  return (
    <div className='dash-section'>
      <input
        type='file'
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button onClick={uploadImage} className='btn'>
        Upload
      </button>
      {imageList.map((item) => {
        if (item.includes(user._id)) {
          return <img src={item} className='card' />;
        } else {
          return null;
        }
      })}
    </div>
  );
}
