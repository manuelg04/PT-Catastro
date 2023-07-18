/* eslint-disable react/jsx-no-constructed-context-values */
import type { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Col, Row } from 'antd';
import { useState } from 'react';
import AppContext from './api/AppContext';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store';

const persistor = persistStore(store);


export default function App({ Component, pageProps }: AppProps) {
  const [imageFile, setImageFile] = useState<File>();
  const [UserContext, setUserContext] = useState();
  const [mostrarLogin, setMostrarLogin] = useState(true);
  const [userLog, setUserLog] = useState([]);
  const [llenarForm, setLlenarForm] = useState([]);

  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache(),

  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <AppContext.Provider
      value={{
        imageFile,
        setImageFile,
        UserContext,
        setUserContext,
        mostrarLogin,
        setMostrarLogin,
        userLog,
        setUserLog,
        llenarForm,
        setLlenarForm,
      }}
    >
      <ApolloProvider client={client}>
        <Row justify="space-around">
          <Col span={15}>
                <Component {...pageProps} />
          </Col>
        </Row>
      </ApolloProvider>
    </AppContext.Provider>
    </PersistGate>
    </Provider>
  );
}
