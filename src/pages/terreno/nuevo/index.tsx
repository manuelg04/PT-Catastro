import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  Button, Form, Input, message, Select, Progress,
} from 'antd';
import 'antd/dist/antd.css';
import { useRouter } from 'next/router';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  useEffect, useState,
} from 'react';
import {
  CREATE_TERRENO_MUTATION, QUERY_ALL_PREDIOS, ALL_TERRENOS_BY_ID_PREDIO
} from '../../../backend/graphql/mutaciones';
import Menu from '../../menu';
import { Predio, Terreno } from '../../../src/tipos';
import { storage } from '../../../backend/firebaseConfig';
import { MAIN_URL } from '../../../constantes';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Terrenos() {
  const { Option } = Select;
  const [formu] = Form.useForm();
  const { data } = useQuery(QUERY_ALL_PREDIOS);
  const router = useRouter();
  const [crearTerreno] = useMutation(CREATE_TERRENO_MUTATION);
  const [loadData] = useLazyQuery(ALL_TERRENOS_BY_ID_PREDIO);
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

  const onFinish = async (values:Terreno) => {
    const idpredioInt = (values.idpredio);
    try {
      const TerrenoConPredioAsignado = await loadData({ variables: { idpredio: idpredioInt } });
      // TerrenoConPredioAsignado.data.allTerrenos.edges
      const { data: { allTerrenos: { edges } } } = TerrenoConPredioAsignado;
      if(edges && edges.length > 0){
        message.error('El predio ya tiene un terreno asignado');
      }else{
        crearTerreno((
          {
            variables: {
              id: values.id,
              idpredio: idpredioInt,
              area: values.area,
              valorcomer: values.valorcomer,
              tipoterre: values.tipoterre,
              consdentro: values.consdentro,
              fuenagua: values.fuenagua,
              imagen: values.imagen,
            },
          }
        ));
        message.success('registro creado correctamente');
      }

    } catch (error) {
      message.error(`error al crear el registro: ${error}`);
    }
    router.push(`${MAIN_URL}/terreno`);
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
      <h1>Esta es la pagina para Crear terrenos</h1>
      <Form
        name="basic"
        form={formu}
        id="formulario"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Predio"
          name="idpredio"
        >
          <Select defaultValue="Escoja un predio">
            {

                          data?.allPredios.edges.map((edge:Predio) => (
                            // eslint-disable-next-line react/jsx-key, react/no-children-prop
                            <Option value={edge.node.idpredio}>{edge.node.idpredio}</Option>
                          ))
                        }
          </Select>
        </Form.Item>
        <Form.Item
          label="Area"
          name="area"
          rules={[
            {
              required: true,
              message: 'Ingresa el area de tu terreno',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Valor comercial del terreno"
          name="valorcomer"
          rules={[
            {
              required: true,
              message: 'Ingresa el valor comercial del terreno',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
  label="Tipo de terreno"
  name="tipoterre"
  rules={[
    {
      required: true,
      message: 'Selecciona el tipo de terreno',
    },
  ]}
>
  <Select placeholder="Selecciona un tipo de terreno">
    <Option value="rural">Rural</Option>
    <Option value="urbano">Urbano</Option>
  </Select>
</Form.Item>

<Form.Item
  label="¿Tiene construcciones?"
  name="consdentro"
  rules={[
    {
      required: true,
      message: 'Selecciona si tiene construcciones dentro de el',
    },
  ]}
>
  <Select placeholder="¿Tiene construcciones?">
    <Option value="si">Si</Option>
    <Option value="no">No</Option>
  </Select>
</Form.Item>

<Form.Item
  label="¿Tiene fuentes de agua?"
  name="fuenagua"
  rules={[
    {
      required: true,
      message: 'Selecciona si tiene fuentes de agua  dentro de el',
    },
  ]}
>
  <Select placeholder="¿Tiene fuentes de agua?">
    <Option value="si">Si</Option>
    <Option value="no">No</Option>
  </Select>
</Form.Item>

        <Form.Item
          label="Foto del terreno"
          name="imagen"
        >
          <Input
            type="file"
            name="imagen"
            placeholder="Selecciona Imagen"
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
        <Form.Item wrapperCol={{
          offset: 8,
          span: 20,
        }}
        />
      </Form>
    </>
  );
}
