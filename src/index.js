import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './redux/store/store'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './materialUi/';
import {FirebaseAppProvider} from 'reactfire';
import firebaseConfig from './firebase/firebase';

export const API = "https://consultancespace.herokuapp.com";
//export const API = "http://localhost:3005";
ReactDOM.render(
    <Provider store={store}> 
      <ThemeProvider theme={theme}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          </FirebaseAppProvider>  
      </ThemeProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
