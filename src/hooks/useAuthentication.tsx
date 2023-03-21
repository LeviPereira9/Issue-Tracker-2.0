//React
import { useState, useEffect } from 'react';

//Router-Dom
//Firebase
import { db } from '../firebase/config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  CollectionReference,
  doc,
  collection,
  setDoc,
} from 'firebase/firestore';

//Types
import { CreateAuth, FormRegister, Users } from '../types/collectionsType';


const useAuthentication = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const auth = getAuth();

  //Memory Leak?
  const [cancelled, setCancelled] = useState(false);

  function checkIfCancelled() {
    if (cancelled) {
      return;
    }
  }

  //Criar usuário
  //@ Primeiro parametro é de criação de usuário do Firebase Email+Password
  //@ Segundo parametro é de adicionar as outras informações na coleção de users.
  const createAccount = async ({
    createAuth,
    data,
  }: {
    createAuth: CreateAuth;
    data: FormRegister;
  }) => {
    checkIfCancelled();

    setLoading(true);

    try {
      //User Auth
      const { user } = await createUserWithEmailAndPassword(
        auth,
        createAuth.email,
        createAuth.password,
      );

      //User Ref Collection
      const userCollectionRef: CollectionReference<Users> = collection(
        db,
        'users',
      ) as CollectionReference<Users>;

      const docId = user.uid;

      const userDocRef = doc(userCollectionRef, docId);

      //User Collection
      const userData: Users = {
        firstName: data.firstName!,
        lastName: data.lastName!,
        department: data.department!,
        email: data.email!,
        acessLevel: 1,
        terms: data.terms!,
      };

      await setDoc(userDocRef, userData);

      //Auto Login
      const loginAuto: Login = {
        email: data.email!,
        password: data.password!,
      };

      login(loginAuto);

      return user;
    } catch (e: any) {
      let systemErrorMessage = 'Mensagem de erro.';

      if (e.message.includes('email-already')) {
        systemErrorMessage = 'E-mail já cadastrado.';
      } else {
        systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.';
      }

      setLoading(false);
      setErrorMessage(systemErrorMessage);
    }
  };

  type Login = {
    email: string;
    password: string;
    rememberMe?: boolean;
  };

  const login = async (data: Login) => {
    checkIfCancelled();
    setLoading(true);
    

    try {
      await setPersistence(
        auth,
        data.rememberMe ? browserLocalPersistence : browserSessionPersistence,
      );
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        setLoading(false);
        console.log("logou");
        console.log(auth.currentUser?.uid);
      } catch (error: any) {
        let systemErrorMessage;

        if (error.message.includes('Password')) {
          systemErrorMessage =
            'A senha precisa conter pelo menos 6 caracteres.';
        } else if (error.message.includes('email-already')) {
          systemErrorMessage = 'E-mail já cadastrado.';
        } else {
          systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.';
        }

        setLoading(false);
        setErrorMessage(systemErrorMessage);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Occoreu um erro, por favor tente mais tarde.');
    }

   
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createAccount,
    login,
    loading,
    errorMessage,
    setErrorMessage,
  };
};

export { useAuthentication };
