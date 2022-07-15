import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPosts, deletePost, reset } from '../features/posts/postSlice';
import Loader from '../components/Loader';
import { FaPlusCircle } from 'react-icons/fa';
import PostCard from '../components/PostCard';
import AvatarSelectionModal from '../components/AvatarSelectionModal';
import { toast } from 'react-toastify';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { projectStorage } from '../firebase/config';
import FirebasePostCard from '../components/FirebasePostCard';

const imageListRef = ref(projectStorage, 'images/');
export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageList, setImageList] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.post
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
      //console.log(message);
    }
    /*
    if (!user) {
      navigate('/login');
    }*/

    document.title = `${user.name}'s Profile`;
    dispatch(getPosts());
  }, [user, navigate, isSuccess, isError, message, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  function handlePost(post) {
    navigate('/post', { state: { post: post } });
  }

  function handlecreatePost() {
    navigate('/create');
  }

  const postElements = posts.map((post, index) => {
    return (
      <>
        <img
          src={`http://localhost:5000/${post.cover}`}
          alt='post'
          key={post._id}
          onClick={() => handlePost(post)}
        />
      </>
    );
  });

  const fireBasePostCards = posts.map((post) => {
    return (
      <FirebasePostCard
        key={post._id}
        imageRef={post.imageRef}
        title={post.title}
        location={post.location}
        description={post.description}
        user={post.userName}
        handleClick={() => handlePost(post)}
      />
    );
  });

  const postCards = posts.map((post, index) => {
    return (
      <PostCard
        key={post._id}
        cover={post.cover}
        title={post.title}
        location={post.location}
        description={post.description}
        user={post.userName}
        handleClick={() => handlePost(post)}
      />
    );
  });

  return (
    <section className='profile-section'>
      <div className='profile-content'>
        <div className='top'>
          <h2 class='profile-name main-title'>{user.name}'s Profile</h2>
          <div className='info'>
            <div className='name line subtitle'>
              Name: <span className='text'>{user.name}</span>
            </div>
            <div className='email line subtitle'>
              Email: <span className='text'>{user.email}</span>
            </div>
            <p onClick={() => setIsOpen(true)} className='text'>
              Change Avatar
            </p>
          </div>
          <h2 className='post-header main-header'>
            YOUR POSTS({posts.length})
          </h2>
          <button onClick={handlecreatePost} className='btn primary post-btn'>
            <FaPlusCircle />
            New Post
          </button>
        </div>
        <div className='post-grid'>
          {/* {postCards} */}
          {fireBasePostCards}
          {posts.length <= 0 && <h3>You dont have any posts yet</h3>}

          {/* {imageList.map((item) => {
        if (item.includes(user._id)) {
          return <img src={item} />;
        } else {
          return null;
        }
      })} */}
        </div>
      </div>
      <AvatarSelectionModal
        open={isOpen}
        handleClick={() => setIsOpen(false)}
      />
    </section>
  );
}
