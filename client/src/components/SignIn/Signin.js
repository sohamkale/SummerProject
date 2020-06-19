import React  from "react";

import "./Signin.css";
const Signin = (props) => {
   
    return(

<div className="container">
  <div className="row">
    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <div className="card bg-dark text-white card-signin my-5">
        <div className="card-body">
          <h5 className="card-title text-center">Sign In</h5>
          <form className="form-signin">
            <div className="form-label-group">
              {/* <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/> */}
              <input name="email" id="email" type="email"  className="form-control" onChange={props.handleEmailChange} value={props.email}  placeholder="Email" required autoFocus/>
              <label htmlFor="email">Email address</label>
            </div>

            <div className="form-label-group">
              {/* <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/> */}
              <input name="password" id="password" type="password" onChange={props.handlePasswordChange} value={props.password} placeholder="Password" className="input"/>
              <label htmlFor="password">Password</label>
            </div>

            <button className="btn btn-lg btn-primary btn-block text-uppercase" onClick={props.login} type="submit">Sign in</button>
            <a className="btn btn-lg btn-primary btn-block text-uppercase" href="/Signup">Sign up</a>
          </form>
          <center><a className="btn btn-link text-uppercase" href="/ResetPass">Reset Password</a></center>

        </div>
      </div>
    </div>
  </div>
</div>


    )

}

export default Signin;