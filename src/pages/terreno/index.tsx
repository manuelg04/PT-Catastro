import { useMutation, useQuery } from '@apollo/client';
import {
  Button, Form, Input, message, Modal, Select, Table, Image,
} from 'antd';
import 'antd/dist/antd.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Link from 'next/link';
import {
  DELETE_TERRENO_MUTATION,
  QUERY_ALL_TERRENOS,
  QUERY_ALL_PREDIOS,
  REFRESH_QUERY_TERRENOS,
  UPDATE_TERRENO_MUTATION,
} from '../../backend/graphql/mutaciones';
import BarraDeNav from '../menu';
import { Terreno } from '../../tipos';



// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Terrenos() {
  // logica
  const { Option } = Select;
  const { data } = useQuery(QUERY_ALL_TERRENOS);
  const { data: dataPredios } = useQuery(QUERY_ALL_PREDIOS);
  const [updateTerreno] = useMutation(UPDATE_TERRENO_MUTATION, REFRESH_QUERY_TERRENOS);
  const [deleteTerreno] = useMutation(DELETE_TERRENO_MUTATION, REFRESH_QUERY_TERRENOS);
  const [ModalAbierto, setModalAbierto] = useState(false);
  const [modalForm] = Form.useForm();
  const [filtroIdTerreno, setFiltroIdTerreno] = useState('');
 
  const handleCancel = () => {
    setModalAbierto(false);
  };

  const onBorrarTerreno = (values:Terreno) => {
    try {
      deleteTerreno((
        {
          variables: {
            id: values.id,
          },
        }
      ));
      message.success('registro eliminado con exito');
    } catch (error) {
      message.error(`error al eliminar registro , ${error}`);
    }
  };
  const editTerreno = (values:Terreno) => {
    try {
      updateTerreno((
        {
          variables: {
            id: values.id,
            idpredio: values.idpredio,
            area: values.area,
            valorcomer: values.valorcomer,
            tipoterre: values.tipoterre,
            consdentro: values.consdentro,
            fuenagua: values.fuenagua,
          },
        }
      ));
      message.success('registro actualizado exitosamente');
    } catch (error) {
      message.error('error al actualizar el registro');
    }
    handleCancel();
  };
  const selectTerreno = (terreno:Terreno) => {
    setModalAbierto(true);
    modalForm.setFieldsValue({
      id: terreno.id,
      idpredio: terreno.idpredio,
      area: terreno.area,
      valorcomer: terreno.valorcomer,
      tipoterre: terreno.tipoterre,
      consdentro: terreno.consdentro,
      fuenagua: terreno.fuenagua,

    });
  };

  const dataTabla = data?.allTerrenos.edges.map(
    (edge:Terreno) => (
      {
        id: edge.node.id,
        idpredio: edge.node.idpredio,
        imagen: edge.node.imagen ? <Image src={edge.node.imagen} width={100} /> : 'No hay Imagen',
        area: edge.node.area,
        valorcomer: edge.node.valorcomer,
        tipoterre: edge.node.tipoterre,
        consdentro: edge.node.consdentro,
        fuenagua: edge.node.fuenagua,

      }
    ),
  ) || [];
  const columns = [

    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'id Predio',
      dataIndex: 'idpredio',
      key: 'idpredio',
    },
    {
      title: 'Imagen',
      dataIndex: 'imagen',
      key: 'imagen',
    },
    {
      title: 'Area del terreno',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Valor comercial',
      dataIndex: 'valorcomer',
      key: 'valorcomer',
    },
    {
      title: 'Tipo de terreno',
      dataIndex: 'tipoterre',
      key: 'tipoterre',
    },
    {
      title: 'Construcciones dentro',
      dataIndex: 'consdentro',
      key: 'consdentro',
    },
    {
      title: 'Fuentes de agua cerca',
      dataIndex: 'fuenagua',
      key: 'fuenagua',
    },

    {
      title: 'Acciones',
      dataIndex: 'acciones',
      key: 'acciones',
      render: (x: unknown, terreno:Terreno) => (
        <>

          <EditOutlined
            onClick={() => {
              selectTerreno(terreno);
            }}
          />

          <DeleteOutlined
            onClick={() => {
              onBorrarTerreno(terreno);
            }}
            style={{ color: 'red', marginLeft: 20 }}
          />
        </>
      ),
    },
  ];

  return (
    
     (
    <>
      <BarraDeNav />
      <Button type="primary">
        <Link href="/terreno/nuevo"> Agregar nuevo terreno </Link>
      </Button>
      <Input 
        placeholder="Buscar por id del terreno"
        onChange={e => setFiltroIdTerreno(e.target.value)}
      />
      <Table
        dataSource={dataTabla.filter(terreno => String(terreno.id).includes(filtroIdTerreno))}
        columns={columns}
        size="large"
      />
      <Modal
        title="Editando terreno"
        cancelText="Cancelar"
        okText="Guardar"
        visible={ModalAbierto}
        onOk={modalForm.submit}
        onCancel={handleCancel}
      >

        <Form
          form={modalForm}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          onFinish={editTerreno}
        >
          <Form.Item
            label="id"
            name="id"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="id Predio"
            name="idpredio"
          >
            <Select defaultValue="Escoja un predio">
              {
                          dataPredios?.allPredios.edges.map((edge:Predio) => (
                            // eslint-disable-next-line react/jsx-key, react/no-children-prop
                            <Option value={edge.node.idpredio} children={edge.node.idpredio} />
                          ))
                }
            </Select>
          </Form.Item>
          <Form.Item
            label="Area"
            name="area"
            rules={[
              {
                required: true,
                message: 'Ingresa el area del terreno',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Valor comercial del terreno"
            name="valorcomer"
            rules={[
              {
                required: true,
                message: 'Ingresa el valor comercial del terreno',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tipo de terreno"
            name="tipoterre"
            rules={[
              {
                required: true,
                message: 'Ingresa el tipo de terreno',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tiene construcciones"
            name="consdentro"
            rules={[
              {
                required: true,
                message: 'Indica si tu terreno tiene construcciones dentro',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tiene fuentes de agua"
            name="fuenagua"
            rules={[
              {
                required: true,
                message: 'Indica si tu terreno tiene fuentes de agua cerca',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
    )
  );
}
