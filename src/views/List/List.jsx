import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function List({ token }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, token), (snapshot) => {
      const snapshotDocs = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        snapshotDocs.push(data);
      });
      setData(snapshotDocs);
    });
    return () => {
      unsubscribe();
    };
  }, [token]);

  const onChange = () => {
    console.log('hello');
  };

  return (
    <ul>
      {data.map((listItem, index) => {
        console.log(listItem);
        const { name, isActive } = listItem;
        return (
          <li key={index}>
            {' '}
            <input
              onChange={onChange}
              checked={isActive}
              type="checkbox"
              id={name}
            />{' '}
            <label htmlFor={name}>{name}</label>
          </li>
        );
      })}
    </ul>
  );
}
