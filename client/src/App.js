import React, { useEffect, useState } from 'react';

function App() {
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => setBackendData(data));
  }, []);

  return (
    <div>
      {!backendData ? (
        <p>Loading...</p>
      ) : (
        backendData.services.map((service) => (
          <div key={service.id} style={{ marginBottom: "1rem" }}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            {service.image && (
              <img
                src={service.image}
                alt={service.title}
                style={{ width: "200px", height: "auto" }}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default App;