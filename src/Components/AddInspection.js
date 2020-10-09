import React, { useState } from "react";
import { useAlert } from 'react-alert'
import { Link } from "react-router-dom";

const AddInspection = () => {
  const alert = useAlert()

  const [formData, setFormData] = useState({});


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/inspection/create", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.status === true ? alert.show('Inspection Created') : alert.show('Inspection ID Taken')
      });
  };

  return (
    <div className="Form">
      <form className="Form1" onSubmit={handleSubmit}>
        <h1>Add Inspection</h1>

        <section className="section">

          <div className="field">
            <label className="label">Inspection ID</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter Inspection ID"
                name="id"
                id="id"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Enter name"
              name="name"
              id="name"
              onChange={handleChange}
              required
            />
          </div>


          <div className="field">
            <label className="label">Code</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter Code"
                name="code"
                id="code"
                onChange={handleChange}
                required
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


        </section>
      </form>
    </div>
  );
}

export default AddInspection
