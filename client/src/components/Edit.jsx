import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/get_students/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/edit_user/${id}`, data[0])
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>User {id}</h1>
      <Link to="/" className="btn btn-success">
        Back
      </Link>
      {data.map((student) => {
        return (
          <form onSubmit={handleSubmit} key={student.id}>
            <div className="form-group my-3">
              <label htmlFor="tc">TC</label>
              <input
                value={student.tc}
                type="number"
                name="TC"
                onChange={(e) => setData([{ ...data[0], tc: e.target.value }])}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="name">Ad</label>
              <input
                value={student.ad}
                type="text"
                name="name"
                onChange={(e) =>
                  setData([{ ...data[0], name: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="surname">Soyad</label>
              <input
                value={student.soyad}
                type="text"
                name="surname"
                onChange={(e) =>
                  setData([{ ...data[0], surname: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="schoolName">Okul Adi</label>
              <input
                value={student.okul_adi}
                type="text"
                name="schoolName"
                onChange={(e) =>
                  setData([{ ...data[0], schoolName: e.target.value }])
                }
              />
            </div>
            {/* <div className="form-group my-3">
              <label htmlFor="schoolName">Okul Numarasi</label>
              <input
                value={student.okul_no}
                type="number"
                name="schoolName"
                onChange={(e) =>
                  setData([{ ...data[0], schoolNo: e.target.value }])
                }
              />
            </div> */}
            <div className="form-group my-3">
              <label htmlFor="schoolName">TC</label>
              <input
                value={student.okul_no}
                type="number"
                name="schoolNo"
                onChange={(e) =>
                  setData([{ ...data[0], schoolNo: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        );
      })}
    </div>
  );
};

export default Edit;
