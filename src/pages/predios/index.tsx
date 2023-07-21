import { useMutation, useQuery } from '@apollo/client';
import {
  Button, Form, Input, message, Modal, Table, Image,
} from 'antd';
import { useState } from 'react';
import 'antd/dist/antd.css';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import {
  QUERY_ALL_CONSTRUCCIONES,
  QUERY_ALL_PREDIOS,
  QUERY_ALL_TERRENOS,
  REFRESH_QUERY_PREDIOS,
  UPDATE_PREDIO_MUTATION,
  DELETE_PREDIO_MUTATION,
} from '../../backend/graphql/mutaciones';
import BarraDeNav from '../menu';
import styles from '../../styles/menu.module.css';
import type { Terreno, Predio, Construccion } from '../../tipos';

export default function Predios() {
  const { data } = useQuery(QUERY_ALL_PREDIOS);
  const { data: dataConstrucciones } = useQuery(QUERY_ALL_CONSTRUCCIONES);
  const { data: dataTerrenos } = useQuery(QUERY_ALL_TERRENOS);
  const [deletePredio] = useMutation(DELETE_PREDIO_MUTATION, REFRESH_QUERY_PREDIOS);
  const [updatePredio] = useMutation(UPDATE_PREDIO_MUTATION, REFRESH_QUERY_PREDIOS);
  const [openModalPredio, setOpenModalPredio] = useState(false);
  const [openModalConstrucciones, setOpenModalConstrucciones] = useState(false);
  const [openModalTerrenos, setOpenModalTerrenos] = useState(false);
  const [construccionActual, setConstruccionActual] = useState<Construccion[]>();
  const [terrenoActual, setTerrenoActual] = useState<Terreno[]>();
  const [filtroNumeroPredial, setFiltroNumeroPredial] = useState('');
  const [modalForm] = Form.useForm();

  const dataTablaConstrucciones = dataConstrucciones?.allConstrucciones.edges.map(
    (edge: Construccion) => (
      {
        id: edge.node.id,
        idpredio: edge.node.idpredio,
        numpisos: edge.node.numpisos,
        areatotal: edge.node.areatotal,
        tipocons: edge.node.tipocons,
        direccion: edge.node.direccion,
        image: edge.node.image ? <Image src={edge.node.image} width={100} /> : 'No hay Imagen',

      }
    ),
  );

  const dataTablaTerrenos = dataTerrenos?.allTerrenos.edges.map(
    (edge: Terreno) => (
      {
        id: edge.node.id,
        idpredio: edge.node.idpredio,
        image: edge.node.image ? <Image src={edge.node.image} width={100} /> : 'No hay Imagen',
        area: edge.node.area,
        valorcomer: edge.node.valorcomer,
        tipoterre: edge.node.tipoterre,
        consdentro: edge.node.consdentro,
        fuenagua: edge.node.fuenagua,

      }
    ),
  );
  const onBorrarPredio = (values: Predio) => {
    try {
      deletePredio((
        {
          variables: {
            idpredio: values.idpredio,
          },
        }
      ));
      message.success('registro eliminado con exito');
    } catch (error) {
      message.error(`error al eliminar registro, ${error}`);
    }
  };

  const editPredio = (values: Predio) => {
    try {
      updatePredio((
        {
          variables: {
            idpredio: values.idpredio,
            numpre: values.numpre,
            nombre: values.nombre,
            valor: values.valor,
            depto: values.depto,
            municipio: values.municipio,
            propietarios: values.propietarios,
          },
        }
      ));
      message.success('registro actualizado exitosamente');
    } catch (error) {
      message.error('error al actualizar el registro');
    }
    setOpenModalPredio(false);
  };
  const selectPredio = (predio: Predio) => {
    setOpenModalPredio(true);
    modalForm.setFieldsValue({
      idpredio: predio.idpredio,
      numpre: predio.numpre,
      valor: predio.valor,
      nombre: predio.nombre,
      depto: predio.depto,
      municipio: predio.municipio,
      propietario: predio.propietario,
      construcciones: predio.construcciones,
      terreno: predio.terreno,
      propietarios: predio.propietarios,

    });
  };
  // return general
  const selectConstruccion = (predio: Construccion) => {
    const arrConstruccionesFiltered: Construccion[] = [];
    dataTablaConstrucciones.map((construccion: Construccion) => {
      if (construccion.idpredio === predio.idpredio) {
        arrConstruccionesFiltered.push(construccion);
      }

      setConstruccionActual(arrConstruccionesFiltered);
    });
    setOpenModalConstrucciones(true);
  };

  const selectTerreno = (predio: Terreno) => {
    const arrTerrenosFiltered: Terreno[] = [];
    dataTablaTerrenos.map((terreno: Terreno) => {
      if (terreno.idpredio === predio.idpredio) {
        arrTerrenosFiltered.push(terreno);
      }

      setTerrenoActual(arrTerrenosFiltered);
    });
    setOpenModalTerrenos(true);
  };

  const columnsTerrenos = [

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
  ];

  // console.log("🚀 ~ dataTablaConstrucciones", dataTablaConstrucciones)

  const columnsConstrucciones = [

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
      title: 'Numero de pisos',
      dataIndex: 'numpisos',
      key: 'numpisos',
    },
    {
      title: 'Area total',
      dataIndex: 'areatotal',
      key: 'areatotal',
    },
    {
      title: 'Tipo de construccion',
      dataIndex: 'tipocons',
      key: 'tipocons',
    },
    {
      title: 'Direccion',
      dataIndex: 'direccion',
      key: 'direccion',
    },
  ];

  const dataTabla = data?.allPredios.edges.map(
    (edge: Predio) => (
      {
        idpredio: edge.node.idpredio,
        numpre: edge.node.numpre,
        image: edge.node.image ? <Image src={edge.node.image} width={100} /> : 'No hay Imagen',
        nombre: edge.node.nombre,
        valor: edge.node.valor,
        depto: edge.node.depto,
        municipio: edge.node.municipio,
        propietarios: edge.node.propietarios,

      }
    ),
  ) || [];

  const columns = [

    {
      title: 'id',
      dataIndex: 'idpredio',
      key: 'idpredio',
    },
    {
      title: 'Numero Predial',
      dataIndex: 'numpre',
      key: 'numpre',

    },
    {
      title: 'Imagen',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Avalúo',
      dataIndex: 'valor',
      key: 'valor',
    },
    {
      title: 'Depto',
      dataIndex: 'depto',
      key: 'depto',
    },
    {
      title: 'Municipio',
      dataIndex: 'municipio',
      key: 'municipio',
    },
    {
      title: 'Propietarios',
      dataIndex: 'propietarios',
      key: 'propietarios',
    },

    {
      title: 'Construcciones',
      dataIndex: 'construcciones',
      key: 'construcciones',
      render: (x: unknown, construccion: Construccion) => (
        <PlusCircleOutlined
          className={styles.circuloinfo}
          onClick={() => {
            selectConstruccion(construccion);
          }}
        />
      ),
    },
    {
      title: 'Terrenos',
      dataIndex: 'terreno',
      key: 'terreno',
      render: (x: unknown, terreno: Terreno) => (
        <PlusCircleOutlined
          className={styles.circuloinfo}
          onClick={() => {
            selectTerreno(terreno);
          }}
        />
      ),
    },

    {
      title: 'Acciones',
      dataIndex: 'acciones',
      key: 'acciones',
      render: (x: unknown, predio: Predio) => (
        <>

          <EditOutlined
            onClick={() => {
              selectPredio(predio);
            }}
          />

          <DeleteOutlined
            onClick={() => {
              onBorrarPredio(predio);
            }}
            style={{ color: 'red', marginLeft: 20 }}
          />

          <Modal
            title="Terrenos asociados al predio"
            open={openModalTerrenos}
            width={816}
            footer={null}
            visible={openModalTerrenos}
            onCancel={() =>setOpenModalTerrenos(false)}
          >
            <Table
              dataSource={terrenoActual}
              columns={columnsTerrenos}
              size="large"
            />

          </Modal>

          <Modal
            title="Construcciones asociadas al predio"
            open={openModalConstrucciones}
            width={616}
            footer={null}
            visible={openModalConstrucciones}
            onCancel={() => setOpenModalConstrucciones(false)}
          >
            <Table
              dataSource={construccionActual}
              columns={columnsConstrucciones}
              size="large"
            />
          </Modal>
        </>
      ),
    },
  ];

  return (
    <>
      <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, background: '#ffffff' }}>
        <>
          <BarraDeNav />
          <Button type="primary">
            <Link href="/predios/nuevo"> Agregar nuevo predio </Link>
          </Button>
          <Input
            placeholder="Buscar por número predial"
            onChange={e => setFiltroNumeroPredial(e.target.value)}
          />

          <Table
            className={styles.tableMargin}
            dataSource={dataTabla.filter((predio: Predio) => predio.numpre.includes(filtroNumeroPredial))}
            columns={columns as any}
            size="large"
          />

          <Modal
            title="Editando predio"
            cancelText="Cancelar"
            okText="Guardar"
            visible={openModalPredio}
            onOk={modalForm.submit}
            onCancel={()=>setOpenModalPredio(false)}
          >

            <Form
              form={modalForm}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
              onFinish={editPredio}
            >
              <Form.Item label="ID" name="id" hidden>
                <Input />
              </Form.Item>
              <Form.Item
                label="Id predio"
                name="idpredio"
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Numero Predial"
                name="numpre"
                rules={[
                  {
                    required: true,
                    message: 'Ingresa el numero predial',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Avaluo"
                name="valor"
                rules={[
                  {
                    required: true,
                    message: 'Ingrese el avaluo de tu predio',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Nombre"
                name="nombre"
                rules={[
                  {
                    required: true,
                    message: 'Ingrese el nombre del predio',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Departamento"
                name="depto"
                rules={[
                  {
                    required: true,
                    message: 'Ingrese el departamento asociado a tu predio',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Municipio"
                name="municipio"
                rules={[
                  {
                    required: true,
                    message: 'Ingrese el municipio asociado a tu predio',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Propietarios"
                name="propietarios"
                rules={[
                  {
                    required: true,
                    message: 'Ingresa el propietario del predio',
                  },
                ]}
              >
                <Input />
              </Form.Item>

            </Form>
          </Modal>
        </>
      </div>
    </>
  );
}
