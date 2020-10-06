import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyInspections = ({ currentUser }) => {
    const [myInspection, setMyInspection] = useState(undefined)
    const [currentSearch, setCurrentSearch] = useState(undefined);
    const [formData, setFormData] = useState("");


    useEffect(() => {
        fetch("/addinspection", {
            method: "POST",
            body: JSON.stringify(currentUser.inspectionId),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setMyInspection(data);
            });
    }, [currentUser]);


    const handleChange = (evt) => {
        setFormData(evt.target.value);
    }

    const Reset = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentSearch(undefined);
        setFormData("");
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let filtered = myInspection.filter(
            (inspection) => inspection.polenumber === Number(formData)
        );
        setCurrentSearch(filtered);
    };

    return (<div>
        <h1 className="title"> Your Inspections</h1>
        <h2 className="title">Search</h2>
        <form onSubmit={handleSubmit}>
            <label>Pole Number</label>
            <input
                className="input"
                type="text"
                value={formData}
                placeholder="Enter Pole Number"
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
        {!myInspection && <div>There are no inspections to show at this time</div>}
        {!currentSearch && myInspection && myInspection.map((inspection) => {
            return (
                <div className="card" key={inspection.id}>
                    <div className="subtitle">{inspection.name}</div>
                    <div>{inspection.code}</div>
                    <div className="carditem">
                        <Link to={`myinspections/${inspection.id}`} className="inspection">
                            See photos?
                    </Link>
                    </div>
                </div>
            );
        })}
    </div>)

}


export default MyInspections