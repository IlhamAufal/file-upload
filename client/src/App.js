import React, { useState } from 'react';
import axios from "axios";

function App() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('pw', pw);
    formData.append('file', file);
[

]
    try {
      const response = await axios.post("http://localhost:5000/create", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container" style={{ paddingTop: 60 }}>
      <div className="row">
        <h1>React JS Node Express JS Upload File with MySQL Insert data</h1>
        <div className="col-12">
          <label className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Password</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Upload File</label>
          <input
            className="form-control form-control-lg"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ marginTop: '20px' }}
          onClick={handleSubmit}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default App;
