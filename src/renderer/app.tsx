import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Applicaton from './pages/Application';
import './app.scss';

const Component: React.FC = () => <Applicaton />;

const render = (Component: React.FC) => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

render(Component);
