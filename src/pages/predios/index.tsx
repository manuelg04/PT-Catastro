/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-props-no-multi-spaces */
import { useMutation, useQuery } from '@apollo/client';
import {
  Button, Form, Input, message, Modal, Table, Image,
} from 'antd';
import { useState, useContext, useEffect } from 'react';
import 'antd/dist/antd.css';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
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
import { Predio, Construccion, Terreno } from '../../src/tipos';
import AppContext from '../api/AppContext';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Predios() {
  const router = useRouter();
  const { data } = useQuery(QUERY_ALL_PREDIOS);
  const { data: dataConstrucciones } = useQuery(QUERY_ALL_CONSTRUCCIONES);
  const { data: dataTerrenos } = useQuery(QUERY_ALL_TERRENOS);
  const [deletePredio] = useMutation(DELETE_PREDIO_MUTATION, REFRESH_QUERY_PREDIOS);
  const [updatePredio] = useMutation(UPDATE_PREDIO_MUTATION, REFRESH_QUERY_PREDIOS);
  const [ModalAbierto, setModalAbierto] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [construccionActual, setConstruccionActual] = useState<Construccion[]>();
  const [terrenoActual, setTerrenoActual] = useState<Terreno[]>();
  const [modalForm] = Form.useForm();
  const context = useContext(AppContext);

  const dataTablaConstrucciones = dataConstrucciones?.allConstrucciones.edges.map(
    (edge:Construccion) => (
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

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen(false);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel3 = () => {
    setIsModalOpen2(false);
  };

  const verConstruccion = (values:Construccion) => {
    try {
      mostrarConstruccione((
        {
          variables: {
            id: values.id,
            idpredio: values.idpredio,
            numpisos: values.numpisos,
            areatotal: values.areatotal,
            tipocons: values.tipocons,
            direccion: values.direccion,
          },
        }
      ));
      message.success('Esta viendo la tabla de construccion exitosamente');
    } catch (error) {
      message.error('No esta viendo la tabla de construiccion fallo');
    }
  };

  const verTerreno = (values: Terreno) => {
    try {
      mostrarTerrenos((
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
      message.success('Esta viendo la tabla de terrenos exitosamente');
    } catch (error) {
      message.error('No esta viendo la tabla de terrenos fallo');
    }
  };

  const handleCancel = () => {
    setModalAbierto(false);
  };

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
    handleCancel();
  };
  const selectPredio = (predio: Predio) => {
    setModalAbierto(true);
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
  const selectConstruccion = (predio:Construccion) => {
    const arrConstruccionesFiltered: Construccion[] = [];
    dataTablaConstrucciones.map((construccion:Construccion) => {
      if (construccion.idpredio === predio.idpredio) {
        arrConstruccionesFiltered.push(construccion);
      }

      setConstruccionActual(arrConstruccionesFiltered);
    });
    showModal();
  };

  const selectTerreno = (predio: Terreno) => {
    const arrTerrenosFiltered: Terreno[] = [];
    dataTablaTerrenos.map((terreno: Terreno) => {
      if (terreno.idpredio === predio.idpredio) {
        arrTerrenosFiltered.push(terreno);
      }

      setTerrenoActual(arrTerrenosFiltered);
    });
    showModal2();
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

    {
      title: 'Acciones',
      dataIndex: 'acciones',
      key: 'acciones',
      render: (x: unknown, terreno: Terreno) => (
        <EditOutlined
          onClick={() => {
            selectTerreno(terreno);
          }}
        />
      ),
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
    (edge:Predio) => (
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
  );

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
      title: 'Valor',
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
      render: (x: unknown, construccion:Construccion) => (
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

            title="Aqui se mostraria la tabla de terrenos"
            open={isModalOpen2}
            onOk={handleOk2}
            onCancel={handleCancel3}
            width={816}

            onClick={(terreno:Terreno) => {
              verTerreno(terreno);
            }}

            cancelText="Cancelar"
            okText="Guardar"
            visible={isModalOpen2}
          >
            <Table

                // dataSource={dataTablaTerrenos}
              dataSource={terrenoActual}
              columns={columnsTerrenos}
              size="large"
            />

          </Modal>

          <Modal

            title="Aqui se mostraria la tabla de construcciones"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel2}
            width={616}

            onClick={(construccion:Construccion) => {
              verConstruccion(construccion);
            }}

            cancelText="Cancelar"
            okText="Guardar"
            visible={isModalOpen}
          >
            <Table

      // dataSource={dataTablaConstrucciones}
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
    !isEmpty(context.llenarForm)

    && (
      <>
        <BarraDeNav />
        <Button type="primary">
          <Link href="/predios/nuevo"> Agregar nuevo predio </Link>
        </Button>

        <Table
          dataSource={dataTabla}
          columns={columns}
          size="large"
        />

        <Modal
          title="Editando predio"
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

    )
  );
}
