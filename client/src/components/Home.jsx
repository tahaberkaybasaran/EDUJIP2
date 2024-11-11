import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(true);

  useEffect(() => {
    if (isDeleted) {
      setIsDeleted(false);
    }
    axios.get("http://localhost:5000/students").then((res) => {
      setData(res.data);
      console.log(res);
      console.log(res.data);
    });
  }, [isDeleted]); //works once when component mount

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then((res) => {
        setIsDeleted(true);
      })
      .cath((err) => console.log(err));
  };
  return (
    <div className="container-fluid bg-primary vh-100 vw-100">
      <h3>Students</h3>
      <div className="d-flex justify-content-end">
        <Link className="btn btn-success" to="/create">
          Add Student +
        </Link>
      </div>
      <table className="bg-light border ">
        <thead>
          <tr>
            <th>TC</th>
            <th>AD</th>
            <th>SOYAD</th>
            <th>OKUL ADI</th>
            <th>OKUL NUMARASI</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => {
            return (
              <tr key={student.id}>
                <td>{student.tc}</td>
                <td>{student.ad}</td>
                <td>{student.soyad}</td>
                <td>{student.okul_adi}</td>
                <td>{student.okul_no}</td>
                <td>
                  <Link
                    className="btn mx-2 btn-success"
                    to={`/edit/${student.id}`}
                  >
                    Edit
                  </Link>
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

export default Home;
