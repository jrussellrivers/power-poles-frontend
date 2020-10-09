import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert'

const EditUser = (props) => {
    const alert = useAlert()

    const [newUsername, setNewUsername] = useState('')
    const [newInspectionId, setNewInspectionId] = useState('')
    const [newPassword, setNewPassword] = useState('')

    if (!newUsername && !newInspectionId){
        setNewUsername(props.location.currentUser.username)
        props.location.currentUser.inspection_id === null ? setNewInspectionId('') : setNewInspectionId(props.location.currentUser.inspection_id)
    }

    const handleEditSubmit = (e) => {
        let edit
        if (newPassword !== ''){
            edit = {username: newUsername, inspection_id: newInspectionId, password: newPassword}
        } else {
            edit = {username: newUsername, inspection_id: newInspectionId}
        }
        e.preventDefault();
        fetch(`/user/edit/${props.location.currentUser.id}`, {
            method: "POST",
            body: JSON.stringify(edit),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              //we will probably want to change this
              // setCurrentUser(data);
            })
            alert.show('User edited')
    }

return (
    <div className="searchForm">
        <h2 className="subtitle">Edit User</h2>

            <form onSubmit = {handleEditSubmit}>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name="username"
                            id="username"
                            onChange={(e)=>setNewUsername(e.target.value)}
                            value = {newUsername}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            placeholder="Enter new password here/Leave blank for no change"
                            name="password"
                            id="password"
                            onChange={(e)=>setNewPassword(e.target.value)}
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
                            onChange={(e)=>setNewInspectionId(e.target.value)}
                            value = {newInspectionId}
                        />
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
                        <Link className="button is-link" to="/users" >
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
    </div>
);
};
export default EditUser;