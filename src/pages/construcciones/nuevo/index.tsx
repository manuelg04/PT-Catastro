import {
  Button, Form, Input, message, Select, Progress,
} from 'antd';
import 'antd/dist/antd.css';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  useEffect, useState,
} from 'react';
import { CREATE_CONSTRUCION_MUTATION, QUERY_ALL_PREDIOS } from '../../../backend/graphql/mutaciones';
import Menu from '../../menu';
import { Construccion, Predio } from '../../../src/tipos';
import { storage } from '../../../backend/firebaseConfig';
import { MAIN_URL } from '../../../constantes';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Propietarios() {
  const { Option } = Select;
  const [formu] = Form.useForm();
  const router = useRouter();
  const { data } = useQuery(QUERY_ALL_PREDIOS);
  const [crearConstruccion] = useMutation(CREATE_CONSTRUCION_MUTATION);
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

  const onFinish = (values:Construccion) => {
    const idpredioInt = (values.idpredio);
    try {
      crearConstruccion((
        {
          variables: {
            idpredio: idpredioInt,
            numpisos: values.numpisos,
            areatotal: values.areatotal,
            tipocons: values.tipocons,
            direccion: values.direccion,
            imagen: values.imagen,
          },
        }
      ));
      message.success('registro creado correctamente');
    } catch (error) {
      message.error('error al crear el registro , error');
    }
    router.push(`${MAIN_URL}/construcciones`);
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
      <h1>Esta es la pagina para Crear Construcciones</h1>
      <Form
        name="basic"
        form={formu}
        id="formulario"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="id Predio"
          name="idpredio"
        >
          <Select defaultValue="Escoja un predio">
            {
                          data?.allPredios.edges.map((edge: Predio) => (
                            // eslint-disable-next-line react/jsx-key, react/no-children-prop
                            <Option value={edge.node.idpredio}>{edge.node.idpredio}</Option>
                          ))
                }
          </Select>
        </Form.Item>
        <Form.Item
          label="Numero de pisos"
          name="numpisos"
          rules={[
            {
              required: true,
              message: 'Ingresa el numero de pisos de tu construccion',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Area total de la construccion"
          name="areatotal"
          rules={[
            {
              required: true,
              message: 'Ingresa el area total de tu construccion',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
    label="Tipo de construcción"
    name="tipocons"
    rules={[
        {
            required: true,
            message: 'Por favor selecciona el tipo de construcción',
        },
    ]}
>
    <Select placeholder="Selecciona el tipo de construcción">
        <Option value="Comercial">Comercial</Option>
        <Option value="Industrial">Industrial</Option>
        <Option value="Residencial">Residencial</Option>
    </Select>
</Form.Item>
        <Form.Item
          label="Direccion"
          name="direccion"
          rules={[
            {
              required: true,
              message: 'Ingresa la direccion de tu construccion',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Foto del propietario"
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
