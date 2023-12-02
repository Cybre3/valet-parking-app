import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import configureStore from './store/configureStore';

import ValetEntry from './Components/ValetEntry';
import LotLocation from './Components/LotLocation';

import './App.css';
import Cars from './Components/Cars';
import CarDetails from './Components/CarDetails';
import CarRequests from './Components/CarRequests';
import Nav from './Components/Nav';
import Login from './Components/Login';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <i className='absolute left-0 right-0 mx-auto top-20 text-4xl font-bold text-white ml-[15%] text-center'>ParkMe Valet</i>
      <Nav />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/lotLocation/:id' element={<LotLocation />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/cars/addcar' element={<ValetEntry />} />
        <Route path='/cars/:id' element={<CarDetails />} />
        <Route path='/cars/requested' element={<CarRequests />} />
      </Routes>
    </Provider>
  );
}

export default App;
