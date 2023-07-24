import { useMutation, useQuery } from '@apollo/client';
import {
  Button, Col, Form, Input, message,Progress, Row, Select, Typography,
} from 'antd';
import { useRouter } from 'next/router';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  useEffect, useState,
} from 'react';
import Menu from '../../menu';
import { CREATE_PREDIO_MUTATION } from '../../../backend/graphql/mutaciones';

import { storage } from '../../../backend/firebaseConfig';
import type { Predio } from '../../../tipos';
import { MAIN_URL } from '../../../constantes';
import styles from '../../../styles/crearNuevoPredio.module.css';
import { gql } from '@apollo/client';

export default function Predios() {
  // logica
  const router = useRouter();
  const [formu] = Form.useForm();
  const [crearPredio] = useMutation(CREATE_PREDIO_MUTATION);
  const [progressUpload, setProgressUpload] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState<string>('');
  const { Option } = Select;

  const PROPIETARIOS_QUERY = gql`
  query MyQuery {
    allPropietarios {
      edges {
        node {
          nombre
        }
      }
    }
  }
`;
const { loading, error, data } = useQuery(PROPIETARIOS_QUERY);

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
    router.push(`${MAIN_URL}/predios`);
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
    <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, background: '#ffffff'}}>
      <Menu />
      <Row justify="center" className={styles.formContainer}>
        <Col xs={24} sm={22} md={20} lg={16} xl={14}>
      <Form
        name="basic"
        form={formu}
        id="formulario"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        className={styles.form}
      >
       <center>
       <Typography.Title level={2} className={styles.formTitle}>
            Sección Creación de predios
          </Typography.Title>
       </center>
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
  <Select placeholder="Selecciona un propietario">
    {loading ? (
      <Option value="" disabled>
        Cargando...
      </Option>
    ) : error ? (
      <Option value="" disabled>
        Error al cargar propietarios
      </Option>
    ) : (
      data.allPropietarios.edges.map(({ node: { nombre } }: { node: { nombre: string } }, index: number) => (
        <Option key={index} value={nombre}>
          {nombre}
        </Option>
      ))
    )}
  </Select>
</Form.Item>
        <Form.Item
          label="Foto del predio"
          name="image"
        >
          <Input
            type="file"
            name="image"
            placeholder="Selecciona Imagen"
            accept="image/jpeg"
            onChange={(files) => handleSelectedFile(files.target.files as any)}
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
           <Button type="primary" htmlType="submit" className={styles.formButton}>
            Guardar
          </Button>
        </Form.Item>
      </Form>
      </Col>
      </Row>
      </div>
    </>
  );
}
