/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation, useQuery, gql } from '@apollo/client';
import {
  Button, Form, Input, Select, message,
} from 'antd';
import { useEffect, useState } from 'react';
import BarraDeNav from '../menu';
import 'antd/dist/antd.css';
import { UPDATE_PROPIETARIO_MUTATION, REFRESH_QUERY_PROPIETARIOS } from '../../backend/graphql/mutaciones';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setUser } from '../redux/userSlice';
import { Propietario } from '../../tipos';



const GET_USER_BY_NUMDOC = gql`
 query MyQuery {
  allPropietarios {
    edges {
      node {
        nombre
        numdoc
      }
    }
  }
}

`;

export default function userPerfil() {
  const [form] = Form.useForm();
  const [updateUsuario] = useMutation(UPDATE_PROPIETARIO_MUTATION, REFRESH_QUERY_PROPIETARIOS);
  const dispatch = useDispatch(); // obtén dispatch
  const numdoc2 = '123456'; // Valor del número de documento del usuario que inició sesión
  const { Option } = Select;
  // Obtiene el numdoc del estado de Redux
  //const { nombre, numdoc, tipodoc, tipoprop, direccion, telefono, email, password } = useSelector((state: RootState) => state.user); // Obtén nombre y numdoc del estado de Redux
  const usuario = useSelector((state: RootState) => state.user); // Obtén nombre y numdoc del estado de Redux
  console.log("🚀 ~ usuario:", usuario)
  const {
    nombre, numdoc, tipodoc, tipoprop, direccion, telefono, email, password, idusuario
  } = useSelector((state: RootState) => state.user);
    const { data } = useQuery(GET_USER_BY_NUMDOC, {
      variables: { numdoc },
    });

  useEffect(() => {
    form.setFieldsValue({
      idusuario,
      nombre,
      numdoc,
      tipodoc,
      tipoprop,
      direccion,
      telefono,
      email,
      password,
    });
  }, [usuario]);

  const editUsuario = (values:Propietario) => {
    const idUsuarioInt = (values.idusuario, 10);// revisar si al editar se va como entero
    try {
      updateUsuario((
        {
          variables: {
            idusuario: idUsuarioInt,
            nombre: values.nombre,
            email: values.email,
            numdoc: values.numdoc,
            tipodoc: values.tipodoc,
            tipoprop: values.tipoprop,
            direccion: values.direccion,
            telefono: values.telefono,
            password: values.password,
          },

        }
      ));
      message.success('registro actualizado exitosamente');
    } catch (error) {
      message.error('error al actualizar el registro');
    }
  };

  return (
    <>
    <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, background: '#ffffff'}}>
      <BarraDeNav />
      <h1>
        Bienvenido {nombre || "Usuario Desconocido"} verifique sus datos si son
        correctos
      </h1>
      <Form
        id="formulario"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={editUsuario}
        form={form}

      >
        <Form.Item label="id del usuario" name="idusuario">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Tipo de Propietario"
          name="tipoprop"
          rules={[
            {
              required: true,
              message: "Ingresa el tipo de propietario",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tipo de Documento"
          name="tipodoc"
          rules={[
            {
              required: true,
              message: "Ingresa el tipo de documento",
            },
          ]}
        >
          <Select placeholder="Selecciona el tipo de documento">
            <Option value="Cedula">Cédula</Option>
            <Option value="NIT">NIT</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Dirección"
          name="direccion"
          rules={[
            {
              required: true,
              message: "Ingresa tu dirección",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Teléfono"
          name="telefono"
          rules={[
            {
              required: true,
              message: "Ingresa tu número de teléfono",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nombre/Razon Social"
          name="nombre"
          rules={[
            {
              required: true,
              message: "Ingresa tu nombre",
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
              message: "Ingresa tu correo",
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
              message: "Ingresa tu número de documento",
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Actualizar Datos
          </Button>
          <Button type="primary" href='/misPredios' >
            Datos correctos
          </Button>
        </Form.Item>
      </Form>
      </div>
    </>
  );
}
