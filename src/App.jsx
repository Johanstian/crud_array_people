import { useState } from 'react'
import './App.css'
// import { Person } from './components/Person'
import { People } from './components/people';

function App() {

  const [people, setPeople] = useState([
    {id: 1, name: 'Daria', role: 'Admin', img: 'https://bootdey.com/img/Content/avatar/avatar8.png'},
    {id: 2, name: 'Johan', role: 'Front', img: 'https://bootdey.com/img/Content/avatar/avatar2.png'},
    {id: 3, name: 'Martina', role: 'Back', img: 'https://bootdey.com/img/Content/avatar/avatar3.png'},
  ]);

  return (
    <div>
      <People people={people} setPeople={setPeople}/>
      {/* <Person /> */}
    </div>
  )
}

export default App
