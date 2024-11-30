import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "nprogress/nprogress.css";
import GlobalStyle from './Components/GlobalStyles'
import { Provider } from "react-redux";
import { store, persistor } from './Redux/Store/Store.js';
import { PersistGate } from "redux-persist/integration/react";


createRoot(document.getElementById('root')).render(
  <GlobalStyle> 
  <Provider store={store}>
      {/* <App /> */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </GlobalStyle>

)
