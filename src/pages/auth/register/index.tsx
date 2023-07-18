import {
  Button, Form, Input, message,
} from 'antd';
import 'antd/dist/antd.css';
import styles from '../../../styles/menu.module.css';
import Menu from '../../menu';
import type { Usuario } from './../../../tipos';
import axios from 'axios';
import { MAIN_URL } from '../../../constantes';


export default function Register() {
 
  const onFinish = async (values:Usuario) => {
    try {
    const response = await axios.post(`${MAIN_URL}/api/autenticacion/register` , values) 
    if(response.status === 201){
      message.success('Registro Creado Correctamente');
    }
  } catch (error) {
    message.error(`error al crear registro, ${error}`);
  }
};
console.log(`${MAIN_URL}/api/autenticacion/register`)
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
              type: 'email',
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
              type: 'number',
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
