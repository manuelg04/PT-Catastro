import { useQuery, useApolloClient } from "@apollo/client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import BarraDeNav from "../../menu";
import "antd/dist/antd.css";
import styles from "../../../styles/homeLogin.module.css";
import { Propietario } from "./../../../tipos";
import axios from "axios";
import { MAIN_URL, MY_TOKEN_NAME } from "../../../constantes";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

export default function Login() {
  const router = useRouter();
  const client = useApolloClient();
  const [form] = Form.useForm();
  const dispatch = useDispatch(); // obtén dispatch
  const onFinish = async (values: Propietario) => {
    try {
      const response = await axios.post(
        `${MAIN_URL}/api/autenticacion/login`,
        values
      );
      const {
        nombre,
        numdoc,
        tipodoc,
        email,
        telefono,
        direccion,
        password,
        tipoprop,
        idusuario,
      } = response.data;
      dispatch(
        setUser({
          nombre,
          numdoc,
          tipodoc,
          email,
          telefono,
          direccion,
          password,
          tipoprop,
          idusuario,
        })
      );
      if (response.status === 200) {
        router.push("/perfil");
      }
    } catch (error) {
      message.error("Usuario o clave incorrectos");
    }
  };

  return (
    <>
    <div style={{
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(to right, #2b5876, #4e4376)',
}}>
      <BarraDeNav />
      <Typography.Title level={1} style={{ textAlign: "center" }}>
        Iniciar Sesión
      </Typography.Title>
      <Typography.Text
        type="warning"
        style={{ textAlign: "center", display: "block", fontSize: "20px" }}
      >
        Atención: tienes que iniciar sesión para poder visualizar tus predios,
        terrenos, construcciones y propietarios
      </Typography.Text>

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
          rules={[{ required: true, message: "Por favor ingresa tu cédula" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
          name="password"
          rules={[
            { required: true, message: "Por favor ingresa tu contraseña!" },
          ]}
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Iniciar Sesión
            </Button>
            <Link href="/auth/register" style={{ marginLeft: "60px" }}>
              Regístrate aquí
            </Link>
          </div>
        </Form.Item>
      </Form>
      </div>
    </>
  );
}
