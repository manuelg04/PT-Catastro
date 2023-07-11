/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-var-requires */
import { useQuery } from '@apollo/client';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import {
  Button, Checkbox, Form, Input, message,
} from 'antd';

import Link from 'next/link';
import { useRouter } from 'next/router';
import AppContext from '../../api/AppContext';
import BarraDeNav from '../../menu';
import 'antd/dist/antd.css';
import styles from '../../../styles/menu.module.css';
import { QUERY_ALL_USUARIOS } from '../../../backend/graphql/mutaciones';
import { Usuario } from '../../../tipos';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Login() {
  const router = useRouter();
  const [ocultarFormLogin, setOcultarFormLogin] = useState(false);
  const context = useContext(AppContext);
  const { data: dataUsuarios } = useQuery(QUERY_ALL_USUARIOS);
  const [form] = Form.useForm();


  const dataTablaUsuarios = dataUsuarios?.allUsuarios.edges.map(
    (edge:Usuario) => (
      {
        id: edge.node.id,
        email: edge.node.email,
        nombre: edge.node.nombre,
        password: edge.node.password,
        numdoc: edge.node.numdoc,
      }
    ),
  );
  const onFinish = (values: Usuario) => {
    const result = dataTablaUsuarios.find(({ email, password }:Usuario) => email === values.email && password === values.password);
    context.setLlenarForm(result);
    // Constante = ObjetoBUSCAR(condicion)
    if (result) {
      context.setMostrarLogin(false);
      setOcultarFormLogin(true);
      message.success('Inicio de sesion con exito');
      router.push('http://localhost:3000/perfil');
    } else {
      message.error('Usuario o clave incorrectos');
    }
  };
  return (
    <>
      <BarraDeNav />
      <h1 className={styles.login}>
        Iniciar Sesion
        {' '}
        {context.UserContext}
      </h1>
      { ocultarFormLogin ? '' : (
        <Form
          name="normal_login"
          className="login-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 8,
            }}
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 8,
            }}
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 8,
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Recuerdame</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 8,
            }}
          >
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or
            {' '}
            <Link href="/auth/register">Registarme aqui</Link>
          </Form.Item>
        </Form>
      ) }

    </>
  );
}
