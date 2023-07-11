/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from 'antd';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';

export const ImageURL = 'https://picsum.photos/100/100';
// eslint-disable-next-line import/prefer-default-export
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
        // eslint-disable-next-line promise/catch-or-return, promise/always-return
        if (name) {
          // eslint-disable-next-line promise/catch-or-return, promise/always-return
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

// export const handleSelectedFile = (files: File[]):void => {
//   if (files && files[0].size < 1000000) {
//     // setImageFile(files[0]);
//   } else {
//     message.error('Archivo muy pesado');
//   }
// };

// arreglar el componente de registrar
// generar un PDF //maketoPdf
// ajustar tipos
// Enviar correo de confirmacion al registrarse
// Despliegue
