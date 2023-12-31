import { useMutation, useQuery } from '@apollo/client';
import {
  Button, Form, Input, message, Modal, Select, Table, Image,
} from 'antd';
import {  useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import {
  DELETE_CONSTRUCCION_MUTATION,
  QUERY_ALL_CONSTRUCCIONES,
  QUERY_ALL_PREDIOS,
  REFRESH_QUERY_CONSTRUCCIONES,
  UPDATE_CONSTRUCCION_MUTATION,
} from '../../backend/graphql/mutaciones';
import BarraDeNav from '../menu';
import type { Construccion, Predio } from '../../tipos';


export default function Predios() {
  const { Option } = Select;
  const { data } = useQuery(QUERY_ALL_CONSTRUCCIONES);
  const { data: dataPredios } = useQuery(QUERY_ALL_PREDIOS);
  const [updateConstruccion] = useMutation(
    UPDATE_CONSTRUCCION_MUTATION,
    REFRESH_QUERY_CONSTRUCCIONES,
  );
  const [deleteConstruccion] = useMutation(
    DELETE_CONSTRUCCION_MUTATION,
    REFRESH_QUERY_CONSTRUCCIONES,
  );
  const [ModalAbierto, setModalAbierto] = useState(false);
  const [modalForm] = Form.useForm();
  const [filtroIdConstruccion, setFiltroIdConstruccion] = useState('');
  
  const onBorrarConstruccion = (values: Construccion) => {
    try {
      deleteConstruccion((
        {
          variables: {
            id: values.id,
          },
        }
      ));
      message.success('registro eliminado con exito');
    } catch (error) {
      message.error(`error al eliminar registro , ${error}`);
    }
  };
  const editConstruccion = (values: Construccion) => {
    try {
      updateConstruccion((
        {
          variables: {
            id: values.id,
            idpredio: values.idpredio,
            numpisos: values.numpisos,
            areatotal: values.areatotal,
            tipocons: values.tipocons,
            direccion: values.direccion,
          },
        }
      ));
      message.success('registro actualizado exitosamente');
    } catch (error) {
      message.error('error al actualizar el registro');
    }
    setModalAbierto(false);
  };
  const selectPredio = (construccion: Construccion) => {
    setModalAbierto(true);
    modalForm.setFieldsValue({
      id: construccion.id,
      idpredio: construccion.idpredio,
      numpisos: construccion.numpisos,
      areatotal: construccion.areatotal,
      tipocons: construccion.tipocons,
      direccion: construccion.direccion,

    });
  };

  const dataTabla = data?.allConstrucciones.edges.map(
    (edge: Construccion) => (
      {
        id: edge.node.id,
        idpredio: edge.node.idpredio,
        imagen: edge.node.imagen ? <Image src={edge.node.imagen} width={100} /> : 'No hay Imagen',
        numpisos: edge.node.numpisos,
        areatotal: edge.node.areatotal,
        tipocons: edge.node.tipocons,
        direccion: edge.node.direccion,

      }
    ),
  ) || [];

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'id Predio',
      dataIndex: 'idpredio',
      key: 'idpredio',
    },
    {
      title: 'Imagen',
      dataIndex: 'imagen',
      key: 'imagen',
    },
    {
      title: 'Numero de pisos',
      dataIndex: 'numpisos',
      key: 'numpisos',
    },
    {
      title: 'Area total',
      dataIndex: 'areatotal',
      key: 'areatotal',
    },
    {
      title: 'Tipo de construccion',
      dataIndex: 'tipocons',
      key: 'tipocons',
    },
    {
      title: 'Direccion',
      dataIndex: 'direccion',
      key: 'direccion',
    },

    {
      title: 'Acciones',
      dataIndex: 'acciones',
      key: 'acciones',
      render: (x: unknown, construccion: Construccion) => (
        <>

          <EditOutlined
            onClick={() => {
              selectPredio(construccion);
            }}
          />

          <DeleteOutlined
            onClick={() => {
              onBorrarConstruccion(construccion);
            }}
            style={{ color: 'red', marginLeft: 20 }}
          />
        </>
      ),
    },
  ];

  return (
    (
      <>
      <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, background: '#ffffff'}}>
        <BarraDeNav />
        <Button type="primary">
          <Link href="/construcciones/nuevo"> Agregar nueva construccion </Link>
        </Button>
        <Input 
        placeholder="Buscar por id de construccion"
        onChange={e => setFiltroIdConstruccion(e.target.value)}
      />
        <Table
         dataSource={dataTabla.filter((construccion: Construccion) => String(construccion.id).includes(filtroIdConstruccion))}
          columns={columns}
          size="large"
        />
        <Modal
          title="Editando Construccion"
          cancelText="Cancelar"
          okText="Guardar"
          visible={ModalAbierto}
          onOk={modalForm.submit}
          onCancel={() => setModalAbierto(false)}
        >

          <Form
            form={modalForm}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            onFinish={editConstruccion}
          >
            <Form.Item
              label="id"
              name="id"
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="id Predio"
              name="idpredio"
            >
              <Select defaultValue="Escoja un predio">
                {dataPredios?.allPredios.edges.map((edge: Predio) => (
                  <Option value={edge.node.idpredio}>{edge.node.idpredio}</Option>
                ))}
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
              label="Tipo de construccion"
              name="tipocons"
              rules={[
                {
                  required: true,
                  message: 'Ingresa el tipo de construccion',
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
                  message: 'Ingresa la direccion de tu construccion',
                },
              ]}
            >
              <Input />
            </Form.Item>

          </Form>
        </Modal>
      </div>
      </>
    )
  );
}
