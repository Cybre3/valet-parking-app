import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import ValetEntry from './Components/ValetEntry';

import './App.css';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="">
        <ValetEntry />
      </div>
    </Provider>
  );
}

export default App;
