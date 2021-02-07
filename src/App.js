import React, {useEffect, useState} from "react";
import * as RepositoryService from './services/RepositoryService'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [techs, setTechs] = useState('')

  const getRepositories = async () => {
    try {
     const response = await RepositoryService.listRepositories()
     setRepositories(response)
     console.log('############ get new repos ##################')
    }
    catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getRepositories()
  }, []);
  
  async function handleAddRepository() {
    
    const payload = {
      title,
      url,
      techs: techs.split(',')
    }
    try {
      const newRepository = await RepositoryService.createRepository(payload)
      setRepositories([...repositories, newRepository])
    }
    catch(error) {
      console.error(error)
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await RepositoryService.removeRepository(id)
      const filteredRepo = repositories.filter((repository) => repository.id !== id)
      setRepositories(filteredRepo)
    }
    catch(error) {
      console.error(error)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {
        repositories.map(repository => {
          console.log(`render --- ${repository.title}`)
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })
      }
      </ul>

      <form>
        <div className="inputBlock">
          <span>Title</span>
          <input type="text" value={title} onChange={({target: {value}}) => {setTitle(value)}} name="title" id="title"/>
        </div>
        <div className="inputBlock">
          <span>Url</span>
          <input type="text" value={url} onChange={({target: {value}}) => {setUrl(value)}} name="url" id="url"/>
        </div>
        <div className="inputBlock">
          <span>Techs</span>
          <input type="text" value={techs} onChange={({target: {value}}) => {setTechs(value)}} name="techs" id="techs"/>
        </div>
      </form>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
