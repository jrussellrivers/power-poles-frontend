import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchUsers = () => {
    const [currentInspection, setCurrentInspection] = useState(undefined)
    const [currentSearch, setCurrentSearch] = useState(undefined);
    const [formData, setFormData] = useState("");

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
        let filtered = currentInspection.filter(
            (inspection) => inspection.polenumber === Number(formData)
        );
        setCurrentSearch(filtered);
    };

    return (
        <div className="searchForm">
            <h2 className="title">Users</h2>
            <Link className="button is-link" to="/adduser">
                 Add User
                </Link>
            <h2 className="subtitle">Search (and Edit) User</h2>
            <form onSubmit={handleSubmit}>
                <label>User Id</label>
                <input
                    className="input"
                    type="text"
                    value={formData}
                    placeholder="Enter User ID"
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
        </div>
    );
};
export default SearchUsers;