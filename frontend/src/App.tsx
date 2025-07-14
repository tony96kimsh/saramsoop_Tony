import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes';

const queryClient = new QueryClient();

const RoutesRenderer = () => {
  const element = useRoutes(AppRoutes);
  return element;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <RoutesRenderer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
