import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { userToken } from '../../utils/localStorage';

export default function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, userToken), (snapshot) => {
      const snapshotDocs = [];
      snapshot.forEach((doc) => snapshotDocs.push(doc.data().property));
      setData(snapshotDocs);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ul>
      {data.map((listItem, index) => {
        const { name } = listItem;
        return <li key={index}>{name}</li>;
      })}
    </ul>
  );
}