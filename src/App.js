import React, { useState, useEffect } from 'react';
import firebase from './firebase.js'
import useInputState from './hooks/useInputState'
import uuid from 'uuid/v4'
import OnlineHome from './OnlineHome'
import OfflineHome from './OfflineHome'
import { Offline, Online } from "react-detect-offline";
import Form from './Form'
import LoadGif from './LoadGif'
import './css/App.css';

function App() {
  const [form, showForm] = useState(false);
  const [observation, updateObservations] = useState([]);
  const [localObs, updateLocalObs] = useState(JSON.parse(localStorage.getItem("locals") || "[]"));
  const [longitude, handleLongitude] = useState();
  const [latitude, handleLatitude] = useState();
  const [species, handleSpecies] = useInputState("");
  const [rarity, handleRarity] = useInputState("Common");
  const [notes, handleNotes] = useInputState("");
  const [uploading, handleUpload] = useState(false);
  const [img, handleImg] = useInputState("");

  const db = firebase.firestore();
  let birdList = db.collection('Birds').doc('zptW32hPkIoHknUpc1WN');
  const timestamp = Date.now();
  const obsObject = {
    id: uuid(),
    species: species,
    rarity: rarity,
    notes: notes,
    img: img,
    stamp: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp),
    longitude: longitude,
    latitude: latitude
  }

  useEffect(() => {
    birdList.get()
      .then(doc => {
        if (!doc.exists) {
          updateObservations([])
        } else {
          updateObservations(doc.data().Birds);
        }
      })
      .catch(err => {
        updateObservations([])
      });
    localStorage.setItem("locals", JSON.stringify(localObs) || "[]");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayLocationInfo);
    }
  })

  function displayLocationInfo(position) {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
    handleLongitude("Longitude: " + lng);
    handleLatitude("Latitude: " + lat);
  }

  function handleClick() {
    showForm(!form);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    birdList.update({
      Birds: [...observation, obsObject]
    })
    handleImg("");
    showForm(false);
    handleUpload(true);
    setTimeout(() => {
      handleUpload(false);
    }, 3000);
  }

  function handleSubmitLocally(evt) {
    evt.preventDefault();
    updateLocalObs([...localObs, obsObject])
    showForm(false);
    localStorage.setItem("locals", JSON.stringify(localObs) || "[]");
    handleUpload(true);
    setTimeout(() => {
      handleUpload(false);
    }, 3000);
  }

  return (
    <>
      <Online>
        <LoadGif uploading={uploading} text="Uploading..." />
        <OnlineHome
          form={form} uploading={uploading} birdList={birdList}
          handleClick={handleClick} observation={observation}
          updateLocalObs={updateLocalObs}
        />
        <Form
          handleSubmit={handleSubmit} handleSpecies={handleSpecies}
          handleRarity={handleRarity} handleNotes={handleNotes}
          handleImg={handleImg} handleClick={handleClick} form={form}
        />
      </Online>
      <Offline>
        <LoadGif uploading={uploading} text="Saving your observation..." />
        <OfflineHome form={form} uploading={uploading} handleClick={handleClick} />
        <Form
          handleSubmit={handleSubmitLocally} handleSpecies={handleSpecies}
          handleRarity={handleRarity} handleNotes={handleNotes}
          handleImg={handleImg} handleClick={handleClick} form={form}
        />
      </Offline>
    </>
  );
}

export default App;
