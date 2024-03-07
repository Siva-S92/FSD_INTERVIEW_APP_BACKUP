import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { useNavigate } from "react-router-dom";


function AddNotes({userNotes, setUserNotes}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  }, []);

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [pack, setPack] = useState("");
  const [questions, setQuestions] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  //api integration
  async function postnewNotes() {
    const notes = {
      companyName,
      role,
      package: pack,
      questions,
    };
    const response = await fetch(`http://localhost:8090/api/notes/user/add`, {
      method: "POST",
      body: JSON.stringify(notes),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    if(!data.data){
      setErr(data.error)
    }else {
      setUserNotes([...userNotes, data.data]);
      setMsg(data.message);
    }

  }

  return (
    <>
      <Base />
      <div className="container">
        <h1 className="text-center mt-2">Add Notes</h1>
      </div>
      <form>
        <div className="container">
          <div className="form-group">
            <label htmlFor="companyname">companyName:</label>
            <input
              type="text"
              className="form-control"
              id="companyname"
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              className="form-control"
              id="role"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            />
          </div>
          <div className="form-group">
            <label htmlFor="package">Package:</label>
            <input
              type="text"
              className="form-control"
              id="package"
              onChange={(e) => setPack(e.target.value)}
              value={pack}
            />
          </div>
          <div className="form-group">
            <label htmlFor="questions">Questions:</label>
            <textarea
              rows="4"
              type="text"
              className="form-control"
              id="questions"
              onChange={(e) => setQuestions(e.target.value)}
              value={questions}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2 px-5" onClick={postnewNotes}>
            Add Notes
          </button>

          {err ? (
            <div id="eoorblock" className="text-danger">
              {err}
            </div>
          ) : (
            ""
          )}

          {msg ? (
            <div id="eoorblock" className="text-danger">
              {msg}
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
    </>
  );
}

export default AddNotes;
