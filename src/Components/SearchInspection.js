import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchInspection = () => {
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


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/searchinspection", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCurrentSearch(data);
            });
    }

return (
    <div className="searchForm">
        <h2 className="title">Inspections</h2>
        <Link className="button is-link" to="/addinspection">
            Add Inspection
                </Link>
        <h2 className="subtitle">Search (and Edit) Inspections</h2>
        <form onSubmit={handleSubmit}>
            <label>Inspection Number</label>
            <input
                className="input"
                type="text"
                value={formData}
                placeholder="Enter Inspection Number"
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
        {currentSearch && currentSearch.map((inspection)=> {
             return (
                <div className="card" key={inspection.id}>
                    <div className="subtitle">{inspection.name}</div>
                    <div>{inspection.code}</div>
                    <div className="carditem">
                        <Link to={`myinspections/${inspection.id}`} className="inspection">
                            Edit
                    </Link>
                    </div>
                </div>
            );
        })}
    </div>
);
};
export default SearchInspection;