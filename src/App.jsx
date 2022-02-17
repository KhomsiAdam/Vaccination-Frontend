/*eslint-disable*/
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components';
import {
  Home,
  NotFound,
} from '@/pages';
import { StepProvider } from './context/StepContext';

function App() {
  return (
    <StepProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />

          {/* catch all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </StepProvider>
  );
}

export default App;
