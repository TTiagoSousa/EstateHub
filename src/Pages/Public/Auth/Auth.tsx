import React, { useEffect, useState } from 'react';
import './Auth.scss';
import * as Image from '../../../Imports/images';
import { useLocation } from 'react-router';
import Simple_Input_And_Lable from '../../../Components/Inputs/Simple_Input_And_Lable/Simple_Input_And_Lable';
import Simple_Button from '../../../Components/Buttons/Simple_Button/Simple_Button';
import { useSignin } from '../../../Hooks/useSignin'; 

const Auth = () => {
  const { state } = useLocation();
  const { 
    signInEmail, 
    setSignInEmail, 
    signInpassword, 
    setSignInpassword, 
    signin 
  } = useSignin();

  useEffect(() => {
    if (state?.signup) {
      setIsSignUp(true);
    }
  }, [state]);

  const [isSignUp, setIsSignUp] = useState(false);
  const [isRecoverPassword, setIsRecoverPassword] = useState(false);

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setIsRecoverPassword(false);
  };

  const toggleRecoverPassword = () => {
    setIsRecoverPassword(!isRecoverPassword);
  };

  const handleSignIn = () => {
  
    signin();
  };

  return (
    <div className={`Auth ${isSignUp ? 'sign-up-mode' : ''}`}>

      <div className="Forms_Container">
        <div className="Signin_Signup">
          <form 
            className={`Sign_In_Form ${isSignUp ? 'hide' : ''}`}
            onSubmit={handleSignIn}
          >
            <h2 className="Title">Sign in</h2>
            <div className="Input_Field">
              <Simple_Input_And_Lable
                label_text="Email"
                type="email"
                placeholder="your@email.com"
                onChange={(e) => setSignInEmail(e.target.value)}
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Lable 
                label_text="Password"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setSignInpassword(e.target.value)}
              />
            </div>
            <div className='Recover_Password'>
              <span onClick={toggleRecoverPassword}>Recover password</span>
            </div>
            <div className='Button_Field'>
              <Simple_Button
                text="Sign in"
                onClick={handleSignIn}
              />
            </div>
          </form>

          <form action="#" className={`Sign_Up_Form ${isSignUp ? 'show' : ''}`}>
            <h2 className="Title">Sign up</h2>
            <div className="Input_Field">
              <Simple_Input_And_Lable 
                label_text="Email"
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Lable 
                label_text="Password"
                type="password"
              />
            </div>
            <div className="Input_Field">
              <Simple_Input_And_Lable 
                label_text="Repeat password"
                type="password"
              />
            </div>
            <div className='Button_Field'>
              <Simple_Button 
                text="Sign up"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="Panels_Container">
        <div className="Panel Left_Panel">
          <div className="Content">
            <h3>New here ?</h3>
            <p>
              Wealth rewards courage. Grow along your path without fear, for hope lies ahead in the journey.
            </p>
            <button className="Button Transparent" onClick={toggleMode}>
              Sign up
            </button>
          </div>
          <img src={Image.Image2} className="Image" alt="Login Illustration" />
        </div>
        <div className="Panel right-panel">
          <div className="Content">
            <h3>One of us ?</h3>
            <p>
              Success in finance takes vision. Walk with purpose and patience, value grows through time.
            </p>
            <button className="Button Transparent" onClick={toggleMode}>
              Sign in
            </button>
          </div>
          <img src={Image.Image1} className="Image" alt="Register Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Auth;