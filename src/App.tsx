//React
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  CollectionReference,
  doc,
  getDoc,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

//Router-DOM
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//Layout
import NavBar from './components/layout/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import { db } from './firebase/config';
import { useAuthentication } from './hooks/useAuthentication';

//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

//Contexts

//CSS
import './scss/app.scss';
import { Users } from './types/autheticationTypes';

function App() {
  const [userData, setUserData] = useState<Users>({} as Users);

  const [user, setUser] = useState<string>();
  const [logged, setLogged] = useState(false)
  const [loading, setLoading] = useState(false);

  const { auth } = useAuthentication();

  onAuthStateChanged(auth, user => {
    if (user) {
      setUser(user?.uid);
      setLogged(true);
    }
  });

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      if (user) {
        //User Ref Collection
        const userCollectionRef: CollectionReference<Users> = collection(
          db,
          'users',
        ) as CollectionReference<Users>;

        console.log(user);
        try {
          const userDataQuery = doc(userCollectionRef, user);

          //Get userData
          const userDataSnap = await getDoc(userDataQuery);

          if (userDataSnap.exists()) {
            
            setUserData(userDataSnap.data());
            setLoading(false);
          } else {
            console.log('Deu um erro');
            setLoading(false);
          }

          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    };

    
  }, [user]);
  
  return (
    <div>
      <AuthProvider value={userData}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={!logged ? <Register /> : <Navigate to="/"/>} />
            <Route path="/login" element={!logged ? <Login /> : <Navigate to="/"/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
