import { useQuery, useApolloClient } from '@apollo/client';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useContext, useEffect } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BarraDeNav from '../../menu';
import 'antd/dist/antd.css';
import styles from '../../../styles/menu.module.css';
import { QUERY_USUARIO } from '../../../backend/graphql/mutaciones';
import { Usuario } from './../../../tipos';
import axios from 'axios';
import { MY_TOKEN_NAME } from '../../../constantes';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';

export default function Login() {
  const router = useRouter();
  const client = useApolloClient();
  const [form] = Form.useForm();
  const dispatch = useDispatch(); // obtén dispatch
;
  const onFinish = async (values: Usuario) => {

    try {

      const response = await axios.post('http://localhost:3000/api/autenticacion/login2', values)
      const { nombre, numdoc } = response.data;
      dispatch(setUser({ nombre, numdoc }));
      if(response.status === 200){

        router.push('/perfil')
        
      }
 
    } catch (error) {
      message.error('Usuario o clave incorrectos');
    }
  };

  return (
    <>
      <BarraDeNav />
      <h1 className={styles.login}>Iniciar Sesión</h1>

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
          name="numdoc"
          rules={[{ required: true, message: 'Por favor ingresa tu cedula' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
          name="password"
          rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Contraseña"
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <Button type="primary" htmlType="submit" className="login-form-button">
            Iniciar Sesión
          </Button>
          O <Link href="/auth/register">Regístrate aquí</Link>
        </Form.Item>
      </Form>
    </>
  );
}
