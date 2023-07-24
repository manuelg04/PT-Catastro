import {
  Button, Divider, Form, Input, Select, message,
} from 'antd'; 
import styles from '../../../styles/menu.module.css';
import Menu from '../../menu';
import type { Propietario } from './../../../tipos';
import axios from 'axios';
import { MAIN_URL } from '../../../constantes';
import { useRouter } from 'next/router';


export default function Register() {
  const router = useRouter();
  const [form] = Form.useForm();
 
  const onFinish = async (values:Propietario) => {
    try {
    const response = await axios.post(`${MAIN_URL}/api/autenticacion/register` , values) 
    if(response.status === 201){
      message.success('Registro Creado Correctamente');
      form.resetFields();
      router.push('/auth/login');
    }
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
        form={form}
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
          label="Número de documento"
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
          label="Tipo de propietario"
          name="tipoprop"
          rules={[
            {
              required: true,
              message: 'Selecciona el tipo de propietario',
            },
          ]}
        >
          <Select>
            <Select.Option value="personal">Personal Natural</Select.Option>
            <Select.Option value="juridica">Jurídica</Select.Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          label="Tipo documento"
          name="tipodoc"
          rules={[
            {
              required: true,
              message: 'Selecciona el tipo de documento',
            },
          ]}
        >
          <Select>
            <Select.Option value="cc">CC</Select.Option>
            <Select.Option value="nit">NIT</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Dirección"
          name="direccion"
          rules={[
            {
              required: true,
              message: 'Ingresa tu dirección',
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
              message: 'Ingresa tu número de teléfono',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Divider />
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
