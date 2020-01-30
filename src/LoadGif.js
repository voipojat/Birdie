import React from 'react'

function LoadGif({ uploading, text }) {
    return (
        <>
            {uploading === true ? <div style={{ textAlign: "center", display: "block", margin: "100px auto" }}><h2>{text}</h2>
                <img src="https://gifimage.net/wp-content/uploads/2017/09/bird-gif-9.gif" style={{ maxWidth: "80%" }} /></div> : null}
        </>
    )
}

export default LoadGif