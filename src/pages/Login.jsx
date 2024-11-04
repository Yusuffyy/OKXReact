import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Hata mesajı için state

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7146/api/Auth/Login', { username, password });
            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
        } catch (error) {
            // Hata durumunu kontrol et
            if (error.response && error.response.status === 401) {
                setError('Kullanıcı adı veya şifre hatalı.'); // Hata mesajını ayarla
            } else {
                setError('Bir hata oluştu. Lütfen tekrar deneyin.'); // Genel hata mesajı
            }
        }
    };
    const handleRegisterClick = () => {
      window.location.href = '/register';
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-center text-xl font-bold mb-4">Giriş Yap</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>} {/* Hata mesajını göster */}
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Kullanıcı Adı"
                    className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şifre"
                    className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
                    Giriş Yap
                </button>
                <p onClick={handleRegisterClick} className="py-2 text-center text-blue-500 underline cursor-pointer">
                    Kayıt ol
                </p>
            </form> 
        </div>
    );
};

export default Login;
