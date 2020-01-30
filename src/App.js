import React, { useState, useEffect } from 'react';
import firebase from './firebase.js'
import useInputState from './hooks/useInputState'
import uuid from 'uuid/v4'
import Observation from './Observation'
import { Offline, Online } from "react-detect-offline";
import Form from './Form'
import LoadGif from './LoadGif'
import './App.css';

function App() {
  const [form, showForm] = useState(false);
  const [observation, updateObservations] = useState([]);
  const [localObs, updateLocalObs] = useState(JSON.parse(localStorage.getItem("locals") || "[]"));
  const [species, handleSpecies] = useInputState("");
  const [rarity, handleRarity] = useInputState("Common");
  const [notes, handleNotes] = useInputState("");
  const [uploading, handleUpload] = useState(false);
  const [img, handleImg] = useInputState("");
  const [longitude, handleLongitude] = useState();
  const [latitude, handleLatitude] = useState();

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

  function displayLocationInfo(position) {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
    handleLongitude("Longitude: " + lng);
    handleLatitude("Latitude: " + lat);

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

  function uploadLocals() {
    const array = JSON.parse(window.localStorage.getItem("locals"));
    if (array) {
      for (let i = 0; i < array.length; i++) {
        birdList.update({
          Birds: [...observation,
          array[i]
          ]
        })
      }
    }
    localStorage.removeItem("locals")
    updateLocalObs([]);
  }

  return (
    <>
      <Online>
        <LoadGif uploading={uploading} text="Uploading..." />
        {form === false && uploading === false &&
          <div style={{ display: "block", width: "400px", margin: "0 auto", textAlign: "center" }} className="birds">
            <h1 style={{ margin: "1rem" }}>Recent observations</h1>
            <div style={{ display: "flex" }}>
              <button onClick={uploadLocals} className="btn btn-secondary" style={{ margin: "1rem", width: "50%" }}>Upload your saved observations!</button>
              <button onClick={handleClick} className="btn btn-primary" style={{ margin: "1rem", width: "50%" }} >Add a new observation!</button>
            </div>

            {observation.slice(0).reverse().map(obs => (
              <Observation species={obs.species} rarity={obs.rarity} notes={obs.notes} img={obs.img} stamp={obs.stamp} longitude={longitude} latitude={latitude} />
            ))}
          </div>}
        <Form
          handleSubmit={handleSubmit}
          handleSpecies={handleSpecies}
          handleRarity={handleRarity}
          handleNotes={handleNotes}
          handleImg={handleImg}
          handleClick={handleClick}
          form={form}
        />
      </Online>

      <Offline>
        <LoadGif uploading={uploading} text="Saving your observation..." />
        {form === false && uploading === false &&
          <div style={{ textAlign: "center", display: "block", width: "400px", margin: "0 auto", }} className="birds">
            <h1>Oh no! Looks like you don't have internet connection...</h1>
            <h3>You can still save your observations to localstorage and upload them when you are back online!
          </h3>
            <button onClick={handleClick} className="btn btn-primary" style={{ marginBottom: "1rem" }} >Add a new observation!</button>
          </div>}
        <Form
          handleSubmit={handleSubmitLocally}
          handleSpecies={handleSpecies}
          handleRarity={handleRarity}
          handleNotes={handleNotes}
          handleImg={handleImg}
          handleClick={handleClick}
          form={form}
        />
      </Offline>
    </>
  );
}

export default App;
