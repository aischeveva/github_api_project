import React, { useState, useEffect } from 'react'
import './App.css'
import { getGeneralInfo } from './services/info'
import Company from './components/Company'

const App = () => {
  const [futurice, setFuturice] = useState({})
  const [columbia, setColumbia] = useState({})
  const [aito, setAito] = useState({})
  
  useEffect(() => {
    getGeneralInfo('futurice').then(company => setFuturice(company))
    getGeneralInfo('ColumbiaRoad').then(company => setColumbia(company))
    getGeneralInfo('AitoDotAI').then(company => setAito(company))
  }, [])

  return (
    <div className="App">
      <Company company={ futurice } />
      <Company company={ columbia } />
      <Company company={ aito } />
    </div>
  );
}

export default App;
