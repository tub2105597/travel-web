import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.scss';

// Tạo store
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="745151372992-ptfpmt663pnmel25otue2i1djip54187.apps.googleusercontent.com">
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode >

);

reportWebVitals();

