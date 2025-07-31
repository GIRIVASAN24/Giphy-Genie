// App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Favourites from './Favorites';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [favourites, setFavourites] = useState([]);

  const API_KEY = 'ppk4SGj60dkwoeJ8EAkWpqGpZyYBkHao';

  const fetchGifs = async (newSearch = false) => {
    if (!searchTerm.trim()) return;
    setLoading(true);

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=100&offset=${offset}&rating=g&lang=en`;

    const res = await fetch(url);
    const json = await res.json();

    setGifs(prev => newSearch ? json.data : [...prev, ...json.data]);
    setLoading(false);
  };

  const handleSearch = () => {
    setOffset(0);
    setGifs([]);
    fetchGifs(true);
  };

  const handleFavourite = (gif) => {
    if (!favourites.find(item => item.id === gif.id)) {
      setFavourites([...favourites, gif]);
      alert('Added to favourites!');
    } else {
      alert('Already in favourites!');
    }
  };

  const removeFavourite = (id) => {
    setFavourites(prev => prev.filter((gif) => gif.id !== id));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
          document.documentElement.scrollHeight &&
        !loading
      ) {
        setOffset(prev => prev + 10);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  useEffect(() => {
    if (offset > 0) {
      fetchGifs();
    }
  }, [offset]);

  return (
    <Router>
      <nav className='navbar navbar-expand-lg navbar-dark bg-info'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>GIPHY GENIE</Link>
          <div className='navbar-nav'>
            <Link className='nav-link' to='/'>Home</Link>
            <Link className='nav-link' to='/favourites'>Favourites</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path='/'
          element={
            <div>
              {/* Search */}
              <div className='d-flex justify-content-center mt-4' style={{ gap: "15px" }}>
                <input
                  type='text'
                  placeholder='Search for Gifs... 🔍'
                  className='form-control rounded'
                  style={{ width: "500px" }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='btn btn-outline-danger' onClick={handleSearch}>Search</button>
              </div>

              {/* GIF Grid */}
              <div className='grid d-flex p-4 flex-wrap justify-content-center' style={{ gap: "20px" }}>
                {gifs.map((gif) => (
                  <div key={gif.id} className='gif-item text-center'>
                    <img
                      src={gif.images.fixed_height.url}
                      alt={gif.title}
                      className='img-fluid rounded shadow'
                    />
                    <button
                      className='btn btn-outline-warning mt-2'
                      onClick={() => handleFavourite(gif)}
                    >
                      ❤️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          }
        />

        <Route
          path='/favourites'
          element={<Favourites favourites={favourites} removeFavourite={removeFavourite} />}
        />
      </Routes>
    </Router>
  );
}

export default App;