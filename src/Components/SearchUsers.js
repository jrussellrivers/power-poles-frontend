import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchUsers = () => {
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
        fetch("/searchuser", {
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
            {currentSearch && currentSearch.map((user)=>{
                  return (
                    <div className="card" key={user.id}>
                        <div className="subtitle">{user.username}</div>
                        <div>{user.inspectionId}</div>
                        {user.admin ? <div>ADMIN </div>: <div> NOT ADMIN</div>}
                    </div>)
            })}
        </div>
    );
};
export default SearchUsers;