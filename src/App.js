import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  //show repositories
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
        title: "Desafio ReactJS",
        url: "https://github.com/lucasfsf",
        title: "Desafio ReactJS",
        techs: ["ReactJS", "Node.js"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);



  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const noDeleted = repositories.filter((repository) => repository.id !== id);


    setRepositories(noDeleted);
    

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}
      
        
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
