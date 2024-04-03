import './App.css';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { persistor, store } from './states/Store';
import { PersistGate } from 'redux-persist/integration/react';
import Entry from './Entry';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
      <div className="App">
       
        <Entry/>
        
      </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
