import React, { useState } from 'react';
import api from '../config/api';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { username, password });
            localStorage.setItem('adminToken', res.data.token);
            navigate('/admin');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary px-6">
            <div className="glass-card p-10 w-full max-w-md">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-6">
                        <Icon path="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4" name="Lock" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Admin Access</h1>
                    <p className="text-textSecondary mt-2">Enter credentials to continue</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-textSecondary mb-2 uppercase tracking-widest">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-secondary border border-white/5 p-4 rounded-xl text-white outline-none focus:border-accent transition-all"
                            placeholder="username"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-textSecondary mb-2 uppercase tracking-widest">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-secondary border border-white/5 p-4 rounded-xl text-white outline-none focus:border-accent transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
