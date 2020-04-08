import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  
  // Declaring the repositories Data Source and using imutability
  const [repositories, setRepositories] = useState([]);
  
  // Getting data from api
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  },[]);

  // Add new repository
  async function handleAddRepository() {
    const response = await api.post('repositories');   
    const newRepoInfo = response.data;

    setRepositories([...repositories, newRepoInfo]);    
  }

  // Remove repository
  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete('repositories/' + id);

    if (response.status == 204)
    {
      setRepositories(...repositories.filter(repos => repos.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map(repos => 
          <li key={ repos.id }>{ repos.title }
            <button onClick={() => handleRemoveRepository(repos.id)}>
              Remover
            </button>
          </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
