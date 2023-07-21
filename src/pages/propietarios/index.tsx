/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-use-before-define */
import { useMutation, useQuery } from '@apollo/client';
import {
  Button, Form, Input, message, Modal, Table, Space, Image,
} from 'antd';
import { useState } from 'react';
import 'antd/dist/antd.css';
import {
  EditOutlined, DeleteOutlined, SearchOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import {
  DELETE_PROPIETARIO_MUTATION,
  QUERY_ALL_PROPIETARIOS,
  REFRESH_QUERY_PROPIETARIOS,
  UPDATE_PROPIETARIO_MUTATION,
} from '../../backend/graphql/mutaciones';
import BarraDeNav from '../menu';
import { Propietario } from '../../src/tipos';
import { isEmpty } from 'lodash';
import router from 'next/router';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Propietarios() {
  const { data } = useQuery(QUERY_ALL_PROPIETARIOS);
  const [updatePropietario] = useMutation(UPDATE_PROPIETARIO_MUTATION, REFRESH_QUERY_PROPIETARIOS);
  const [deletePropietario] = useMutation(DELETE_PROPIETARIO_MUTATION, REFRESH_QUERY_PROPIETARIOS);
  const [ModalAbierto, setModalAbierto] = useState(false);
  const [propietarioFilter, setPropietarioFilter] = useState();
  const [modalForm] = Form.useForm();
  const [buscar, setBuscar] = useState('');
 

  const selectPropietario = (propietario:Propietario) => {
    setModalAbierto(true);
    modalForm.setFieldsValue({
      id: propietario.id,
      tipodoc: propietario.tipodoc,
      tipoprop: propietario.tipoprop,
      nombre: propietario.nombre,
      numdoc: propietario.numdoc,
      telefono: propietario.telefono,
      email: propietario.email,
      direccion: propietario.direccion,

    });
  };
  const onBorrarPropietario = (values:Propietario) => {
    if (!values.idusuario) { // Comprueba si idusuario es nulo o indefinido
      message.error('El ID del usuario no puede ser nulo o indefinido');
      return;
    }
    try {
      deletePropietario((
        {
          variables: {
            idusuario: values.idusuario,
          },
        }
      ));
      message.success('registro eliminado con exito');
    } catch (error) {
      message.error(' error al eliminar registro , error');
    }
  };

  const dataTabla = data?.allPropietarios.edges.map(
    (edge:Propietario) => (
      {
        id: edge.node.id,
        idusuario: edge.node.idusuario,
        tipoprop: edge.node.tipoprop,
        imagen: edge.node.imagen ? <Image src={edge.node.imagen} width={100} /> : 'No hay Imagen',
        nombre: edge.node.nombre,
        tipodoc: edge.node.tipodoc,
        numdoc: edge.node.numdoc,
        telefono: edge.node.telefono,
        email: edge.node.email,
        direccion: edge.node.direccion,
      }

    ),
  );

  const funcionFiltrar = (value:string) => {
    const dataTablaFiltrada = dataTabla
      .filter((propietario:any) => propietario.numdoc.includes(value));
    // console.log(dataTablaFiltrada);
    setBuscar(dataTablaFiltrada);
  };

  const filtrarLodash = (value:string) => {
    const dataTablaFiltradalodash = dataTabla
      .filter((propietario:any) => propietario.numdoc.includes(value));

    if (value === null) {
      console.log('Viene nulo');
    } else {
      console.log('No viene Nulo');
    }

    setPropietarioFilter(dataTablaFiltradalodash);
  };

  // eslint-disable-next-line no-console

  const handleCancel = () => {
    setModalAbierto(false);
  };

  const editPropietario = (values: Propietario) => {
    try {
      updatePropietario((
        {
          variables: {
            id: values.id,
            tipoprop: values.tipoprop,
            tipodoc: values.tipodoc,
            numdoc: values.numdoc,
            nombre: values.nombre,
            direccion: values.direccion,
            telefono: values.telefono,
            email: values.email,
          },
        }
      ));
      message.success('registro actualizado exitosamente');
    } catch (error) {
      message.error('error al actualizar el registro');
    }
    handleCancel();
  };

  const columns = [

    {
      title: 'id',
      dataIndex: 'idusuario',
      key: 'idusuario',
    },
    {
      title: 'Imagen',
      dataIndex: 'imagen',
      key: 'imagen',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Tipo de documento',
      dataIndex: 'tipodoc',
      key: 'tipodoc',
    },
    {
      title: 'Numero de documento',
      dataIndex: 'numdoc',
      key: 'numdoc',
    },
    {
      title: 'Telefono',
      dataIndex: 'telefono',
      key: 'telefono',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
      render: (x: unknown, propietario:Propietario) => (
        <>

          <EditOutlined
            onClick={() => {
              selectPropietario(propietario);
            }}
          />

          <DeleteOutlined
            onClick={() => {
              onBorrarPropietario(propietario);
            }}
            style={{ color: 'red', marginLeft: 20 }}
          />
        </>
      ),
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    (
    <>
    <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, background: '#ffffff'}}>
      <BarraDeNav />
      <Button type="primary">
        <Link href="/propietarios/nuevo"> Agregar nuevo propietario </Link>
      </Button>
      <Space>
        <Input placeholder="Digite Numero De Documento" onChange={(e) => filtrarLodash(e.target.value)} />
      </Space>
      <Table
        dataSource={
          propietarioFilter || dataTabla // propietarioFilter ? propietarioFilter : dataTabla
        }
        columns={columns}
        size="large"
      />
      {/* <Table columns={columns2} dataSource={dataFiltro} /> */}
      
      <Modal
        title="Editando propietario"
        cancelText="Cancelar"
        okText="Guardar"
        visible={ModalAbierto}
        onOk={modalForm.submit}
        onCancel={handleCancel}
      >

        <Form
          form={modalForm}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={editPropietario}
        >

          <Form.Item label="ID" name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Id"
            name="id"
          >
            <Input disabled />
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
        </Form>
      </Modal>
    </div>
    </>
    )
  )
}
