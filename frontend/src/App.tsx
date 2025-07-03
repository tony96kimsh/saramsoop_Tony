import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import AppRoutes from './routes';

const RoutesRenderer = () => {
  const element = useRoutes(AppRoutes);
  return element;
};

function App() {
  return (
    <Router>
      <RoutesRenderer />
    </Router>
  );
}

export default App;
