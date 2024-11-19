import React, { useState } from 'react';
import { sendOtp } from '../services/authService';

const VerifyOtp = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async () => {
    try {
      await sendOtp(email);
      setMessage('OTP đã được gửi đến email của bạn.');
    } catch (error) {
      setMessage('Gửi OTP thất bại.');
    }
  };

  return (
    <div>
      <h1>Gửi OTP</h1>
      <input type="email" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSendOtp}>Gửi OTP</button>
      <p>{message}</p>
    </div>
  );
};

export default VerifyOtp;
