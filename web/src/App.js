import React, { useEffect } from 'react';
import api from './services/api';
import './global.css';
import './App.css';
import './sidebar.css';
import './main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';


function App() {
  const [devs, setDevs] = React.useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('devs');

      setDevs(response.data);
    }

      loadDevs();
  }, []);

  async function handleSubmit(data){
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Register</strong>
        <DevForm onSubmit={handleSubmit} />  
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem dev={dev._id} dev={dev} />
          ))}         
        </ul>
      </main>
    </div>
  );
}

export default App;
