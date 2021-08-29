import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import Button from "react-bootstrap/Button";
import showPwdImg from './img/open-password.svg';
import hidePwdImg from './img/hide-password.svg';
import { FaAddressCard } from "react-icons/fa";


function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isRevealPwd, setIsRevealPwd] = useState(false);


  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div className="login-style-main-wem">
      <div className="login-style-wem">
        <div className="login-style-01-wem">Wenz Login</div>
        <div id="float-label">
          <input
            className="login-style-wem" 
            type="username"
            {...username}
            autoComplete="new-password"
            required
            //value={value}
            //onChange={(e) => username(e.target.value)}
          />
          <FaAddressCard className="custom-font-wem email-icon-fix-wem" />

          <label className={'email-label-style-wem &{ isActive ? "Active" : ""}'} >
             E-mail
          </label>
        </div>
        <div id="float-label">
          <input
            className="login-style-wem" 
            type={isRevealPwd ? "text" : "password"}
            {...password}
            autoComplete="new-passord"
            //value={value}
            //onChange={(e) => password(e.target.value)} 
          />
          <img 
            className="login-img-password-sub01-wem"
            alt="hide and show password"
            title={isRevealPwd ? "Hide password" : "Show password"}
            src={isRevealPwd ? hidePwdImg : showPwdImg}
            onClick={() => setIsRevealPwd(prevState => !prevState)}
          />

          <label className={ isActive ? "Active" : ""} >
            Password
          </label>
        </div>
        <div className="login-style-bottom-wem">
          {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
          <Button id="btnLogin" type="submit" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} >Login</Button>
        </div>
      </div>
    </div>
    
    
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;