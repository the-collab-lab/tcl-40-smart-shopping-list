import React, { useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddItem({ token }) {
  const [listItem, setListItem] = useState({
    name: '',
    frequency: '7',
  });

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
      await addDoc(collection(db, token), {
        property: listItem,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const { name, frequency } = listItem;

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
      <button type="submit">Add Item</button>
    </form>
  );
}
