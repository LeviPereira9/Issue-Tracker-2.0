//React
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  CollectionReference,
  doc,
  getDoc,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

//Firebase
import { db } from '../firebase/config';

//hooks
import { useAuthentication } from './useAuthentication';

//Types
import { Users } from '../types/autheticationTypes';

const useAuthData = () => {
  const [userData, setUserData] = useState<Users>({} as Users);
  const [user, setUser] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);

  const { auth } = useAuthentication();

  useEffect(()=>{
    onAuthStateChanged(auth, user => {
      setLoading(true);
      if (user) {
        setUser(user?.uid);
        setLogged(true);
        setLoading(false);
      } else {
        setLogged(false);
        setLoading(false);
      }
    });
  },[auth])

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

  return { userData, loading, logged, setLogged };
};

export default useAuthData;
