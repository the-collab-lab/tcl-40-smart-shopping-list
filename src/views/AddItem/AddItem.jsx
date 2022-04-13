import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { userToken } from '../../utils/localStorage';

export default function AddItem() {
  const [listItem, setListItem] = useState({
    name: '',
    frequency: '7',
    date: '',
  });

  //this useEffect will be removed when we merge our branches together because we no longer have to create a dummy variable, we will stricly grab the user token from local storage
  useEffect(() => {
    const dummyVariable = 'KN';
    localStorage.setItem('item', JSON.stringify(dummyVariable));
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setListItem({
      ...listItem,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem();
  };

  const addItem = async () => {
    try {
      const docRef = await addDoc(collection(db, userToken), {
        property: listItem,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const { name, frequency, date } = listItem;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Item Name</label>
      <input
        type="text"
        id="name"
        onChange={handleInput}
        value={name}
        name="name"
      />
      <fieldset>
        <legend>Frequency</legend>
        <label htmlFor="7">Soon</label>
        <input
          type="radio"
          name="frequency"
          value="7"
          id="7"
          checked={frequency === '7'}
          onChange={handleInput}
        />
        <label htmlFor="14">Kind of Soon</label>
        <input
          type="radio"
          name="frequency"
          value="14"
          id="14"
          checked={frequency === '14'}
          onChange={handleInput}
        />
        <label htmlFor="30">Not Soon</label>
        <input
          type="radio"
          name="frequency"
          value="30"
          id="30"
          checked={frequency === '30'}
          onChange={handleInput}
        />
      </fieldset>
      <label htmlFor="lastPurchase">Date of Last Purchase</label>
      <input
        type="date"
        id="lastPurchase"
        onChange={handleInput}
        value={date}
        name="date"
      />
      <button type="submit">Add Item</button>
    </form>
  );
}
