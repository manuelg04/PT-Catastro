import { Form, Input, Button, Typography, Row, Col, Rate, message } from 'antd';
import BarraDeNav from './menu';
import styles from '../styles/crearNuevoPredio.module.css';
import { MAIN_URL } from '../constantes';
import axios from 'axios';
import { useState } from 'react';
import { set } from 'lodash';
const { TextArea } = Input;

const ContactMe = () => {
  const [valuesRating, setValuesRating] = useState(0);

  const onFinish = async (values: any) => {
    try {
     //Agrega valuesRating a values antes de enviar la solicitud
      values.rating = valuesRating;
      //console.log("🚀 ~ values:", values, valuesRating)
      await axios.post(`${MAIN_URL}/api/sendFeeback`, values)
      message.success('Feedback enviado correctamente');
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Hubo un error al enviar el feedback. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const [form] = Form.useForm();

  return (
    <>
    <div style={{ width: "80%", margin: "0 auto" }}>
    <BarraDeNav />
          <Row justify="center" className={styles.formContainer}>
        <Col xs={24} sm={22} md={20} lg={16} xl={14}>
          <Form
              form={form}
              name="contact_form"
              onFinish={onFinish}
              className={styles.form}
          >
             <center>
       <Typography.Title level={2} className={styles.formTitle}>
            Formulario Feedback Prueba Tecnica
          </Typography.Title>
          <Typography.Paragraph>
                  Estimado reclutador, este formulario es para enviarme retroalimentación. Como desarrollador,
                  valoro enormemente su opinión ya que me ayuda a mejorar continuamente mi trabajo. Sus comentarios
                  me permitirán refinar mis habilidades y ofrecer soluciones más eficaces. Gracias por su tiempo
                  y consideración.
                </Typography.Paragraph>
       </center>
              <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Por favor, ingresa tu nombre.' }]}
              >
                  <Input placeholder="Nombre" />
              </Form.Item>
              <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Por favor, ingresa tu email.' }]}
              >
                  <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                  name="observations"
                  rules={[{ required: true, message: 'Por favor, ingresa tus observaciones.' }]}
              >
                  <TextArea placeholder="Observaciones" />
              </Form.Item>

              <Form.Item
                  name="rating"
                  rules={[{  message: 'Por favor, califica mi trabajo.' }]}
              >
                  <Rate defaultValue={0}
                  onChange={(e)=>setValuesRating(e)} 
                  />
                  <Typography.Text>Califica mi trabajo:</Typography.Text>
              </Form.Item>

              <Form.Item>
                  <Button type="primary" htmlType="submit">
                      Enviar Feedback
                  </Button>
              </Form.Item>
          </Form>
        </Col>
        </Row>
      </div>
      </>
  );
}

export default ContactMe;
