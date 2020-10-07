import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert'

const SearchUsers = () => {
    const alert = useAlert()

    const [currentSearch, setCurrentSearch] = useState(undefined);
    const [formData, setFormData] = useState("");
    const [newUserInfo, setNewUserInfo] = useState({})
    const [editMode, setEditMode] = useState(false)

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

    const deleteUser = (id) => {
        fetch("/deleteuser", {
            method: "POST",
            body: JSON.stringify(id),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(setCurrentSearch(undefined))  
    }

    const handleEditChange = (e) => {
        setNewUserInfo({... currentSearch, [e.target.name]: e.target.value});
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        fetch("/updateuser", {
            method: "POST",
            body: JSON.stringify(newUserInfo),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              //we will probably want to change this
              // setCurrentUser(data);
            })
        setEditMode(false)
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
            {currentSearch && !editMode && 
                    <div className="card" key={currentSearch.id}>
                        <div className="subtitle">{currentSearch.username}</div>
                        <div>{currentSearch.inspection_id}</div>
                        {currentSearch.admin ? <div>ADMIN </div>: <div> NOT ADMIN</div>}

                        <button onClick = {()=>setEditMode(true)}>Edit User</button>
                        <button onClick = {deleteUser(currentSearch.id)}>Delete User</button>
                        <button>Change Password</button>
                    </div>
            }
            {/* //allows you to edit!  */}
            {currentSearch && editMode && 
            <div className="card" key={currentSearch.id}>
                <div>Leaving fields blank will keep their inital value!</div>
                <form onSubmit = {handleEditSubmit}>
                <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="username"
                                id="username"
                                onChange={handleEditChange}
                                placeholder = {currentSearch.username}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input
                                className="input"
                                type="password"
                                placeholder="Enter new password here!"
                                name="password"
                                id="password"
                                onChange={handleEditChange}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Inspection ID</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="inspection_id"
                                id="inspection_id"
                                onChange={handleEditChange}
                                placeholder = {currentSearch.inspection_id}
                            />
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <label class="label">Admin?</label>
                            <label class="radio">
                                <input type="radio" name="adminBool" value="true" id="radio1" />
                                    Yes
                            </label>
                            <label class="radio">
                                <input type="radio" name="adminBool" value="false" id="radio2" />
                                        No
                            </label>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button
                                className="button"
                                type="submit"
                                id="register-button"
                            >
                            Submit
                    </button>
                        </div>
                        <div className="control">
                            <button className="button" type="reset" id="cancel-button">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>}
        </div>)
};
export default SearchUsers;