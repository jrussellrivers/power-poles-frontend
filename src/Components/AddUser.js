import React, { useState, useEffect} from "react";
import { useAlert } from 'react-alert'
import { Link } from "react-router-dom";


const AddUser = ({ setCurrentUser }) => {
    const alert = useAlert()

    const [formData, setFormData] = useState({});
    const [inspections, setInspections] = useState(undefined)

    // we may want to change this for sustainability measures
    //  useEffect(() => {
    //    fetch("/inspection/all", {
    //      method: "GET",
    //      headers: {
    //        "Content-Type": "application/json",
    //      },
    //    })
    //      .then((res) => res.json())
    //      .then((data) => {
    //        setInspections(data);
    //      });
    //  }, []);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/register", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                // data.status === true ? alert.show('User Created') : alert.show('Username Already Taken')
                if (data.status === true && data.i_status === true ) {
                    alert.show('User Created')
                } else if (data.status === false && data.i_status === true){
                    alert.show('Username Already Taken')
                } else if (data.status === true && data.i_status === false){
                    alert.show('No Inspection Match')
                } else {
                    alert.show('Username Already Taken & No Inspection Match')
                }
            });
    };

    return (
        <div className="Form">
            <form className="Form1" onSubmit={handleSubmit}>
                <h1>Add User</h1>

                <section className="section">
                    <label className="label">Username</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Enter Username"
                            name="username"
                            id="username"
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input
                                className="input"
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                id="password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Inspection ID</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Enter Inspection ID"
                                name="inspection_id"
                                id="inspection_id"
                                onChange={handleChange}
                            />
                        </div>
                    </div>


                    <div class="field">
                        <div class="control">
                            <label class="label">Admin?</label>
                            <label class="radio">
                                <input type="radio" name="admin" value={true} id="radio1" required onClick={handleChange}/>
                                    Yes
                            </label>
                            <label class="radio">
                                <input type="radio" name="admin" value={false} id="radio2" required onClick={handleChange}/>
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
                            <Link className="button is-link" to="/users" >
                                Cancel
                            </Link>
                        </div>
                    </div>


                </section>
            </form>
        </div>
    );
}

export default AddUser
