import React from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
import { Route, Switch, Redirect  } from 'react-router-dom';
import NotFound from "./components/Shared/NotFound";
// import NavBar from "./Components/Shared/NavBar";

import Home from "./views/Home/Home.js"
import NavBar from "./components/Header/NavBar";
import LoginApp from "./views/Login/LoginApp";
import Signup from "./views/Signup/Signup";
import usersFront from "./components/UsersFront";
const App = () => {
  return (
  
    //Imported public NavBar
    <div>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Sofia&family=Spartan:wght@400;700&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"/>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous"></link>
      </head>
      <NavBar />
      <Switch>
      <Route exact path="/Home" component={Home} />
      {/* <Route exact path="/contact" component={ContactMe} /> */}
      <Route exact path="/Login" component={LoginApp} />
      <Route exact path="/Signup" component={Signup} />
      <Route exact path="/usersFront" component={usersFront} />
      {/* <Route exact path="/delete" component={DeleteImage}/> */}
      {/* remove this above line */}
      <Route exact path="/">
        <Redirect to="/Home" />
      </Route>
        <Route component={NotFound}/>
      </Switch>
      {/* <div className="container-fluid">
        <Body/>
      </div> */}
    </div>
  );
}

export default App;
