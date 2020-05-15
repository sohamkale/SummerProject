import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Body from "./Components/Shared/Body";
import NotFound from "./Components/Shared/NotFound";
import NavBar from "./Components/Shared/NavBar";

const App = () => {
  return (
  
    //Imported public NavBar
    <div>
      <NavBar/>
      <div className="container-fluid">
        <Body/>
      </div>
    </div>
  );
}

export default App;
