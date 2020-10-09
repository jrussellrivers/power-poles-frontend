import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState(undefined)
    const [currentSearch, setCurrentSearch] = useState(undefined);
    const [formData, setFormData] = useState("");


    useEffect(() => {
        fetch("/user/all", {
            method: "GET",
            // body: JSON.stringify(currentUser.inspection_id),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setAllUsers(data);
            });
    }, []);

    const handleChange = (evt) => {
        setFormData(evt.target.value);
    }

    useEffect(() => {
        if(formData){
            let filtered = allUsers.filter(user => {
                return user.username.toLowerCase().includes(formData.toString().toLowerCase())
            });
            setCurrentSearch(filtered)
        } else {
            setCurrentSearch(allUsers)
        }
    }, [formData, allUsers]);

    return (<div>
        <h1 className="title"> All Users</h1>
        <Link className="button is-link" to="/adduser">
            Add User
        </Link>
        <form>
            <label>Type Username to Filter</label>
            <input
                className="input"
                type="text"
                value={formData}
                placeholder="Enter Username"
                onChange={handleChange}
            />
        </form>
        {!allUsers && <div>There are no users to show at this time</div>}
        {currentSearch && currentSearch.map((user, idx) => {
            return (
                <div className="card user-card" key={idx}>
                    <div>{user.username}</div>
                    <div>Inspection ID: {user.inspection_id}</div>
                    <div>ADMIN: {user.admin.toString()}</div>
                    <div>
                        <Link className="is-link" to={{
                            pathname: '/edituser',
                            currentUser:user
                        }} >
                            Edit
                        </Link>
                    </div>
                </div>
            );
        })}
    </div>)

}


export default AllUsers