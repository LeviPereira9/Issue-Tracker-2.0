//React
import { useEffect, useState } from 'react';

//Firebase
import { db } from '../firebase/config';
import {
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
  where,
} from 'firebase/firestore';

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
  at: string;
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

  //Memory Leak function
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { loading, error, prioritieData };
};

export default useAuthPriorities;
