import React, { useEffect, useState } from "react";


const SinglePole = (props) => {
    let inspection = props.location.currentPole
    console.log(props)

    return (<div className="photocontainer">
        <div className="singlephoto card">
            <div className="title">Pole Number: {inspection.file_name}</div>
            <div className="subtitle">Inspection Number:{inspection.record_id} </div>
            <a className="button is-link" href={`https://www.google.com/maps/search/?api=1&query=${inspection.exif_gps_latitude},${inspection.exif_gps_longitude}`} target="_blank">See Map</a>
            
            <div className="img-container">
                <img src={`https://mcleanphotovault.s3.amazonaws.com/${inspection.form_id}/${inspection.file_name}.jpg`} className = "image-magnify" />;
            </div>
            
        </div>
    </div>)

}

export default SinglePole