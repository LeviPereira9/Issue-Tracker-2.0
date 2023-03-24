//Router-DOM
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//Layout
import NavBar from './components/layout/navbar/Navbar';
import { AuthDataProvider } from './contexts/AuthDataContext';

//Hooks
import useAuthData from './hooks/useAuthData';

//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

//Contexts

//CSS
import './scss/app.scss';

function App() {
  
  const {userData, logged, loading} = useAuthData();
  
  return (
    <div>
      <AuthDataProvider userData={userData} logged={logged} loading={loading}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={!logged ? <Register /> : <Navigate to="/"/>} />
            <Route path="/login" element={!logged ? <Login /> : <Navigate to="/"/>} />
          </Routes>
        </BrowserRouter>
      </AuthDataProvider>
    </div>
  );
}

export default App;
