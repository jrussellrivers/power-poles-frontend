import React, { useState } from "react";


const AddInspection = () => {

  const [formData, setFormData] = useState({});
 

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch("/inspection/create", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //we will probably want to change this
        // setCurrentUser(data);
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
              <button className="button" type="reset" id="cancel-button">
                Cancel
                    </button>
            </div>
          </div>


        </section>
      </form>
    </div>
  );
}

export default AddInspection
