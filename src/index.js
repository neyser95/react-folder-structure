import React from 'react';
import {render} from 'react-dom';
import App from './components/App.jsx';

import styles from './scss/app.scss';

render(<App/>, document.getElementById('root'));


module.hot.accept(['./components/App.jsx', './scss/app.scss'], () => {
  const NextApp = require('./components/App.jsx').default;
  render(
    <NextApp />, document.getElementById('root')
  );
});