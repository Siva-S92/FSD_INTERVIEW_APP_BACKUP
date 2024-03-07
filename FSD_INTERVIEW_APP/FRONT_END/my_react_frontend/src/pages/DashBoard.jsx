import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate("/");

  const [notes, setNotes] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }

    const fetchData = async () => {
      const response = await fetch(`http://localhost:8090/api/notes/all`, {
        method: "GET",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (!data.data) {
        setErr(data.error);
      } else {
        setNotes(data.data);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Base />
      <div className="container">
        <h1 className="text-center mt-2">DashBoard</h1>
        <div className="text-center fs-4 fw-bold text-danger">All the posts in the the dash board</div>
      </div>
      {notes && (
        <div className="container">
          {notes?.map((data) => (
            <div key={data._id} className='border rounded py-2 mt-2 w-75 mx-auto text-center' style={{backgroundColor: "WhiteSmoke"}}>
              <p>CompanyName: {data.companyName} </p>
              <p>Role: {data.role} </p>
              <p>Package: {data.package} </p>
              <p>Questions: {data.questions} </p>
              <p>Date: {data.date} </p>
              <p>Posted By: {data.user.username} </p>
            </div>
          ))}
          {err ? (
            <div id="errorblock" className="text-danger">
              {err}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default DashBoard;
