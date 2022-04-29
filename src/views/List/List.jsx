import React, { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
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

  useEffect(() => {
    data.forEach((item) => {
      const now = Date.now();
      const delta = now - item.lastPurchasedAt;
      // console.log(item.name,'now', now)
      // console.log(item.name,'delta', delta)
      unCheckItem(item, delta);
    });
  });

  const unCheckItem = async (item, delta) => {
    if (delta > 86400000) {
      item.isActive = false;
      const updatedItem = doc(db, token, item.id);
      await updateDoc(updatedItem, {
        isActive: false,
      });
    }
  };

  const onChange = async (listItem) => {
    const { isActive, id } = listItem;
    // this will represent the last purchased date rather than the current time
    // const now = Date.now();
    // const lastPurchasedAtInMS = Date.now() - 86400000;
    // const delta = now - lastPurchasedAtInMS;
    const nextData = data.map((item) => {
      if (item.id === id) {
        item.isActive = !item.isActive;
      }
      return item;
    });
    setData(nextData);
    const updatedDoc = doc(db, token, listItem.id);
    await updateDoc(updatedDoc, {
      isActive: !isActive,
      lastPurchasedAt: Date.now(),
    });
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
              onChange={() => onChange(listItem)}
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
