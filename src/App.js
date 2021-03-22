import React,{useEffect, useState} from 'react'


import {BrowserRouter as Router,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import Navegacion from './componentes/Navegacion'

import Reportes from './componentes/Reportes'

import Datos from './componentes/Datos'

import Metricas from './componentes/Metricas'

import Top from './componentes/Top'

import ChartContainer from './componentes/Funel'

import Type  from './componentes/Type'



function App() {
  return (
    <Router>
      <Navegacion/>
      <Route path="/repo"     exact component = {Reportes}/>
      <Route path="/data"     exact component = {Datos}/>
      <Route path="/metricas" exact component = {Metricas}/>
      <Route path="/top"      exact component = {Top}/>
      <Route path="/type"      exact component = {Type}/>
      <Route path="/funel"    exact component = {ChartContainer}/>

    </Router>
  );
}

export default App;
