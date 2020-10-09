import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllInspections = () => {
    const [allInspections, setAllInspections] = useState(undefined)
    const [currentSearch, setCurrentSearch] = useState(undefined);
    const [formData, setFormData] = useState("");


    useEffect(() => {
        fetch("/inspection/all", {
            method: "GET",
            // body: JSON.stringify(currentUser.inspection_id),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setAllInspections(data);
            });
    }, []);

    const handleChange = (evt) => {
        setFormData(evt.target.value);
    }

    useEffect(() => {
        if(formData){
            let filtered = allInspections.filter(inspection => {
                return inspection.name.toLowerCase().includes(formData.toString().toLowerCase())
            });
            setCurrentSearch(filtered)
        } else {
            setCurrentSearch(allInspections)
        }
    }, [formData, allInspections]);

    return (<div>
        <h1 className="title"> All Inspections</h1>
        <Link className="button is-link" to="/addinspection">
            Add Inspection
        </Link>
        <form>
            <label>Type Inspection Name to Filter</label>
            <input
                className="input"
                type="text"
                value={formData}
                placeholder="Enter Inspection Name"
                onChange={handleChange}
            />
        </form>
        {!allInspections && <div>There are no inspections to show at this time</div>}
        {currentSearch && currentSearch.map((inspection, idx) => {
            return (
                <div className="card inspection-card" key={idx}>
                    <div>{inspection.name}</div>
                    <div>ID: {inspection.id}</div>
                    <div>Code: {inspection.code}</div>
                    <div>
                        <Link className="is-link" to={{
                            pathname: '/editinspection',
                            currentInspection:inspection
                        }} >
                            Edit
                        </Link>
                    </div>
                </div>
            );
        })}
    </div>)

}


export default AllInspections