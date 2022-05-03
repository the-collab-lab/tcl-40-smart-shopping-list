import React, { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Link } from 'react-router-dom';
import { SiProbot } from 'react-icons/si';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import '../../App.css';
import './List.css';
import Footer from '../../components/Footer/Footer';

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

  // on each re-render, we loop through the react data array to check the current time against the last purchased at time
  useEffect(() => {
    data.forEach((item) => {
      const now = Date.now();
      const delta = now - item.lastPurchasedAt;
      // we then feed the delta and the item into our unCheck function and if the item has a delta greater than 86400000 we run update the isActive property in firebase
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
    //when an item is checked, we map through the data array and update the React state
    const { isActive, id } = listItem;
    const nextData = data.map((item) => {
      if (item.id === id) {
        item.isActive = !item.isActive;
      }
      return item;
    });
    setData(nextData);
    //then we use the updateDoc function to update Firebase
    const updatedDoc = doc(db, token, listItem.id);
    await updateDoc(updatedDoc, {
      isActive: !isActive,
      lastPurchasedAt: Date.now(),
    });
  };

  return (
    <section>
      <div className="div">
        {data.length ? (
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
                    name={listItem.id}
                  />{' '}
                  <label htmlFor={name}>{name}</label>
                </li>
              );
            })}
          </ul>
        ) : (
          <>
            <h1>Smart Shopping List</h1>
            <div className="icons">
              <SiProbot className="icon" />
            </div>
            <p className="message">Your list is empty. Please add something.</p>
            <Link to="/additem" className="btn add-btn">
              Add Item
            </Link>
          </>
        )}
      </div>
      <Footer />
    </section>
  );
}

// const itemToUpdate = {
//   previousEstimate: calculateEstimate(item.previousEstimate, item.daysSinceLastPurchase, item.totalPurchases),
//   item.totalPurchases: item.totalPurchases+1,
//   purchasedDate: today(), (some function that returns today's date)
//   }

// const dateOfLastTransaction =
//       itemToUpdate.totalPurchases > 0
//         ? itemToUpdate.lastPurchasedAt
//         : itemToUpdate.createdAt;

// const daysSinceLastTransaction =
//       (Date.now() - dateOfLastTransaction) / Math.pow(8.64, 7);
