/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import { useContext, Fragment, useEffect } from 'react';
import { Button, Menu, message } from 'antd';
import { EyeTwoTone, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { isEmpty, isNull } from 'lodash';
import AppContext from './api/AppContext';
import { MAIN_URL } from '../constantes';
import axios from 'axios';
import { setUser } from './redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function BarraDeNav() {
  const context = useContext(AppContext);
  const router = useRouter();
  const dispatch = useDispatch();
  const { nombre, numdoc } = useSelector((state) => state.user);
  
  const handleCerrarSesion = async () => {
    
    const response = await axios.post(`${MAIN_URL}/api/autenticacion/logout`)
    console.log("🚀 ~ response:", response)
    dispatch(setUser({
      nombre: '',
      numdoc: '',
    }))
   
    router.push('/auth/login');
  };

  return (
    <div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['']}>
         { !numdoc ?  ( 
        <Menu.Item key="login" icon={<UserOutlined />}>
          <Link className="link" href="/auth/login">
            Login
          </Link>
        </Menu.Item>
        ) :(   <Menu.Item key="logout" >
        <Button icon={<UserOutlined />} className="link" onClick={() => handleCerrarSesion()}>
          Logout
        </Button>
      </Menu.Item>) } 
        <Menu.Item key="predios" icon={<EyeTwoTone />}>
          <Link className="link" href="/predios">Predios</Link>
        </Menu.Item>
        <Menu.Item key="terrenos" icon={<EyeTwoTone />}>
          <Link className="link" href="/terreno">Terrenos</Link>
        </Menu.Item>
        <Menu.Item key="propietarios" icon={<EyeTwoTone />}>
          <Link className="link" href="/propietarios">Propietarios</Link>
        </Menu.Item>
        <Menu.Item key="construcciones" icon={<EyeTwoTone />}>
          <Link className="link" href="/construcciones">Construcciones</Link>
        </Menu.Item>
        <Menu.Item key="perfil" icon={<EyeTwoTone />}>
          <Link className="link" href="/perfil">Perfil</Link>
        </Menu.Item>
        {context.mostrarLogin || (
        <Menu.Item key="cerrarSesion" icon={<EyeTwoTone />}>
          <Link onClick={handleCerrarSesion} href="/auth/login"> Cerrar Sesion</Link>
        </Menu.Item>
        )}
      </Menu>
    </div>

  );
}
