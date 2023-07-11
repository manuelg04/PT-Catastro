import { useMutation } from '@apollo/client';
import {
  Button, Form, Input, message,Progress,
} from 'antd';
import 'antd/dist/antd.css';
import { useRouter } from 'next/router';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  useEffect, useState,
} from 'react';
import Menu from '../../menu';
import { CREATE_PREDIO_MUTATION } from '../../../backend/graphql/mutaciones';
import { Predio } from '../../../tipos';
import { storage } from '../../../backend/firebaseConfig';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Predios() {
  // logica
  const router = useRouter();
  const [formu] = Form.useForm();
  const [crearPredio] = useMutation(CREATE_PREDIO_MUTATION);
  const [progressUpload, setProgressUpload] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState<string>('');

  const handleUploadFile = () => {
    if (imageFile) {
      const { name } = imageFile;
      const storageRef = ref(storage, `image/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressUpload(progress);
        },
        (error) => {
          message.error(error.message);
        },
        // eslint-disable-next-line promise/catch-or-return, promise/always-return
        () => { getDownloadURL(uploadTask.snapshot.ref).then((url) => { setDownloadURL(url); }); },
      );
    } else {
      message.error('No hay archivo');
    }
  };

  const handleSelectedFile = (files: File[]):void => {
    if (files && files[0].size < 1000000) {
      setImageFile(files[0]);
    } else {
      message.error('Archivo muy pesado');
    }
  };

  const onFinish = (values: Predio) => {
    try {
      crearPredio((
        {
          variables: {
            numpre: values.numpre,
            nombre: values.nombre,
            valor: values.valor,
            depto: values.depto,
            municipio: values.municipio,
            propietarios: values.propietarios,
            image: values.image,
          },
        }
      ));
      message.success('Registro Creado Correctamente');
    } catch (error) {
      message.error(`error al crear registro, ${error}`);
    }
    router.push('http://localhost:3000/predios');
  };

  useEffect(() => {
    formu.setFieldsValue({
      image: downloadURL,
    });
    // getters
  }, [downloadURL]);

  useEffect(() => {
    if (imageFile) { handleUploadFile(); }
  }, [imageFile]);

  return (
    <>
      <Menu />
      <h1>Esta es la pagina para Crear predios</h1>
      <Form
        name="basic"
        form={formu}
        id="formulario"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >

        <Form.Item
          label="Numero Predial"
          name="numpre"
          rules={[
            {
              required: true,
              message: 'Ingresa el numero predial',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Avaluo"
          name="valor"
          rules={[
            {
              required: true,
              message: 'Ingrese el avaluo de tu predio',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[
            {
              required: true,
              message: 'Ingrese el nombre de tu predio',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Departamento"
          name="depto"
          rules={[
            {
              required: true,
              message: 'Ingresa el departamento asociado',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Municipio"
          name="municipio"
          rules={[
            {
              required: true,
              message: 'Ingresa el municipio asociado',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Propietarios"
          name="propietarios"
          rules={[
            {
              required: true,
              message: 'Ingresa el propietario asociado',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="URL Imagen"
          name="image"
        >
          <Input
            type="file"
            name="image"
            placeholder="Selecciona Imagen" // CENTRAR
            accept="image/jpeg"
            onChange={(files) => handleSelectedFile(files.target.files)}
          />
          {progressUpload !== 0 && (
          <Progress percent={progressUpload} />
          )}
          <h5>{imageFile && imageFile.name}</h5>

        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
