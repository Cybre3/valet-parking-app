import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import configureStore from './store/configureStore';

import ValetEntry from './Components/ValetEntry';
import LotLocation from './Components/LotLocation';

import './App.css';
import Cars from './Components/Cars';
import CarDetails from './Components/CarDetails';
import CarRequests from './Components/CarRequests';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<ValetEntry />} />
        <Route path='/lotLocation/:id' element={<LotLocation />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/cars/:id' element={<CarDetails />} />
        <Route path='/cars/requested' element={<CarRequests />} />
      </Routes>
    </Provider>
  );
}

export default App;
