import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

const root = document.getElementById('root');

const render = (Component) => {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Component />
    </React.StrictMode>
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    render(NextApp);
  });
}
