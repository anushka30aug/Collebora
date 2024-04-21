import './App.css';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { persistor, store } from './states/Store';
import { PersistGate } from 'redux-persist/integration/react';
import Entry from './Entry';
import { ChatSocketCtxProvider } from './context/SocketContext';

function App() {
  return (
    <ChatSocketCtxProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <div className="App">
            <Entry />
          </div>
        </PersistGate>
      </Provider>
    </ChatSocketCtxProvider>
  );
}

export default App;
