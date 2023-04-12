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
  updateProfile,
  signOut,
} from 'firebase/auth';
import {
  CollectionReference,
  doc,
  collection,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

//Types
import {
  CreateAuth,
  FormRegister,
  NotificationsProps,
  Users,
} from '../types/autheticationTypes';

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

      await updateProfile(user, {
        displayName: `${data.firstName! + data.lastName!}`,
      });

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
        notifications: [],
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
      } catch (error: any) {
        let systemErrorMessage;

        if (error.message.includes('user-not-found')) {
          systemErrorMessage = 'Usuário não encontrado.';
        } else if (error.message.includes('wrong-password')) {
          systemErrorMessage = 'Senha incorreta.';
        } else {
          systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde';
        }

        setLoading(false);
        setErrorMessage(systemErrorMessage);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Occoreu um erro, por favor tente mais tarde.');
    }
  };

  const logout = () => {
    checkIfCancelled();

    setPersistence(auth, browserSessionPersistence);
    signOut(auth);
  };

  const updateNotification = async (
    notification: NotificationsProps,
    userData: Users,
  ) => {
    //User Ref Collection
    const userCollectionRef: CollectionReference<Users> = collection(
      db,
      'users',
    ) as CollectionReference<Users>;

    const userDocRef = doc(userCollectionRef, auth.currentUser?.uid);

    // Ache o id conrrespondente da notificação.
    const notificationIndex = userData.notifications!.findIndex(
      userDataNotification => userDataNotification.id === notification.id,
    );

    if (notificationIndex !== -1) {
      // Atualiza a notificação pelo id que achamos.
      const updatedNotifications = [...userData.notifications!];
      updatedNotifications[notificationIndex] = {
        ...updatedNotifications[notificationIndex],
        read: true,
      };

      // Atualiza lá na base de dados.
      await updateDoc(userDocRef, {
        notifications: updatedNotifications,
      });
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
    logout,
    updateNotification,
  };
};

export { useAuthentication };
