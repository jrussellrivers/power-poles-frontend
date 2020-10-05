import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyInspections = () => {

    const [photos,setPhotos] = useState()
    const [searchTerm,setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([]);

    const onChange = text => {
        setSearchTerm(text)
    }

    useEffect(() => {
        fetch('/grabPhotos')
        .then(r=>r.json())
        .then(data=>setPhotos(data))
    },[])

    
    let results
    if(searchTerm){
        results = photos.filter(photo =>
            photo.file_name.toLowerCase().includes(searchTerm)
        );
    }
    setSearchResults(results);


    return(<div>
        <h1 className="title"> Your Inspections</h1>
        <ul>
            <li> Map Search Results Here</li>
            <li> if Not search results, just map through photos, else map search results</li>
            <li>  - Ability to click on each inspection, fetch images</li>

        </ul>
    </div>)

}


export default MyInspections