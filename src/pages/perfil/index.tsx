/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation, useQuery, gql } from '@apollo/client';
import {
  Button, Form, Input, message,
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
  const [updateUsuario] = useMutation(UPDATE_PROPIETARIO_MUTATION, REFRESH_QUERY_PROPIETARIOS);
  const dispatch = useDispatch(); // obtén dispatch
  const numdoc2 = '123456'; // Valor del número de documento del usuario que inició sesión
  // Obtiene el numdoc del estado de Redux
  const { nombre, numdoc } = useSelector((state: RootState) => state.user); // Obtén nombre y numdoc del estado de Redux
  console.log('NuMdOC:', numdoc);

    // Realiza la consulta para obtener los datos del usuario
    const { loading, error, data } = useQuery(GET_USER_BY_NUMDOC, {
      variables: { numdoc2 },
    });
  console.log('Respuesta de GraphQL:', data);


  useEffect(() => {
    // Cuando los datos estén disponibles y no haya errores, establece el usuario en el estado de Redux
    if (!loading && !error && data) {
      dispatch(setUser(data.usuario));  // Asegúrate de que `data.usuario` tiene la estructura correcta
    }
  }, [loading, error, data, dispatch]);

  const editUsuario = (values:Propietario) => {
    const idUsuarioInt = parseInt((values.id || 1 ), 10);

    try {
      updateUsuario((
        {
          variables: {
            id: idUsuarioInt,
            nombre: values.nombre,
            email: values.email,
            numdoc: values.numdoc,
          },

        }
      ));
      message.success('registro actualizado exitosamente');
    } catch (error) {
      message.error('error al actualizar el registro');
    }
  };

  return (
    (
    <>
      <BarraDeNav />
      <h1>
        Bienvenido {nombre || 'Usuario Desconocido'} verifique sus datos si son correctos
      </h1>
      <Form
        id="formulario"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={editUsuario}

      >
        <Form.Item
          label="id del usuario"
          name="id"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[
            {
              required: true,
              message: 'Ingresa tu nombre',
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
          label="Numero de documento"
          name="numdoc"
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
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Actualizar Datos
          </Button>
        </Form.Item>
      </Form>

    </>
    )
  );
}
