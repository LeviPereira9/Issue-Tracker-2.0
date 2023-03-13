//Router-DOM
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Layout
import Navbar from './components/layout/Navbar';

//Pages
import Home from './pages/Home';
import Register from './pages/Register';

//Contexts

//CSS
import './scss/app.scss';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
