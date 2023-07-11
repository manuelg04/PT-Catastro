import { useMutation } from '@apollo/client';
import {
  Button, Form, Input, message,
} from 'antd';
import 'antd/dist/antd.css';
import styles from '../../../styles/menu.module.css';
import Menu from '../../menu';
import { CREATE_USUARIO_MUTATION } from '../../../backend/graphql/mutaciones';
import { Usuario } from '../../../src/tipos';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Register() {
  const [crearUsuario] = useMutation(CREATE_USUARIO_MUTATION);
  const onFinish = (values:Usuario) => {
    try {
      crearUsuario((
        {
          variables: {
            nombre: values.nombre,
            email: values.email,
            numdoc: values.numdoc,
            password: values.password,
          },
        }
      ));
      message.success('Registro Creado Correctamente');
    } catch (error) {
      message.error(`error al crear registro, ${error}`);
    }
  };
  return (
    <>
      <Menu />
      <h1 className={styles.register}> Bienvenido, registrate para iniciar sesion </h1>
      <Form
        id="formulario"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
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
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Ingresa su password',
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Crear Cuenta
          </Button>
        </Form.Item>
      </Form>
    </>

  );
}
