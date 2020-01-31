import React from 'react'
import Observation from './Observation'
import uploadLocals from './functions/uploadLocals'

function OnlineHome({ form, uploading, birdList, handleClick, observation, updateLocalObs }) {
    return (
        <>
            {form === false && uploading === false &&
                <div style={{ display: "block", width: "400px", margin: "0 auto", textAlign: "center" }} className="birds">
                    <h1 style={{ margin: "1rem" }}>Recent observations</h1>
                    <div style={{ display: "flex" }}>
                        <button onClick={() => uploadLocals(birdList, observation, updateLocalObs)} className="btn btn-secondary" style={{ margin: "1rem", width: "50%" }}>Upload your saved observations!</button>
                        <button onClick={handleClick} className="btn btn-primary" style={{ margin: "1rem", width: "50%" }} >Add a new observation!</button>
                    </div>
                    {observation.slice(0).reverse().map(obs => (
                        <Observation species={obs.species} rarity={obs.rarity} notes={obs.notes} img={obs.img} stamp={obs.stamp} longitude={obs.longitude} latitude={obs.latitude} />
                    ))}
                </div>}
        </>
    )
}

export default OnlineHome