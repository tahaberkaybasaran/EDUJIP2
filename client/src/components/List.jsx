import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

const List = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/students").then((res) => {
      setData(res.data);
      console.log(res);
      console.log(res.data);
    });
  }, []); //works once when component mount
  return (
    <div className="container-fluid bg-primary vh-100 vw-100">
      <h3>Students</h3>
      {/* <div className="d-flex justify-content-end">
        <Link className="btn btn-success" to="/create">
          Add Student
        </Link>
      </div> */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => {
            return (
              <tr key={student.id}>
                <td>{student.tc}</td>
                <td>{student.adi}</td>
                <td>{student.soyad}</td>
                <td>{student.okul_adi}</td>
                <td>{student.okul_no}</td>
                <td>
                  {/* <Link
                    className="btn mx-2 btn-success"
                    to={`/read/${student.id}`}
                  >
                    Read
                  </Link>
                  <Link
                    className="btn mx-2 btn-success"
                    to={`/edit/${student.id}`}
                  >
                    Edit
                  </Link> */}
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="btn mx-2 btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
