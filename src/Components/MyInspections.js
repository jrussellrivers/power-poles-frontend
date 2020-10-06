import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyInspections = ({ currentUser }) => {
    const [myInspection, setMyInspection] = useState(undefined)
    const [currentSearch, setCurrentSearch] = useState(undefined);
    const [formData, setFormData] = useState("");


    useEffect(() => {
        fetch("/grabAllPhotos", {
            method: "get",
            // body: JSON.stringify(currentUser.inspection_id),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setMyInspection(data);
            });
    }, [currentUser]);

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
        // let filtered = myInspection.filter(
        //     (inspection) => inspection.polenumber === Number(formData)
        // );
        // let filtered = myInspection
        // console.log(formData)
        // if(formData){
        //     filtered = myInspection.filter(photo => {
        //         console.log(photo)
        //         photo.file_name.includes(formData)
        //     });
        //     setCurrentSearch(filtered)
        // } else {
        //     setCurrentSearch(myInspection)
        // }
    };

    useEffect(() => {
        if(formData){
            let filtered = myInspection.filter(photo => {
                return photo.file_name.includes(formData.toString())
            });
            setCurrentSearch(filtered)
        } else {
            setCurrentSearch(myInspection)
        }
    }, [formData, myInspection]);

    return (<div>
        <h1 className="title"> Your Inspections</h1>
        <h2 className="title">Search</h2>
        <form>
            <label>Pole Number</label>
            <input
                className="input"
                type="text"
                value={formData}
                placeholder="Enter Pole Number"
                onChange={handleChange}
            />
        </form>
        {!myInspection && <div>There are no inspections to show at this time</div>}
        {currentSearch && currentSearch.map((inspection) => {
            return (
                <div className="card" key={inspection.photo_id}>
                    <div className="subtitle">{inspection.file_name}</div>
                    <div>{inspection.record_id}</div>
                    <img src={`https://mcleanphotovault.s3.amazonaws.com/${inspection.form_id}/${inspection.file_name}.jpg`}/>
                    {/* <div className="carditem">
                        <Link to={`myinspections/${inspection.id}`} className="inspection">
                            See photos?
                    </Link>
                    </div> */}
                </div>
            );
        })}
    </div>)

}


export default MyInspections