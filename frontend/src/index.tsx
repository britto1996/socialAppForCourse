import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import ReactDOM from "react-dom";

import './App/Layout/index.css';
import App from './App/Layout/App';
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css'
import {BrowserRouter,Router} from "react-router-dom";
import {StoreContext,store} from "./App/stores/store"
import {createBrowserHistory} from "history";
import reportWebVitals from './reportWebVitals';


export const history = createBrowserHistory()

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <App />
    </Router>
      
    </StoreContext.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
