import React from 'react'

function Form({ handleSubmit, handleSpecies, handleNotes, handleImg, handleClick, handleRarity, form }) {
    return (
        <>
            {form === true &&
                <div style={{ display: "block", textAlign: "center" }} >
                    <form onSubmit={handleSubmit} style={{ width: "400px", textAlign: "left", display: "inline-block", margin: "1rem auto" }} className="form">
                        <div class="form-group">
                            <label>Species name</label>
                            <input onChange={handleSpecies} required type="text" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label >Rarity</label>
                            <select class="form-control" onChange={handleRarity} required >
                                <option>Common</option>
                                <option>Rare</option>
                                <option>Extremely Rare</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label >Notes</label>
                            <textarea class="form-control" rows="3" onChange={handleNotes} required></textarea>
                        </div>
                        <div class="form-group">
                            <label>Picture url (optional)</label>
                            <input class="form-control" type="text" onChange={handleImg} />
                        </div>
                        <div style={{ marginTop: "2rem" }}>
                            <button className="btn btn-secondary btn-lg" onClick={handleClick}>Go Back</button>
                            <button type="submit" className="btn btn-primary btn-lg" style={{ float: "right" }}>Submit</button>
                        </div>
                        <div>
                        </div>
                    </form></div>}
        </>
    )
}

export default Form