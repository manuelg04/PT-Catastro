/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import { useContext, Fragment, useEffect } from 'react';
import { Button, Menu, message } from 'antd';
import { EyeTwoTone, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import AppContext from './api/AppContext';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function BarraDeNav() {
  const context = useContext(AppContext);
  const router = useRouter();


  const handleCerrarSesion = () => {
  
    context.setMostrarLogin(true);
    context.llenarForm = [];
    context.setLlenarForm([]);
    router.push('/auth/login');
  };

  return (
    <div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['']}>

        { context.mostrarLogin && (
        <Menu.Item key="login" icon={<UserOutlined />}>
          <Link className="link" href="/auth/login">
            Login
          </Link>
        </Menu.Item>
        )}
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
