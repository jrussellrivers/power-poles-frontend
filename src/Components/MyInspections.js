import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert'

const MyInspections = () => {
    const alert = useAlert()

    const [currentSearch, setCurrentSearch] = useState(undefined);
    const [formData, setFormData] = useState("");


    const handleChange = (e) => {
        setFormData(e.target.value);
    }

    const Reset = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentSearch(undefined);
        setFormData("");
    };

  const handleSubmit = (evt) => {
        evt.preventDefault();
        fetch(`/grabAllPhotos/${formData}`, {
            method: "GET",
            // body: JSON.stringify(formData),

            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCurrentSearch(data)
            });
    }

return (
    <div className="searchForm">
        <h2 className="title">My Inspection</h2>

        <h2 className="subtitle">Search Pole Locations by Name<br/>(Limit 100 Results)</h2>
        <form onSubmit={handleSubmit}>
            <label>Pole Name</label>
            <input
                className="input"
                type="text"
                value={formData}
                placeholder="Enter Pole Name Here"
                onChange={handleChange}
            />
            <div className="field is-grouped">
                <div className="control">
                    <button className="button" type="submit">
                        Search
            </button>
                </div>
                <div className="control">
                    <button className="button" onClick={Reset}>
                        Reset
            </button>
                </div>
            </div>
        </form>
        {currentSearch && currentSearch.map((photo, idx) => {
            return (
                <div className="card" key={idx}>
                    <div className="photoDiv">
                        <img className='thumbnailPhoto' src={`https://mcleanphotovault.s3.amazonaws.com/${photo.form_id}/${photo.file_name}.jpg`}/>
                        {photo.file_name}
                    </div>
                    <div>
                        <Link className="is-link" to={{
                            pathname: '/singlepole',
                            currentPole:photo
                        }} >
                            See Details
                        </Link>
                    </div>
                   
                </div>
            );
        })}

    </div>)

}


export default MyInspections
