import React, { useState, useEffect } from "react";
import "./css/Matches.css"; // Import the external CSS file

const Matches = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [votes, setVotes] = useState({});

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalImage("");
  };

  const handleVote = (imageSrc, type) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [imageSrc]: { ...prevVotes[imageSrc], [type]: (prevVotes[imageSrc]?.[type] || 0) + 1 },
    }));
  };

  useEffect(() => {
    // Disable right-click and dragging on all images
    const handleRightClick = (e) => {
      e.preventDefault();
    };

    const handleDragStart = (e) => {
      e.preventDefault();
    };

    const images = document.querySelectorAll("img");
    images.forEach((image) => {
      image.addEventListener("contextmenu", handleRightClick);
      image.addEventListener("dragstart", handleDragStart);
    });

    // Cleanup event listeners on component unmount
    return () => {
      images.forEach((image) => {
        image.removeEventListener("contextmenu", handleRightClick);
        image.removeEventListener("dragstart", handleDragStart);
      });
    };
  }, []);

  return (
    <div className="container">
      <h2>Matches</h2>
      <p>This is the Matches page.</p>
      <div className="image-container">
        {["default.jpeg", "default.jpeg"].map((image, index) => (
          <div key={index} className="image-item">
            <img
              src={`http://192.168.231.74:80/uploads/${image}`}
              alt={`Image ${index + 1}`}
              className="image"
              onClick={() => openModal(`http://192.168.231.74:80/uploads/${image}`)}
              draggable="false"
            />
            <div className="voting-buttons">
              <button onClick={() => handleVote(image, "like")}>👍</button>
              <button onClick={() => handleVote(image, "dislike")}>👎</button>
            </div>
            <div className="vote-counts">
              <p>Likes: {votes[image]?.like || 0}</p>
              <p>Dislikes: {votes[image]?.dislike || 0}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="modal" onClick={closeModal}>
          <button className="close-button" onClick={(e) => { e.stopPropagation(); closeModal(); }}>
            ✖
          </button>
          <img src={modalImage} alt="Enlarged Image" className="modal-image" />
          <div className="watermark">Copyright by Sparks</div>
        </div>
      )}
    </div>
  );
};

export default Matches;
