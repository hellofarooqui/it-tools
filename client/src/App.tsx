import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';
import RMA from './pages/RMA';
import Devices from './pages/Devices';
import NewRMA from './pages/NewRMA';
import RMADetails from './pages/RMADetails';
import RMAEdit from './pages/RMAEdit';
import NewDevice from './pages/NewDevice';
import EditDevice from './pages/EditDevice';
import DeviceDetails from './pages/DeviceDetails';

// Example page components


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="rma" element={<RMA />} />
          <Route path="rma/new" element={<NewRMA />} />
          <Route path="rma/:rmanumber" element={<RMADetails />} />
          <Route path="rma/:rmanumber/edit" element={<RMAEdit />} />

          <Route path="devices" element={<Devices />} />
          <Route path="devices/new" element={<NewDevice />} />
          <Route path="devices/:deviceId" element={<DeviceDetails />} />
          <Route path="devices/:deviceId/edit" element={<EditDevice />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;