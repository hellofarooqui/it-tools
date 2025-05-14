import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';

// Example page components
const Dashboard = () => <div className="text-2xl font-bold">Dashboard Page</div>;
const Users = () => <div className="text-2xl font-bold">Users Page</div>;
const Documents = () => <div className="text-2xl font-bold">Documents Page</div>;
const Analytics = () => <div className="text-2xl font-bold">Analytics Page</div>;
const Settings = () => <div className="text-2xl font-bold">Settings Page</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="documents" element={<Documents />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;