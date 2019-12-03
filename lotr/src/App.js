import React, { useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [person, setPerson] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3333/api/users')
      .then(res => {
        console.log(res.data)
        setPerson(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      {person.map(hobbit => {
        return <p key={hobbit.id}>{hobbit.name}</p>
      })}
    </div>
  );
}

export default App;
