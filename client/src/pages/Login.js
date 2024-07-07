import { useState, useEffect } from 'react';
import { PageHero, FormRow, Alert } from '../components';
import styled from 'styled-components'
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import OTPVerification from '../components/OTPVerification';
import axios from 'axios';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showOTP, setShowOTP] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    // Log the values to check if they are being captured correctly
    console.log('Form values:', { name, email, password, isMember, captchaValue });
  
    if (!email || !password || (!isMember && !name) || !captchaValue) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password, captchaValue };
    try {
      let response;
      if (isMember) {
        response = await axios.post('/api/v1/auth/login', currentUser);
      } else {
        response = await axios.post('/api/v1/auth/register', currentUser);
      }

      console.log('Server response:', response.data);
      
      if (response.data.requiresOTP) {
        setShowOTP(true);
        setOtpEmail(email);
      } else {
        handleLoginSuccess(response.data);
      }
    } catch (error) {
      console.error(error);
      displayAlert('Error', error.response?.data?.msg || 'Something went wrong');
    }
    
  };

  const handleOTPVerify = async (e) => {
    e.preventDefault();
    if (!otpEmail) {
      displayAlert('Please provide OTP');
      return;
    }
    try {
      const response = await axios.post('/api/v1/auth/verify-otp', { otp: otpEmail, email: values.email });
      if (response.data.user) {
        handleLoginSuccess(response.data);
      }
    } catch (error) {
      console.error(error);
      displayAlert('error', error.response?.data?.msg || 'Invalid OTP');
    }
  };

  const handleLoginSuccess = (data) => {
    const { user, token, location } = data;
    console.log('Login success data:', data);
    setupUser({
      user,
      token,
      location,
      alertText: 'Login Successful! Redirecting...',
    });
  };

  useEffect(() => {
    if (user) {
      console.log('User detected, navigating to home');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);
  return (
    <main>
      <PageHero title='login'/>
      <Wrapper className='full-page'>
        <form className='form' onSubmit={onSubmit}>
          {/* <Logo /> */}
          <h3>{values.isMember ? 'Login' : 'Register'}</h3>
          {showAlert && <Alert />}
          {/* name input */}
          {!values.isMember && (
            <FormRow
              type='text'
              name='name'
              value={values.name}
              handleChange={handleChange}
            />
          )}

          {/* email input */}
          <FormRow
            type='email'
            name='email'
            value={values.email}
            handleChange={handleChange}
          />
          {/* password input */}
          <FormRow
            type='password'
            name='password'
            value={values.password}
            handleChange={handleChange}
          />
          <ReCAPTCHA
            sitekey="6LczzwkqAAAAACXlUXtVKpOMGVQLZ2dtMMWG4tgK"
            onChange={handleCaptchaChange}
          />
          <button type='submit' className='btn btn-block' disabled={isLoading || !captchaValue}>
            submit
          </button>
          {/* <button
            type='button'
            className='btn btn-block btn-hipster'
            disabled={isLoading}
            onClick={() => {
              setupUser({
                currentUser: { email: 'testUser@test.com', password: 'secret' },
                endPoint: 'login',
                alertText: 'Login Successful! Redirecting...',
              });
            }}
          >
            {isLoading ? 'loading...' : 'demo app'}
          </button> */}
          {isLoading && "loading..."}
          <p>
            {values.isMember ? 'Not a member yet?' : 'Already a member?'}
            <button type='button' onClick={toggleMember} className='member-btn'>
              {values.isMember ? 'Register' : 'Login'}
            </button>
          </p>
        </form>

        {showOTP && (
          <form className='form' onSubmit={handleOTPVerify}>
              <h3>Enter OTP</h3>
              {showAlert && <Alert />}
              <FormRow
                type='text'
                name='otp'
                value={otpValue}
                handleChange={(e) => setOtpValue(e.target.value)}
              />
              <button type='submit' className='btn btn-block' disabled={isLoading}>
                Verify OTP
              </button>
            </form>
        )}
      </Wrapper>
    </main>

  );
};
export default Login;


const Wrapper = styled.section`


    display: flex;
    justify-content: center;
    align-items: center;
    height: 65vh;


.form {
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 1.5rem;
  width: 50px;
}

h3 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

.form-row {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  text-align: left;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.btn {
  display: block;
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

.btn-hipster {
  background-color: var(--clr-primary-9);
  color: var(--clr-primary-2);
}

.btn-hipster:hover {
  background-color: var(--clr-primary-6);
  color: var(--clr-primary-10);
}

.member-btn {
  background: none;
  border: none;
  color: var(--clr-primary-5);
  font-weight: 550;
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  margin-left: 0.5rem;
}

p {
  margin-top: 1.5rem;
  color: #555;
}

`
