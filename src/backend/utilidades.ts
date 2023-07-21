import { message } from 'antd';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';

export const ImageURL = 'https://picsum.photos/100/100';

export const handleUploadFile = (
  imageFile:File,
  setProgressUpload: any,
  setDownloadURL:any,
):void => {
  if (imageFile) {
    const { name } = imageFile;
    const storageRef = ref(storage, `image/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressUpload(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        message.error(error.message);
      },
      () => {
        if (name) {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDownloadURL(url);
          });
        }
      },
    );
  } else {
    message.error('No hay archivo');
  }
};