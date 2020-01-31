import React from 'react'

function OfflineHome({ form, uploading, handleClick }) {
    return (
        <>
            {form === false && uploading === false &&
                <div style={{ textAlign: "center", display: "block", width: "400px", margin: "0 auto", }} className="birds">
                    <h1>Oh no! Looks like you don't have internet connection...</h1>
                    <h3>You can still save your observations to localstorage and upload them when you are back online!
            </h3>
                    <button onClick={handleClick} className="btn btn-primary" style={{ marginBottom: "1rem" }} >Add a new observation!</button>
                </div>}
        </>
    )
}

export default OfflineHome