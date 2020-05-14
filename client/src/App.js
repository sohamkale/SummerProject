import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./Views/Home/Home";
import NotFound from "./Shared/NotFound";
import NavBar from "./Shared/NavBar";

const App = () => {
  return (
  
    //Imported public NavBar
    <div>
      <NavBar/>
      <Home/>
    </div>
  );
}

export default App;
