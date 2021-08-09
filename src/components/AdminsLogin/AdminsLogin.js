import classNames from 'classnames';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SecureLogin from '../../images/SecureLogin.svg';
import { postContent, session } from '../../utils';
import { Toast } from '../../utils/addon';
import { useForm, useToast } from '../../utils/hooks';
import './AdminsLogin.css';

export default function AdminsLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setpassword] = useState('');
  const [phoneError, setphoneError] = useState(null);
  const [passwordError, setpasswordError] = useState(null);
  const { getData, values, submit } = useForm(login),
    [isLoading, setIsLoading] = useState(false);
  const { toastMessage, toggleToast } = useToast();
  let history = useHistory();

  function checkInputs() {
    if (phoneNumber === '') {
      setphoneError('Phone number cannot be blank');
      return false;
    }
    if (password === '') {
      setpasswordError('Password number cannot be blank');
      return false;
    }
    return true;
  }
  function handleLogin(e) {
    e.preventDefault();
    if (!checkInputs()) return false;
    submit(e);
    // return false;
  }

  async function login() {
    try {
      setIsLoading(true);
      const user = await postContent({
        url: '/users/login',
        data: values,
      });

      if (user.success) {
        // session.set('token', user.data.token);
        session.set('user', user.data);
        session.set('token', user.data.token);
      }
      setIsLoading(false);
      history.push('/orders');
    } catch (error) {
      setIsLoading(false);
      toggleToast(error.message);
    }
  }

  return (
    <div className="LoginDiv">
      <div className="LoginDivImage">
        <img
          style={{ width: '80%', height: '500px', margin: 'auto' }}
          src={SecureLogin}
          alt="Croods"
        />
      </div>
      <div className="AdminLogincontainer">
        <div className="AdminLoginheader">
          <h2>Login</h2>
        </div>
        <form id="form" className="AdminLoginform">
          <div
            className={classNames({
              'AdminLoginform-control': true,
              error: phoneError,
              success: phoneNumber.length !== 0,
            })}
          >
            <label for="username">Email</label>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setphoneError(null);
                getData(e);
              }}
              id="email"
            />
            <i className="fa fa-check-circle"></i>
            <i className="fa fa-exclamation-circle"></i>
            <small>Email cannot be empty</small>
          </div>

          <div
            className={classNames({
              'AdminLoginform-control': true,
              error: passwordError,
              success: password.length !== 0,
            })}
          >
            <label for="username">Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setpassword(e.target.value);
                setpasswordError(null);
                getData(e);
              }}
              id="password"
            />
            <i className="fa fa-check-circle"></i>
            <i className="fa fa-exclamation-circle"></i>
            <small>Password number cannot be blank</small>
          </div>

          <button disabled={isLoading} onClick={(e) => handleLogin(e)}>
            Login
          </button>
        </form>
      </div>
      {toastMessage && (
        <Toast message={toastMessage} showToast={toggleToast} status={Boolean(toastMessage)} />
      )}
    </div>
  );
}
