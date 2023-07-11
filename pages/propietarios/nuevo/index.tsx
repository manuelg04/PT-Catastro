/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import { useMutation, useQuery } from '@apollo/client';
import {
  Button, Form, Input, message, Select, Progress,
} from 'antd';
import 'antd/dist/antd.css';
import { useRouter } from 'next/router';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  useEffect, useState,
} from 'react';
import { CREATE_PROPIETARIO_MUTATION, QUERY_ALL_PREDIOS } from '../../../backend/graphql/mutaciones';
import Menu from '../../menu';
import { Predio, Propietario } from '../../../tipos';
import { storage } from '../../../backend/firebaseConfig';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Propietarios() {
  const { Option } = Select;
  const [formu] = Form.useForm();
  const router = useRouter();
  const { data } = useQuery(QUERY_ALL_PREDIOS);
  const [crearPropietario] = useMutation(CREATE_PROPIETARIO_MUTATION);
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

  const onFinish = (values:Propietario) => {
    try {
      crearPropietario((

        {
          variables: {
            tipoprop: values.tipoprop,
            tipodoc: values.tipodoc,
            numdoc: values.numdoc,
            nombre: values.nombre,
            direccion: values.direccion,
            telefono: values.telefono,
            email: values.email,
            image: values.image,

          },
        }
      ));
      message.success('registro creado correctamente');
    } catch (error) {
      message.error('"error al crear el registro", error');
    }
    router.push('http://localhost:3000/propietarios');
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
      <h1>Esta es la pagina para Crear propietarios</h1>
      <Form
        name="basic"
        form={formu}
        id="formulario"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Id Predio"
          name="idpredio"
        >
          <Select
            defaultValue="Escoja el Id de un predio"
          >
            {
              data?.allPredios.edges.map((edge:Predio) => (
                <Option value={edge.node.idpredio}>{edge.node.idpredio}</Option>
              ))
            }
          </Select>

        </Form.Item>
        <Form.Item
          label="Tipo de propietario"
          name="tipoprop"
          rules={[
            {
              required: true,
              message: 'Ingresa el tipo de propietario, puede ser Persona natural o Juridica',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tipo de documento"
          name="tipodoc"
          rules={[
            {
              required: true,
              message: 'Ingresa tipo de documento, NIT Ó CC',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Numero de documento"
          name="numdoc"
          rules={[
            {
              required: true,
              message: 'Ingresa el numero de documento',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nombre / razon social"
          name="nombre"
          rules={[
            {
              required: true,
              message: 'Ingresa el nombre o razon social',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Direccion"
          name="direccion"
          rules={[
            {
              required: true,
              message: 'Ingresa tu direccion',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Telefono"
          name="telefono"
          rules={[
            {
              required: true,
              message: 'Ingresa tu telefono',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Ingresa tu correo',
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
