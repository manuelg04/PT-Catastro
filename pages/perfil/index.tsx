/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation, useQuery } from '@apollo/client';
import {
  Button, Form, Input, message,
} from 'antd';
import { useContext, useEffect, useState } from 'react';
import BarraDeNav from '../menu';
import 'antd/dist/antd.css';
import { UPDATE_USUARIO_MUTATION, REFRESH_QUERY_USUARIOS } from '../../backend/graphql/mutaciones';
import { Usuario } from '../../tipos';
import AppContext from '../api/AppContext';
import { clearConfigCache } from 'prettier';
import { isEmpty } from 'lodash';
import router from 'next/router';

export default function userPerfil() {
  const [updateUsuario] = useMutation(UPDATE_USUARIO_MUTATION, REFRESH_QUERY_USUARIOS);
  const context = useContext(AppContext);

  const editUsuario = (values:Usuario) => {
    const idUsuarioInt = parseInt((values.id), 10);

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
      context.setLlenarForm(values);
      message.success('registro actualizado exitosamente');
    } catch (error) {
      message.error('error al actualizar el registro');
    }
  };

  return (
    !isEmpty(context.llenarForm)
    && (
    <>
      <BarraDeNav />
      <h1>
        Bienvenido { context.llenarForm.nombre || 'USUARIO'} verifique sus datos si son correctos
      </h1>
      <Form
        id="formulario"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={editUsuario}
        initialValues={context.llenarForm}
      >
        <Form.Item
          label="id del usuario"
          name="id"
        >
          <Input />
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
