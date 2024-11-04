
import React, { useState } from 'react';

    //Register için api yok 
 //  const handleRegister  = async (e) => {
    // e.PreventDefault();
       // const response = await axios.post("https://localhost7146/api/Auth/Register" {username, email, password})
       //
  //  }
const Register  = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

return(
<div className='flex items-center justify-center min-h-screen bg-gray-100'>
    <form className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-center text-xl font-bold mb-4">Kayıt Ol</h2>
        <input type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='e-mail' 
         className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
         required
        />
        <input type="text" 
        value={username}
        onChange={(e) => setUsername(e.target.value) }
        placeholder='kullanıcı adı'
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
        required
        />
        <input 
        type="password"
        value={password}
        onChange={(e) =>setPassword(e.target.value)}
        placeholder='şifre'
         className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
         required   
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full" >
            Kayıt ol
        </button>
    </form>
</div>
);
};

export default Register;