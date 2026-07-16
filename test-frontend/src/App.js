import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://13.206.119.124:5000/api/test')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>CI/CD Test App</h1>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {data ? (
          <div>
            <p>{data.message}</p>
            <p><small>Timestamp: {data.timestamp}</small></p>
          </div>
        ) : (
          !error && <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
