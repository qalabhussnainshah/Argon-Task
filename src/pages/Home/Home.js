import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import useAuth from "../../hooks/useAuth";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import AuthContext from "../../context/AuthProvider";

const Home = () => {
  const { auth, comments } = useAuth();
  const [newsFeed, setNewsFeed] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const { setAuth, setComments } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setNewsFeed([
      {
        id: 1,
        user: "John Doe",
        avatar: "QA",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        likes: 0,
        shares: 0,
        comments: [],
        textarea: "",
      },
      {
        id: 2,
        user: "Jane Smith",
        avatar: "BA",
        text: "Pellentesque habitant morbi tristique senectus.",
        likes: 0,
        shares: 0,
        comments: [],
        textarea: "",
      },
      {
        id: 3,
        user: "Alice Johnson",
        avatar: "I",
        text: "Donec ac accumsan nisi, ut commodo massa.",
        likes: 0,
        shares: 0,
        comments: [],
        textarea: "",
      },
    ]);
  }, []);

  const logout = async () => {
    setAuth({});
    navigate("/login");
  };

  const handleCommentInputChange = e => {
    setCommentInput(e.target.value);
  };
  const handleCommentSubmit = postId => {
    if (commentInput.trim() !== "") {
      const newComment = {
        user: auth.user.email.split("@")[0],
        comment: commentInput,
      };
      setNewsFeed(prevNewsFeed =>
        prevNewsFeed.map(post =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
      setComments([...comments, newComment]);
      setCommentInput("");
    }
  };

  const handleLikeButtonClick = postId => {
    setNewsFeed(prevNewsFeed =>
      prevNewsFeed.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleShareButtonClick = postId => {
    setNewsFeed(prevNewsFeed =>
      prevNewsFeed.map(post =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );
  };

  const renderNewsFeed = () => {
    return newsFeed?.map(post => (
      <div
        key={post.id}
        style={{
          width: "50%",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Avatar
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          >
            {post.avatar}
          </Avatar>
          <p style={{ marginLeft: "10px", fontWeight: "bold" }}>{post.user}</p>
        </div>
        <p>{post.text}</p>
        <button onClick={() => handleLikeButtonClick(post.id)}>
          Like ({post.likes})
        </button>
        <button onClick={() => handleShareButtonClick(post.id)}>
          Share ({post.shares})
        </button>
        <div>
          <h4>Comments</h4>
          {post &&
            post.comments &&
            post.comments.map((comment, index) => (
              <div key={index} style={{ marginBottom: "5px" }}>
                <strong>{comment.user}</strong>: {comment.comment}
              </div>
            ))}
          <textarea
            key={post.id}
            value={commentInput}
            onChange={handleCommentInputChange}
            placeholder="Write a comment..."
            style={{ width: "100%", height: "50px", marginTop: "10px" }}
          ></textarea>
          <button onClick={() => handleCommentSubmit(post.id)}>Send</button>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <header>
        <div className="flexGrow">
          <button style={{ float: "right", margin: 10 }} onClick={logout}>
            Sign Out
          </button>
        </div>
      </header>
      <h1
        style={{
          textAlign: "center",
          color: "blue",
        }}
      >
        User Dashboard
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>News Feed</h3>
        {newsFeed.length === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          renderNewsFeed()
        )}
      </div>
    </div>
  );
};

export default Home;
