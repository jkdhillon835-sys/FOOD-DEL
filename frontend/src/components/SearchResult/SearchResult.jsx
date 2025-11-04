import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import './SearchResult.css';

const SearchResults = ({ food_list }) => {
  const [results, setResults] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    if (query) {
      const matched = food_list.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(matched);
    } else {
      setResults([]);
    }
  }, [query, food_list]);

  const openModal = (image) => setModalImage(image);
  const closeModal = () => setModalImage(null);

  if (!query) return <p>Please enter a search query.</p>;
  if (results.length === 0) return <p>No results found for "{query}".</p>;

  // Function to render stars for rating (out of 5)
  const renderStars = (rating) => {
    const stars = [];
    for(let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{color: i <= rating ? '#e94e1b' : '#ccc', fontSize: '1.2rem'}}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
  <div className="search-results">
    <h2>Results for "{query}":</h2>
    <ul className="search-results-list">
      {results.map((item) => (
        <li key={item._id} className="search-result-item">
          {/* Image */}
          <img
            src={item.image}
            alt={item.name}
            className="search-result-image"
            onClick={() => openModal(item.image)}
            style={{ cursor: 'pointer' }}
          />

          {/* Textual content container */}
          <div className="search-result-info">
            {/* Only the name is link */}
            <h3>
              <Link to={`/menu/${item._id}`} className="search-result-name-link">
                {item.name}
              </Link>
            </h3>
            <p>{item.description}</p>

            {/* Rating */}
            <div className="search-result-rating">
              {renderStars(item.rating || 4)}
              <span style={{ marginLeft: '0.5rem', fontWeight: '600', color: '#555' }}>
                {item.rating ? item.rating.toFixed(1) : '4 Stars'}
              </span>
            </div>

            {/* Reviews */}
            {item.reviews && item.reviews.length > 0 && (
              <div className="search-result-reviews">
                <strong>Reviews:</strong>
                <ul>
                  {item.reviews.map((review, idx) => (
                    <li key={idx} style={{ marginBottom: '0.3rem', fontStyle: 'italic', color: '#666' }}>
                      "{review}"
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="search-result-price">Price: ${item.price}</p>
          </div>
        </li>
      ))}
    </ul>

    {modalImage && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <img src={modalImage} alt="Large preview" className="modal-image" />
          <button className="modal-close" onClick={closeModal}>&times;</button>
        </div>
      </div>
    )}
  </div>
);


};

export default SearchResults;

