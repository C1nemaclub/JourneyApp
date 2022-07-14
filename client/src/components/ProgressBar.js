import React from 'react';
import useStorage from '../hooks/useStorage';

export default function ProgressBar({ file, setFile }) {
  const { url, progress } = useStorage(file);
  console.log(progress, url);

  return <div className='progress-bar'>progress</div>;
}
