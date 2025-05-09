import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (!error) navigate('/');
    else alert(error.message);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <input className="w-full my-2 p-2 border" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="w-full my-2 p-2 border" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="bg-green-500 text-white px-4 py-2 mt-2" onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
