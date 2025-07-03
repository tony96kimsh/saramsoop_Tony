import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/Layout/Header'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <LoginPage />
      </BrowserRouter>
      
    </>
  );
}

export default App;
