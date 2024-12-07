import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'// Import file CSS của bạn

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter your email');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:4000/api/v1/auth/reset-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper_auth">
      <div className="container1">
        <h2 className="h2_login">Quên Mật Khẩu</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
          </div>
          
          {message && (
            <div className="message">
              <p>{message}</p>
            </div>
          )}

          <div className="">
            <button type="submit" className="btn_login" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Send Reset Link'}
            </button>
          </div>
        </form>
        <div className="switch-form">
          <a href="/login">Quay Về Đăng Nhập</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;