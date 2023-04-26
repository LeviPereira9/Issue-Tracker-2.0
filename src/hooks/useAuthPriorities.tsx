//React
import { useEffect, useState } from 'react';

//Firebase
import { db } from '../firebase/config';
import {
  arrayRemove,
  arrayUnion,
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { timeStamp } from 'console';

type PrioritiesProps = {
  docId: string;
  groupId: string[];
  nivel: number;
  creator: {
    id: string;
    name: string;
    department: string;
  };
  assignedTo: {
    id: string;
    name: string;
    department: string;
  };
  subject: string;
  desc: string;
  createdAt: Timestamp;
  closedAt?: Timestamp;
  expectedConclusion: string;
  status: {
    mode: number;
    text: string;
  };
  priority: string;
  impact: {
    level: {
      mode: 2;
      text: string;
    };
    departments: string[];
    onClients: boolean;
  };
  update: {
    last: Timestamp;
    comments: Comment[];
  };
  titleGroup: string;
};

type Comment = {
  id: string;
  userId: string;
  img: string;
  name: string;
  at: Timestamp;
  text: string;
  likes: string[];
  replies?: Comment[];
};

const useAuthPriorities = () => {
  //States
  const [prioritieData, setPrioritieData] = useState<PrioritiesProps[]>(
    {} as PrioritiesProps[],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  //State Memory Leak
  const [cancelled, setCancelled] = useState<boolean>(false);

  useEffect(() => {
    //If Memory Leak
    if (cancelled) {
      return;
    }
  }, [cancelled]);

  //Priorities Ref Collection
  const prioritiesCollectionRef: CollectionReference<PrioritiesProps> =
    collection(db, 'priorities') as CollectionReference<PrioritiesProps>;

  const queryRef = query(
    prioritiesCollectionRef,
    where('isFeatured', '==', true),
    orderBy('createdAt', 'asc'),
  );
  //...

  useEffect(() => {
    //Fetch function
    const getPrioritiesDocs = async () => {
      setLoading(true);
      setError(false);

      try {
        const prioritiesSnapshot = await getDocs(queryRef);

        setPrioritieData(
          prioritiesSnapshot.docs.map(doc => ({
            ...doc.data(),
            docId: doc.id,
          })),
        );

        setLoading(false);
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };

    getPrioritiesDocs();
  }, []);

  const updateCommentLikes = async (
    docId: string,
    commentId: string,
    userId: string,
    hasLiked: boolean,
  ) => {
    try {
      const prioritiesRef = doc(db, 'priorities', docId);

      // Lendo o documento
      const docSnap = await getDoc(prioritiesRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const comments = data.update.comments;

        // Encontrando o índice do comentário com o id desejado
        const commentIndex = comments.findIndex(
          (comment: any) => comment.id === commentId,
        );

        if (commentIndex !== -1) {
          if (hasLiked) {
            // Removendo um like do comentário
            await updateDoc(prioritiesRef, {
              [`update.comments.${commentIndex}.likes`]: arrayRemove(userId),
            });
          } else {
            // Adicionando um novo like ao comentário
            await updateDoc(prioritiesRef, {
              [`update.comments.${commentIndex}.likes`]: arrayUnion(userId),
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const voltaComments = async () => {
    console.log('Foi?');
    const prioritiesRef = doc(db, 'priorities', '310323-M000');

    try {
      // Restaurando a estrutura original do campo update.comments
      await updateDoc(prioritiesRef, {
        'update.comments': [
          {
            id: 'abada',
            userId: 'iYsVuKmr9sfny1pTNb8Tvi6X6HJ2',
            img: 'https://via.placeholder.com/75',
            name: 'Augustinho Carrara',
            at: "timestamp",
            text: 'The team has received the call and is currently prioritizing it. We have checked the other social media accounts and despite attempts to access them, no other accounts have been violated.',
            likes: ['iYsVuKmr9sfny1pTNb8Tvi6X6HJ2', 'Abada', 'Mangão'],
            replies: [
              {
                id: 'Mangão',
                userId: 'iYsVuKmr9sfny1pTNb8Tvi6X6HJ2',
                img: 'https://via.placeholder.com/50',
                name: 'Michael Jackson da Silva',
                at: '31/03/2023 - 16:20:31',
                text: 'Instagram outage announcement is being produced.',
                likes: ['iYsVuKmr9sfny1pTNb8Tvi6X6HJ2'],
              },
              {
                id: 'Mangão 2',
                userId: 'iYsVuKmr9sfny1pTNb8Tvi6X6HJ2',
                img: 'https://via.placeholder.com/50',
                name: 'Michael Jackson da Silva',
                at: '31/03/2023 - 16:20:31',
                text: 'Instagram outage announcement is being produced.',
                likes: ['iYsVuKmr9sfny1pTNb8Tvi6X6HJ2'],
              },
            ],
          },
          {
            id: 'Mangão',
            img: 'https://via.placeholder.com/75',
            userId: 'iYsVuKmr9sfny1pTNb8Tvi6X6HJ2',
            name: 'Michael Jackson da Silva',
            at: '31/03/2023 - 16:24:59',
            text: 'An announcement has been made on social media alerting that we are not in control of the Instagram account and advising not to continue any conversation at the moment.',
            likes: ['iYsVuKmr9sfny1dsadsapTNb8Tvi6X6HJ2', 'Abada', 'Mangão'],
          },
        ],
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  //Memory Leak function
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { loading, error, prioritieData, updateCommentLikes, voltaComments };
};

export default useAuthPriorities;
