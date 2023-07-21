/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import { Button, Menu } from 'antd';
import { BuildOutlined, EyeTwoTone, HomeOutlined, LogoutOutlined, ProfileOutlined, UnorderedListOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { MAIN_URL } from '../constantes';
import axios from 'axios';
import { setUser } from './redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/navBar.module.css';


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function BarraDeNav() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { numdoc } = useSelector((state) => state.user);
  
  const handleCerrarSesion = async () => {
    
    const response = await axios.post(`${MAIN_URL}/api/autenticacion/logout`)
    dispatch(setUser({
      nombre: '',
      numdoc: '',
      email: '',
      password: '',
      tipoprop: '',
      tipodoc: '',
      telefono: '',
      direccion: '',
      idusuario: ''
    }))
   
    router.push('/auth/login');
  };

  return (
    <>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[""]} style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu.Item key="predios" icon={<HomeOutlined />}>
          <Link className="link" href="/predios">
            Predios
          </Link>
        </Menu.Item>
        <Menu.Item key="terrenos" icon={<UnorderedListOutlined />}>
          <Link className="link" href="/terreno">
            Terrenos
          </Link>
        </Menu.Item>
        <Menu.Item key="propietarios" icon={<UsergroupAddOutlined/>}>
          <Link className="link" href="/propietarios">
            Propietarios
          </Link>
        </Menu.Item>
        <Menu.Item key="construcciones" icon={<BuildOutlined />}>
          <Link className="link" href="/construcciones">
            Construcciones
          </Link>
        </Menu.Item>
        <Menu.Item key="perfil" icon={<ProfileOutlined />}>
          <Link className="link" href="/perfil">
            Perfil
          </Link>
        </Menu.Item>
        {!numdoc ? (
          <Menu.Item key="login" icon={<UserOutlined />}>
            <Link className="link" href="/auth/login">
              Login
            </Link>
          </Menu.Item>
        ) : (
          <Menu.Item key="logout">
            <Button
              icon={<LogoutOutlined />}
              className="link"
              onClick={() => handleCerrarSesion()}
            >
              Logout
            </Button>
          </Menu.Item>
        )}
      </Menu>
      <br />
      <br />
      <br />
    </>
  );

}
