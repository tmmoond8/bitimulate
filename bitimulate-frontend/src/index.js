import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './styles/main.scss';
import registerServiceWorker from './registerServiceWorker';
import configureStore from 'store/configure';

ReactDOM.render(<Root store={configureStore()}/>, document.getElementById('root'));
registerServiceWorker();