//React
import { useState, useEffect } from 'react';

//Firebase
import { db } from '../firebase/config';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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

      //User Collection
      const userCollectionRef: CollectionReference<Users> = collection(
        db,
        'users',
      ) as CollectionReference<Users>;

      const docId = user.uid;

      const userDocRef = doc(userCollectionRef, docId);

      const userData: Users = {
        firstName: data.firstName!,
        lastName: data.lastName!,
        department: data.department!,
        email: data.email!,
        acessLevel: 1,
        terms: true,
      };

      await setDoc(userDocRef, userData);

      setLoading(false);

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

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createAccount,
    loading,
    errorMessage,
    setErrorMessage
  };
};

export { useAuthentication };
