import { Button, Typography, Card, Row, Col } from 'antd';
import { useRouter } from 'next/router';
import 'antd/dist/antd.css';
import styles from '../styles/background.module.css';

export default function Home() {
  const router = useRouter();

  const handleIniciarSesion = () => {
    router.push('/auth/login');
  };

  return (
    <div className={styles.container}>
      <Row gutter={16} className={styles.cards}>
        <Col span={12}>
          <Card cover={<img alt="medellin" src="/medellin.jpg" />} bordered={false} />
        </Col>
        <Col span={12}>
          <Card cover={<img alt="bucaramanga" src="/bucaramanga.jpg" />} bordered={false} />
        </Col>
        <Col span={12}>
          <Card cover={<img alt="cali" src="/cali.jpg" />} bordered={false} />
        </Col>
        <Col span={12}>
          <Card cover={<img alt="bogota" src="/bogota.jpg" />} bordered={false} />
        </Col>
      </Row>
      <Typography.Title level={2}>Bienvenido a la prueba técnica Catastro Colombia</Typography.Title>
      <Typography.Paragraph>
        El país ha tomado la decisión de aventurarse en un nuevo sistema de administración por eso te invitamos a consultar y hacer uso de esta nueva plataforma.
      </Typography.Paragraph>
      <Typography.Title level={3}>Si quieres iniciar te invitamos a:</Typography.Title>
      <Button type="primary" size="large" onClick={handleIniciarSesion}>Iniciar sesión</Button>
    </div>
  );
}
