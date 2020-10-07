import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert'

const SearchUsers = () => {
    const alert = useAlert()

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
        fetch(`user/username/${formData}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                data.status === true ? setCurrentSearch(data.content) : alert.show('No User Found')
            });
    }

    return (
        <div className="searchForm">
            <h2 className="title">Users</h2>
            <Link className="button is-link" to="/adduser">
                Add User
             </Link>
            <h2 className="subtitle">Search (and Edit) User</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    className="input"
                    type="text"
                    value={formData}
                    placeholder="Enter Username"
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
            {currentSearch && 
                    <div className="card" key={currentSearch.id}>
                        <div className="subtitle">{currentSearch.username}</div>
                        <div>{currentSearch.inspection_id}</div>
                        {currentSearch.admin ? <div>ADMIN </div>: <div> NOT ADMIN</div>}
                    </div>
            }
        </div>
    );
};
export default SearchUsers;