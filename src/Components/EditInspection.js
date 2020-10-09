import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert'

const EditInspection = (props) => {
    const alert = useAlert()

    const [newName, setNewName] = useState('')
    const [newInspectionId, setNewInspectionId] = useState('')
    const [newCode, setNewCode] = useState('')

    if (!newName && !newInspectionId && !newCode){
        setNewName(props.location.currentInspection.name)
        setNewInspectionId(props.location.currentInspection.id)
        setNewCode(props.location.currentInspection.code)
    }

    const handleEditSubmit = (e) => {
        let data = {id: newInspectionId, name: newName, code: newCode}
        e.preventDefault();
        fetch(`/inspection/edit/${props.location.currentInspection.id}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              //we will probably want to change this
              // setCurrentUser(data);
            })
            alert.show('Inspection edited')
    }

return (
    <div className="searchForm">
        <h2 className="subtitle">Edit Inspection</h2>

            <form onSubmit = {handleEditSubmit}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name="name"
                            id="name"
                            onChange={(e)=>setNewName(e.target.value)}
                            value = {newName}
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
                <div className="field">
                    <label className="label">Code</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name="code"
                            id="code"
                            onChange={(e)=>setNewCode(e.target.value)}
                            value = {newCode}
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
                        <Link className="button is-link" to="/inspections" >
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
    </div>
);
};
export default EditInspection;