// import React, { useState, useEffect } from 'react';
// import { projectFirestore } from '../firebase/config';

// function useStorage(file) {
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState(null);
//   const [url, setUrl] = useState(null);
//   useEffect(() => {
//     //references
//     const storageRef = projectFirestore.put(file.name);

//     storageRef.put(file).on(
//       'state_changed',
//       (snap) => {
//         let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
//         setProgress(percentage);
//       },
//       (err) => {
//         setError(err);
//       },
//       async () => {
//         const url = await storageRef.getDownloadURL();
//         setUrl(url);
//       }
//     );
//   }, [file]);

//   return { progress, url, error };
// }

// export default useStorage;
