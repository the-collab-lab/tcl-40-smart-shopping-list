import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import Footer from '../../components/Footer/Footer';
import '../../App.css';
import './AddItem.css';
import Header from '../../components/Header/Header';

const INITIAL_STATE = {
  name: '',
  frequency: '7',
  isActive: false,
  lastPurchasedAt: null,
  timesPurchased: 0,
};

export default function AddItem({ token, addTokenToLocalStorage, tokenList }) {
  const [listItem, setListItem] = useState(INITIAL_STATE);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, token), (snapshot) => {
      const snapshotDocs = [];
      snapshot.forEach((doc) => snapshotDocs.push(doc.data()));
      setData(snapshotDocs);
    });
    return () => {
      unsubscribe();
    };
  }, [token]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setListItem({
      ...listItem,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkForErrors = checkforDuplicateItems();
    console.log(checkForErrors);
    if (checkForErrors) {
      setError('Item already in list!');
      setListItem(INITIAL_STATE);
      return;
    } else {
      addItem();
      setListItem(INITIAL_STATE);
      setError('Item added successfully!');
    }
  };

  const checkforDuplicateItems = () => {
    //get the value the user typed
    //preserve that value
    //get the whole list from firebase
    //loop through and check each list item for a match with what the user typed
    let status = false;
    data.forEach((item) => {
      let editedItem = item.name;
      //use regex to find and replace any punctuation with and empty string
      let result = editedItem.replace(/[\W|_]/g, '');
      let editedName = name;
      let nameResult = editedName.replace(/[\W|_]/g, '');
      //use the punctuation free version of the item to check for equality
      if (result.toLowerCase() === nameResult.toLowerCase()) {
        status = true;
      }
    });
    return status;
  };

  const addItem = async () => {
    listItem.frequency = parseInt(frequency, 10);
    try {
      await addDoc(collection(db, token), listItem);
      //add token to local storage on if its not already in the array
      if (!tokenList.includes(token)) {
        localStorage.setItem('token', token);
        addTokenToLocalStorage(token);
      }
    } catch (e) {
      console.error(e);
    }
    //updateNumberOfPurchases();
  };

  const { name, frequency } = listItem;

  return (
    <div>
      <Header />
      <div className="addItemContainer">
        <span className="userMessage">{error}</span>
        <form onSubmit={handleSubmit} className="addItemForm">
          <label htmlFor="name">
            <strong>Item Name</strong>
          </label>
          <input
            type="text"
            id="name"
            onChange={handleInput}
            value={name}
            name="name"
          />

          <fieldset className="freqContainer">
            <legend>
              <strong>
                How soon will you need to purchase this item again?
              </strong>
            </legend>
            <label className="freqLabel" htmlFor="7">
              <input
                className="freqInput"
                type="radio"
                name="frequency"
                value="7"
                id="7"
                checked={frequency === '7'}
                onChange={handleInput}
              />
              Soon
            </label>
            <label className="freqLabel" htmlFor="14">
              <input
                className="freqInput"
                type="radio"
                name="frequency"
                value="14"
                id="14"
                checked={frequency === '14'}
                onChange={handleInput}
              />
              Kind of Soon
            </label>
            <label className="freqLabel" htmlFor="30">
              <input
                className="freqInput"
                type="radio"
                name="frequency"
                value="30"
                id="30"
                checked={frequency === '30'}
                onChange={handleInput}
              />
              Not soon
            </label>
          </fieldset>
          <button type="submit" className="addButton btn">
            Add to List
          </button>
        </form>
        <Footer />
      </div>
    </div>
  );
}
