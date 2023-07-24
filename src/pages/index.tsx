import { Button, Typography, Card, Row, Col, Space } from 'antd';
import { useRouter } from 'next/router';
import styles from '../styles/background.module.css';
import { motion } from "framer-motion";

const rotationAnimation = {
  hidden: { rotate: -10, opacity: 0 },
  visible: {
    rotate: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

export default function Home() {
  const router = useRouter();

  const handleIniciarSesion = () => {
    router.push('/auth/login');
  };

  const handleConsultarInstructivo = () => {
    window.open('https://docs.google.com/document/d/1l-KFF6_n6EJDlyugxB4XWR0xeJXzUT_WYDWJGxUD6RU/edit?usp=sharing', '_blank');
  };

  return (
    <motion.div 
      className={styles.container}
      variants={rotationAnimation}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        initial={{ opacity: 0, scale: 0.85 }} 
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Bienvenido a la prueba técnica de Catastro Colombia
      </motion.h1>
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
      <Typography.Paragraph>
        El país ha tomado la decisión de aventurarse en un nuevo sistema de administración por eso te invitamos a consultar y hacer uso de esta nueva plataforma.
      </Typography.Paragraph>
      <Typography.Title level={3}>Te invitamos a:</Typography.Title>
      <Space size="large">
        <Button type="primary" size="large" onClick={handleIniciarSesion}>Iniciar sesión</Button>
        <Button type="primary" size="large" onClick={handleConsultarInstructivo}>Consultar instructivo de uso</Button>
      </Space>
    </motion.div>
  );
}
