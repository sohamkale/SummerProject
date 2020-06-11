import React, {Component, useState, useEffect} from "react";
import fire from "../../config/Fire";

const ResetPassword = (props) => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(0); //0 not attempted, 1 passed, 2 failed

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = event=> {

        event.preventDefault();
        fire.auth().sendPasswordResetEmail(email).then(function() {
           setStatus(1);
        }).catch(function(error) {
            setStatus(2);
        });

    }

    function View() {
        if (props.user) {
        return (<center>
            <div className="text-white"> You are already logged in!</div>
        </center>)
        }

        else if (status==1)
        {
            return (<center>
                <div className="text-white"> Reset Password Link Sent.<br/> Please follow the prompt to reset you password.<br/><br/></div>
            </center>)
        }
        else if (status==2)
        {
            return (<center>
                <div className="text-white"> Reset Password Failed!<br/> Please submit a feedback form with your email and we will resolve the matter. Sorry for the inconvenience.<br/><br/></div>
                <a className="btn btn-lg btn-primary btn-block text-uppercase w-50" href="/Feedback">Send Feedback</a>
            </center>)
        }
        return (<form className="form-signin" method="get" onSubmit={handleSubmit}>
            <div className="form-label-group">
                <input name="email" id="email" type="email" required className="form-control" onChange={handleEmailChange}
                       value={email} placeholder="Email" required autoFocus/>
                <label htmlFor="email">Email address</label>
            </div>
            <center>
                <input className="btn btn-lg btn-primary btn-block text-uppercase w-50"
                        type="submit" value="Send Reset Link"/>
                <a className="btn btn-lg btn-primary btn-block text-uppercase w-50" href="/Login">Sign In</a>
            </center>
        </form>);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card bg-dark text-white card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Reset Password</h5>
                            <View/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default ResetPassword;