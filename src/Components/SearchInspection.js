import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert'

const SearchInspection = () => {
    const alert = useAlert()

    const [currentSearch, setCurrentSearch] = useState(undefined);
    const [formData, setFormData] = useState("");
    const [editMode, setEditMode] = useState(false)
    const [newName, setNewName] = useState('')
    const [newInspectionId, setNewInspectionId] = useState('')
    const [newCode, setNewCode] = useState('')

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
        fetch(`/inspection/one/${formData}`, {
            method: "GET",
            // body: JSON.stringify(formData),

            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === true){
                    setCurrentSearch(data.content)
                    setNewName(data.content.name)
                    setNewInspectionId(data.content.id)
                    setNewCode(data.content.code)
                } else {
                    alert.show('No Inspection Found')
                }
            });
    }

    const handleEditSubmit = (e) => {
        let data = {id: newInspectionId, name: newName, code: newCode}
        e.preventDefault();
        fetch(`/inspection/edit/${currentSearch.id}`, {
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
        setEditMode(false)
        setCurrentSearch(undefined)
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

        {currentSearch && !editMode &&
            <div className="card" key={currentSearch.id}>
                <div className="subtitle">{currentSearch.name}</div>
                <div>ID: {currentSearch.id}</div>
                <div>Code: {currentSearch.code}</div>
                <div className="carditem">
                <button onClick = {()=>setEditMode(true)}>Edit Inspection</button>
                <button >Delete Inspection</button>
                </div>
            </div>
        }
        {currentSearch && editMode && 
            <div className="card" key={currentSearch.id}>
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
                            <button className="button" type="reset" id="cancel-button" onClick={()=>{
                                setEditMode(false)
                                setNewName(currentSearch.username)
                                setNewInspectionId(currentSearch.inspection_id)
                                setNewCode(currentSearch.code)
                                }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>}
    </div>
);
};
export default SearchInspection;