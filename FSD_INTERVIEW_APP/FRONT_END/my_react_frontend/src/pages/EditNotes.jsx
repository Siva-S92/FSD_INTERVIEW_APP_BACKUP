import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useNavigate, useParams } from 'react-router-dom';

function EditNotes({userNotes, setUserNotes}) {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [pack, setPack] = useState("");
  const [questions, setQuestions] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const {id} = useParams();



  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
    const data = userNotes.find((data) => data._id === id)
    if (data) {
      setCompanyName(data.companyName)
      setRole(data.role)
      setPack(data.package)
      setQuestions(data.questions)
    }

  }, [id,userNotes]);

  

  //api integration
  async function editNewNotes() {
    console.log("sss");
    const notes = {
      companyName,
      role,
      package: pack,
      questions,
    };
    const response = await fetch(`http://localhost:8090/api/notes/user/edit/${id}`, {
      method: "PUT",
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
      const editableIndex = userNotes?.findIndex((data) => data._id === id);
      userNotes[editableIndex] = data.data;
      await setUserNotes([...userNotes]);
      setMsg(data.message)
    }

  }

  return (
    <>
      <Base />
      <div className="container">
        <h1 className="text-center mt-2">Edit Notes</h1>
      </div>
      <form>
        <div className="container">
          <div className="form-group">
            <label htmlFor="companyname">companyName:</label>
            <input
              type="text"
              className="form-control"
              id="companyname"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              
              
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              className="form-control"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              
              
            />
          </div>
          <div className="form-group">
            <label htmlFor="package">Package:</label>
            <input
              type="text"
              className="form-control"
              id="package"
              value={pack}
              onChange={(e) => setPack(e.target.value)}
              
            />
          </div>
          <div className="form-group">
            <label htmlFor="questions">Questions:</label>
            <textarea
              rows="4"
              type="text"
              className="form-control"
              id="questions"
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              
            />
          </div>
          <button type="button" className="btn btn-primary mt-2 px-5" onClick={editNewNotes}>
            Edit Notes
          </button>

          {err ? (
            <div id="errorblock" className="text-danger">
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

export default EditNotes