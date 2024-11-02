import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:7146/api/Auth/Login', {
        username,
        password,
      });

      // JWT'yi localStorage'da saklayın
      localStorage.setItem('token', response.data.token);
      window.location.href = '/'; // Ana sayfaya yönlendirin
    } catch (error) {
      // Hata mesajını güncelleyin
      setErrorMessage(error.response?.data?.message || 'Giriş başarısız!'); // Sunucudan dönen mesaj varsa göster
      console.error('Giriş hatası: ', error); // Konsola hata kaydedin
    }
  };

  return (
    <div>
      <h2>Giriş Yap</h2>
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Giriş Yap</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Hata mesajını göster */}
    </div>
  );
}

export default Login;
