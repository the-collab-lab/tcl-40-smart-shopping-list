import React, { useState, useEffect } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Link } from 'react-router-dom';
import { SiProbot } from 'react-icons/si';
import { FaRegTrashAlt } from 'react-icons/fa';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import '../../App.css';
import './List.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function List({ token }) {
  const [data, setData] = useState([]);
  //this is just a duplicate of the data, so that the real data is never touched, its populated in the useEffect
  const [copyOfData, setCopyOfData] = useState([]);
  //this is search input the user types in the textbox, this is set as the value, so its a controlled input
  const [searchInput, setSearchInput] = useState('');
  const [searchError, setSearchError] = useState('');
  const [toggleErr, setToggleErr] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, token), (snapshot) => {
      const snapshotDocs = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        snapshotDocs.push(data);
      });
      const sortedName = snapshotDocs.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      const sortedFrequency = sortedName.sort((a, b) => {
        return a.frequency - b.frequency;
      });
      setData(sortedFrequency);
      //duplicate data from firebase to be manipulated
      setCopyOfData(sortedFrequency);
    });
    return () => {
      unsubscribe();
    };
  }, [token]);

  // on each re-render, we loop through the react data array to check the current time against the last purchased at time
  useEffect(() => {
    data.forEach((item) => {
      if (item.lastPurchasedAt === null) {
        return;
      }
      const now = Date.now();
      const delta = now - item.lastPurchasedAt;
      // we then feed the delta and the item into our unCheck function and if the item has a delta greater than 86400000 we run update the isActive property in firebase
      unCheckItem(item, delta);
    });
  });

  //added searchInput state value as a dependency so the search criteria updates as soon as the user types
  useEffect(() => {
    //the original data set is filtered so we always search from all the list items
    let searchResults = data.filter((listItem) => {
      return listItem.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    //if search input is empty (the user hasnt typed anything or they removed their input), set the data back to the original list
    if (searchInput === '') {
      setCopyOfData(data);
      setToggleErr(true);
    } else {
      setCopyOfData(searchResults);
      setToggleErr(false);
    }
    //if the search results return no entries, set the search Error to display to the user indicating no entries were found
    searchResults.length < 1
      ? setSearchError('No List Items Match Your Search')
      : setSearchError('');
  }, [searchInput, data]);

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
    const { isActive, id, frequency, lastPurchasedAt, timesPurchased } =
      listItem;
    const nextData = data.map((item) => {
      if (item.id === id) {
        item.isActive = !item.isActive;
      }
      return item;
    });
    setData(nextData);
    //then we use the updateDoc function to update Firebase
    const updatedDoc = doc(db, token, listItem.id);
    const now = Date.now();
    const nextActive = !isActive;
    const update = {
      isActive: nextActive,
    };
    if (nextActive) {
      const daysSinceLastPurchase = lastPurchasedAt
        ? Math.floor((now - lastPurchasedAt) / 86400000)
        : frequency;
      update.timesPurchased = timesPurchased + 1;
      update.lastPurchasedAt = now;
      update.frequency = calculateEstimate(
        frequency,
        daysSinceLastPurchase,
        update.timesPurchased,
      );
    }

    await updateDoc(updatedDoc, update);
  };

  //onChange handler for search input
  const filterList = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  //onClick handler for delete button
  async function deleteItem(listItem) {
    const docRef = doc(db, token, listItem.id);
    console.log(docRef);
    const confirm = window.confirm(
      `Do you want to delete ${listItem.name} from your list?`,
    );
    if (confirm) {
      await deleteDoc(docRef);
    }
  }

  return (
    <section>
      <div className="div">
        <Header />
        {data.length > 1 ? (
          <label htmlFor="search" className="search-label">
            Search List:
            <input
              title="search your list"
              aria-label="enter your search term"
              type="search"
              name="search"
              id="search"
              onChange={filterList}
              value={searchInput || ''}
              placeholder="e.g. potatoes"
              className="search"
            />
          </label>
        ) : null}
        {data.length ? (
          <ul className="list-container">
            {searchError ? (
              <p
                role="alert"
                id="search-err"
                className="search-error"
                style={{
                  outline: '3px dashed red',
                }}
              >
                {searchError}
              </p>
            ) : null}
            {copyOfData.map((listItem, index) => {
              const {
                name,
                isActive,
                frequency,
                timesPurchased,
                lastPurchasedAt,
              } = listItem;
              let buyIndicator = '';
              let badge = '';
              if (
                timesPurchased === 1 ||
                ((Date.now() - lastPurchasedAt) / 86400000 >= frequency * 2 &&
                  lastPurchasedAt !== null)
              ) {
                buyIndicator = 'overdue';
              } else if (frequency < 7) {
                buyIndicator = 'soon';
              } else if (frequency >= 7 && frequency <= 30) {
                buyIndicator = 'kind-of-soon';
              } else if (frequency > 30) {
                buyIndicator = 'not-soon';
              }
              badge = buyIndicator.replaceAll('-', ' ');
              return (
                <li key={index} className={`list-item`}>
                  {' '}
                  <input
                    className="checkbox"
                    aria-invalid={toggleErr}
                    aria-describedby="search-err"
                    aria-errormessage="search-err"
                    onChange={() => onChange(listItem)}
                    checked={isActive}
                    type="checkbox"
                    id={name}
                    name={listItem.id}
                  />{' '}
                  <label htmlFor={name} className="list-item-name">
                    {name}
                  </label>
                  <label htmlFor={name}>
                    <small className={buyIndicator}>{badge}</small>
                  </label>
                  <button
                    className="delete-button"
                    onClick={() => deleteItem(listItem)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <>
            {/* <h1>Smart Shopping List</h1>
            <div className="icons">
              <SiProbot className="icon" />
            </div> */}
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
