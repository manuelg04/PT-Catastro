import { Button, Typography } from 'antd';
import { useRouter } from 'next/router';
import 'antd/dist/antd.css';
import styles from '../styles/background.module.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Home() {
  const router = useRouter();

  const handleIniciarSesion = () => {
    router.push('/auth/login');
  };

  return (
    <div className={styles.container}>
      <Typography.Title style={{ fontSize: '3em' }}>Bienvenido a la prueba técnica Catastro Colombia</Typography.Title>
      <Typography.Paragraph style={{ fontSize: '2em' }}>
        El país ha tomado la decisión de aventurarse en un nuevo sistema de administración por eso te invitamos a consultar y hacer uso de esta nueva plataforma.
      </Typography.Paragraph>
      <Typography.Title level={3} style={{ fontSize: '2em' }}>Si quieres iniciar te invitamos a:</Typography.Title>
      <Button type="primary" size="large" onClick={handleIniciarSesion}>Iniciar sesión</Button>
    </div>
  );
}
