import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';  
import ServicesApp from './getservices';  
ReactDOM.render(<ServicesApp />, document.getElementById('root')); 

serviceWorker.unregister();
