import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ImageEditorPage from './ImageEditorPage';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 20;

const SearchPage = () => {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch images from the API
  const fetchImages = useCallback(async () => {
    try {
      const query = searchInput.current.value;
      if (query) {
        setErrorMsg('');
        setLoading(true);

        const { data } = await axios.get(
          `${API_URL}?query=${query}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${process.env.REACT_APP_API_KEY}`
        );

        setImages(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg('Error fetching images. Try again later.');
      console.error(error);
      setLoading(false);
    }
  }, [page]);

  // Initial fetch when component mounts
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Reset search to the first page
  const resetSearch = () => {
    setPage(1);
    fetchImages();
  };

  // Handle form submission for search
  const handleSearch = (event) => {
    event.preventDefault();
    resetSearch();
  };

  // Handle filter selection
  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    resetSearch();
  };

  return (

    
    <div className="container">
      <div className="user-info">
          <p>Adarsh Kumar</p>
          <p>Email: adarshkumar3088877@gmail.com</p>
        </div>

      <h1 className="title">Image Search</h1>
      
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      <div className="search-section">
        <Form onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Type something to search..."
            className="search-input"
            ref={searchInput}
          />
        </Form>
      </div>
      <div className="filters">
        {/* You can map over an array of filter options instead of hardcoding */}
        {['nature', 'birds', 'cats', 'shoes'].map((filter) => (
          <div key={filter} onClick={() => handleSelection(filter)}>
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </div>
        ))}
      </div>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <div className="images">
            {images.map((image) => (
              <ImageEditorPage key={image.id} image={image} />
            ))}
          </div>
          <div className="buttons">
            {page > 1 && <Button onClick={() => setPage(page - 1)}>Previous</Button>}
            {page < totalPages && <Button onClick={() => setPage(page + 1)}>Next</Button>}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
