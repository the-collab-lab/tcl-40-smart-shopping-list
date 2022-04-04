import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const AddToFirebase = () => {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'list'), (snapshot) => {
      const snapshotDocs = [];
      snapshot.forEach((doc) => snapshotDocs.push(doc.data().property));
      setData(snapshotDocs);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const addTestFirebase = async () => {
    try {
      const docRef = await addDoc(collection(db, 'list'), {
        property: 'Test',
      });
      console.log(docRef.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {data.map((item, index) => {
        console.log(item);
        return <p key={index}>{item}</p>;
      })}
      <button onClick={addTestFirebase}>Add</button>
    </div>
  );
};

export default AddToFirebase;
