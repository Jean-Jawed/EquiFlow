import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GroupDashboard from './pages/GroupDashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/group/:groupId" element={<GroupDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
