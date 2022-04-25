import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Link } from 'react-router-dom';

export default function List({ token }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, token), (snapshot) => {
      const snapshotDocs = [];
      snapshot.forEach((doc) => snapshotDocs.push(doc.data().property));
      setData(snapshotDocs);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {data.length ? (
        <ul>
          {data.map((listItem, index) => {
            const { name } = listItem;
            return <li key={index}>{name}</li>;
          })}
        </ul>
      ) : (
        <>
          <p>Your list is empty. Please add something.</p>
          <Link to="/additem">Add Item</Link>
        </>
      )}
    </>
  );
}
