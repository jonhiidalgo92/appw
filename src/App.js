import React,{useEffect, useState} from 'react'


import {BrowserRouter as Router,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import Navegacion from './componentes/Navegacion'

import Reportes from './componentes/Reportes'

import Data from './componentes/Data'

import Metricas from './componentes/Metricas'

function App() {
  return (
    <Router>
      <Navegacion/>
      <Route path="/repo"     exact component = {Reportes}/>
      <Route path="/data"     exact component = {Data}/>
      <Route path="/metricas" exact component = {Metricas}/>
    </Router>
  );
}

export default App;
