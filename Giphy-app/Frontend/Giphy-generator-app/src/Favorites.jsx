import React from 'react';
import { useNavigate } from 'react-router-dom';

const Favourites = ({ favourites, removeFavourite }) => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      
      <button className="btn btn-secondary mb-4" onClick={() => navigate('/')}>
        ⬅️ Back to Search
      </button>

      <h2>❤️ Your Favourites</h2>
      {favourites.length === 0 ? (
        <p>No favourites added yet.</p>
      ) : (
        <div className="d-flex flex-wrap justify-content-center" style={{ gap: "20px" }}>
          {favourites.map((gif) => (
            <div key={gif.id} className="text-center">
              <img
                src={gif.images.fixed_height.url}
                alt={gif.title}
                className="img-fluid rounded shadow"
              />
              <button
                className="btn btn-outline-danger mt-2"
                onClick={() => removeFavourite(gif.id)}
              >
                💔
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
