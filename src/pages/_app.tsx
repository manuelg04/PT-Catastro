/* eslint-disable react/jsx-no-constructed-context-values */
import type { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Col, Row } from 'antd';
import { useState } from 'react';
import AppContext from '../AppContext';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store';
import { GRAPH_URL } from '../constantes';

const persistor = persistStore(store);


export default function App({ Component, pageProps }: AppProps) {
  const [imageFile, setImageFile] = useState<File>();
  
  const client = new ApolloClient({
    uri: GRAPH_URL,
    cache: new InMemoryCache(),

  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <AppContext.Provider
      value={{
        imageFile,
        setImageFile,
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
