import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import useAuth from "../../hooks/useAuth";
import AuthContext from "../../context/AuthProvider";

const Admin = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { comments } = useAuth();
  const [latestComments, setLatestComments] = useState([]);

  const logout = async () => {
    setAuth({});
    navigate("/login");
  };

  useEffect(() => {
    setLatestComments(comments);
  }, []);

  return (
    <div>
      <header>
        <div className="flexGrow">
          <button style={{ float: "right", margin: 10 }} onClick={logout}>
            Sign Out
          </button>
        </div>
      </header>
      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
      <h3>Latest Comments</h3>
      {latestComments?.map(comment => (
        <div
          key={comment.comment}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <strong>{comment.user}</strong>: {comment.comment}
        </div>
      ))}
    </div>
  );
};

export default Admin;
