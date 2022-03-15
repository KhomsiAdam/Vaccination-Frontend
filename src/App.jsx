/*eslint-disable*/
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components';
import { Home, NotFound, Login, Dashboard } from '@/pages';
import { StepProvider } from './context/StepContext';
import RequireAuth from './components/RequireAuth';
import { PersistLogin } from './components/PersistLogin';

const ROLES = {
  Admin: 'Admin',
  Manager: 'Manager',
  User: 'User',
};

function App() {
  return (
    <StepProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Manager]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
          {/* catch all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </StepProvider>
  );
}

export default App;
