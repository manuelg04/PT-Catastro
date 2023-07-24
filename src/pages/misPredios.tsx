import { Table, Image } from 'antd';
import { useQuery } from '@apollo/client';
import {  Predio } from '../tipos';
import { useSelector } from 'react-redux';
import { QUERY_PREDIOS_POR_NOMBREPROPIETARIO } from '../backend/graphql/mutaciones';
import { RootState } from '../redux/store';

function MisPredios() {
    const usuario = useSelector((state: RootState) => state.user); // 

  const { data } = useQuery(QUERY_PREDIOS_POR_NOMBREPROPIETARIO, {
    variables: { nombre: usuario.nombre },
  });

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
];

  return (
    <>
      <h1>Mis predios</h1>
      <Table dataSource={dataTabla} columns={columns} />
    </>
  );
}

export default MisPredios;
