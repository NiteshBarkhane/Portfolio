import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Icon from '../../components/Icon';
import toast from 'react-hot-toast';

const AdminInquiries = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const msgEndRef = useRef(null);
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            fetchMessages(selectedUser.email);
        }
    }, [selectedUser]);

    useEffect(() => {
        msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/contact/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUsers(res.data);
        } catch (err) { console.error(err); toast.error("Failed to load inquiries"); }
        setLoading(false);
    };

    const fetchMessages = async (email) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/contact/messages/${email}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setMessages(res.data);
            setUsers(prev => prev.map(u => u.email === email ? { ...u, unreadCount: 0 } : u));
            await axios.post('http://localhost:5000/api/contact/read', { email }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (err) { console.error(err); }
    };

    const handleDeleteConversation = async (email) => {
        if (!window.confirm(`Delete all messages from ${email}? This cannot be undone.`)) return;
        const loadToast = toast.loading('Deleting conversation...');
        try {
            await axios.delete(`http://localhost:5000/api/contact/${email}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            toast.success('Conversation Deleted', { id: loadToast });
            setSelectedUser(null);
            fetchUsers();
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete', { id: loadToast });
        }
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6">
            {/* Users List */}
            <div className={`w-full md:w-80 flex flex-col glass-card border-none p-0 overflow-hidden ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-white/5 bg-secondary flex justify-between items-center">
                    <h2 className="font-bold text-white">Inquiries</h2>
                    <span className="text-xs text-textSecondary">{users.length} Users</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {users.length === 0 ? (
                        <div className="p-8 text-center text-textSecondary text-sm opacity-50">No inquiries yet</div>
                    ) : (
                        users.map(user => (
                            <div
                                key={user._id}
                                onClick={() => setSelectedUser(user)}
                                className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${selectedUser?.email === user.email ? 'bg-accent/10 border-l-4 border-l-accent' : 'border-l-4 border-l-transparent'}`}
                            >
                                <div className="flex justify-between mb-1">
                                    <span className="font-bold text-white text-sm truncate">{user.name}</span>
                                    {user.unreadCount > 0 && <span className="bg-accent text-white text-[10px] px-2 rounded-full flex items-center font-bold shadow-lg shadow-accent/20">NEW</span>}
                                </div>
                                <p className="text-xs text-textSecondary truncate">{user.recentMessage}</p>
                                <span className="text-[10px] text-textSecondary opacity-50 mt-1 block">{new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 glass-card border-none p-0 flex flex-col overflow-hidden ${!selectedUser ? 'hidden md:flex' : 'flex'}`}>
                {selectedUser ? (
                    <>
                        <div className="p-4 border-b border-white/5 bg-secondary flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setSelectedUser(null)} className="md:hidden text-textSecondary text-sm p-2 hover:bg-white/5 rounded-lg">←</button>
                                <div>
                                    <span className="font-bold text-white block">{selectedUser.name}</span>
                                    <span className="text-xs text-textSecondary block opacity-70">{selectedUser.email} • {selectedUser.phone}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeleteConversation(selectedUser.email)}
                                className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold"
                            >
                                <Icon path="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" name="Delete" size={16} /> Delete
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-primary/20">
                            {messages.map(msg => (
                                <div key={msg._id} className="flex flex-col items-start max-w-[85%] animate-fade-in-up">
                                    <div className="bg-secondary p-5 rounded-2xl rounded-tl-none border border-white/5 shadow-sm">
                                        <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                                    </div>
                                    <div className="flex gap-2 ml-2 mt-1">
                                        <span className="text-[10px] text-textSecondary opacity-50">{new Date(msg.createdAt).toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                            <div ref={msgEndRef} />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-textSecondary gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                            <Icon path="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" name="Delete" size={32} className="opacity-20" />
                        </div>
                        <p>Select a conversation to view details</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminInquiries;
