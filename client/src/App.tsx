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
import ListTickets from './pages/SupportTicket/ListTickets';
import NewSupportTicket from './pages/SupportTicket/NewSupportTicket';
import SupportTicketDetails from './pages/SupportTicket/SupportTicketDetails';
import EditTicket from './pages/SupportTicket/EditTicket';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Example page components


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="rma" element={<RMA />} />
          <Route path="rma/new" element={<NewRMA />} />
          <Route path="rma/:rmanumber" element={<RMADetails />} />
          <Route path="rma/:rmanumber/edit" element={<RMAEdit />} />

          <Route path="devices" element={<Devices />} />
          <Route path="devices/new" element={<NewDevice />} />
          <Route path="devices/:deviceId" element={<DeviceDetails />} />
          <Route path="devices/:deviceId/edit" element={<EditDevice />} />

          <Route path="support" element={<ListTickets />} />
          <Route path="support/new" element={<NewSupportTicket />} />
          <Route path="support/:ticketNumber" element={<SupportTicketDetails />} />
          <Route path="support/:ticketNumber/edit" element={<EditTicket />} />



        </Route>
      </Routes>
      <Routes>
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;