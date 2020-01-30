import React from 'react'

function Observation({ species, rarity, notes, img, stamp, longitude, latitude }) {
    return (
        <div style={{ border: "1px solid black", margin: "1rem auto", borderRadius: "5px", textAlign: "left", padding: "1rem" }} >
            <div style={{ margin: "0.5rem" }}><span style={{ fontWeight: "bold" }}>Species name:</span> {species}</div>
            <div style={{ margin: "0.5rem" }}><span style={{ fontWeight: "bold" }}>Rarity:</span> {rarity}</div>
            <div style={{ margin: "0.5rem" }}><span style={{ fontWeight: "bold" }}>Notes:</span> {notes}</div>
            <img style={{ marginLeft: "0.5rem", width: "96%", display: "block" }} src={img !== "" && img} className="file-data" />
            <p style={{ fontSize: "0.9rem", margin: "0.2rem 0.2rem 0.2rem 0.5rem" }}>{longitude}</p>
            <p style={{ fontSize: "0.9rem", margin: "0.2rem 0.2rem 0.2rem 0.5rem" }}>{latitude}</p>
            <div style={{ fontSize: "0.9rem", margin: "0.5rem", fontWeight: "bold" }}>{stamp}</div>
        </div>
    )
}

export default Observation