import React , { Component, useState, useEffect } from "react";

import "./Signin.css";
const Signin = (props) => {
   
    return(
<body>
<div class="container">
  <div class="row">
    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <div class="card bg-dark text-white card-signin my-5">
        <div class="card-body">
          <h5 class="card-title text-center">Sign In</h5>
          <form class="form-signin">
            <div class="form-label-group">
              {/* <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus/> */}
              <input name="email" id="email" type="email"  class="form-control" onChange={props.handleEmailChange} value={props.email}  placeholder="Email" required autofocus/>
              <label for="email">Email address</label>
            </div>

            <div class="form-label-group">
              {/* <input type="password" id="inputPassword" class="form-control" placeholder="Password" required/> */}
              <input name="password" id="password" type="password" onChange={props.handlePasswordChange} value={props.password} placeholder="Password" class="input"/>
              <label for="password">Password</label>
            </div>

            <button class="btn btn-lg btn-primary btn-block text-uppercase" onClick={props.login} type="submit">Sign in</button>
            <form action='Signup' className="buf">
            <hr class="my-2"/>
            <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign up</button>
            </form>
            
            <hr class="my-4"/>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</body>

    )

}

export default Signin;