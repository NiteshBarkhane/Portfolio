import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Folder, Lightbulb, Settings, LogOut, Plus, Trash2, Edit2, Upload, Link as LinkIcon, Save } from 'lucide-react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('projects');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null);
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            fetchData();
        }
    }, [activeTab, token]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/${activeTab}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItems(res.data);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) navigate('/login');
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (file) data.append('image', file);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            };

            if (editId) {
                await axios.put(`http://localhost:5000/api/${activeTab}/${editId}`, data, config);
            } else {
                await axios.post(`http://localhost:5000/api/${activeTab}`, data, config);
            }

            fetchData();
            resetForm();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/${activeTab}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (item) => {
        setEditId(item._id);
        const { _id, ...rest } = item;
        setFormData(rest);
    };

    const resetForm = () => {
        setFormData({});
        setFile(null);
        setEditId(null);
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        navigate('/login');
    };

    const tabs = [
        { id: 'projects', label: 'Projects', icon: Folder },
        { id: 'services', label: 'Services', icon: Lightbulb },
        { id: 'skills', label: 'Skills', icon: Settings }, // Using for attributes/qualities
        { id: 'settings', label: 'Site Content', icon: Settings },
        { id: 'contact', label: 'Inquiries', icon: Save },
    ];

    return (
        <div className="min-h-screen bg-primary flex flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className="w-full lg:w-72 bg-secondary border-r border-white/5 flex flex-col p-6 lg:fixed lg:h-full z-50">
                <div className="text-2xl font-black text-white mb-12 tracking-tighter">
                    Admin<span className="text-accent">Panel</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); resetForm(); }}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-accent text-white shadow-lg' : 'text-textSecondary hover:bg-white/5'}`}
                        >
                            <tab.icon size={20} />
                            <span className="font-medium">{tab.label}</span>
                        </button>
                    ))}
                </nav>

                <button onClick={logout} className="mt-auto flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 lg:ml-72 pt-12">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-12">
                        <h1 className="text-4xl font-bold text-white capitalize">{activeTab} Management</h1>
                        {activeTab !== 'settings' && activeTab !== 'contact' && (
                            <button onClick={resetForm} className="bg-accent text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                                <Plus size={20} /> New Item
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                        {/* Form Area */}
                        {(activeTab !== 'contact') && (
                            <div className="xl:col-span-1">
                                <div className="glass-card p-8 sticky top-6">
                                    <h2 className="text-2xl font-bold text-white mb-6 underline decoration-accent/30">{editId ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}</h2>
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {activeTab === 'settings' ? (
                                            <>
                                                <input
                                                    type="text"
                                                    placeholder="Key (e.g. hero_title)"
                                                    value={formData.key || ''}
                                                    onChange={e => setFormData({ ...formData, key: e.target.value })}
                                                    className="w-full bg-secondary border border-white/5 p-4 rounded-xl text-white outline-none focus:border-accent"
                                                />
                                                <textarea
                                                    placeholder="Value"
                                                    value={formData.value || ''}
                                                    onChange={e => setFormData({ ...formData, value: e.target.value })}
                                                    className="w-full bg-secondary border border-white/5 p-4 rounded-xl text-white outline-none focus:border-accent h-32"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <input
                                                    type="text"
                                                    placeholder="Title / Name"
                                                    value={formData.title || formData.name || ''}
                                                    onChange={e => setFormData({ ...formData, title: e.target.value, name: e.target.value })}
                                                    className="w-full bg-secondary border border-white/5 p-4 rounded-xl text-white outline-none focus:border-accent"
                                                    required
                                                />
                                                {activeTab === 'skills' ? (
                                                    <input
                                                        type="number"
                                                        placeholder="Percentage / Rating"
                                                        value={formData.percentage || ''}
                                                        onChange={e => setFormData({ ...formData, percentage: e.target.value })}
                                                        className="w-full bg-secondary border border-white/5 p-4 rounded-xl text-white outline-none focus:border-accent"
                                                    />
                                                ) : (
                                                    <>
                                                        <textarea
                                                            placeholder="Description"
                                                            value={formData.description || ''}
                                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                            className="w-full bg-secondary border border-white/5 p-4 rounded-xl text-white outline-none focus:border-accent h-24"
                                                        />
                                                        <div className="space-y-4">
                                                            <div className="flex items-center gap-4 bg-secondary border border-white/5 p-4 rounded-xl text-white">
                                                                <LinkIcon size={20} className="text-textSecondary" />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Image URL"
                                                                    value={formData.image || ''}
                                                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                                                    className="bg-transparent flex-1 outline-none"
                                                                />
                                                            </div>
                                                            <div className="relative">
                                                                <input
                                                                    type="file"
                                                                    onChange={e => setFile(e.target.files[0])}
                                                                    className="hidden"
                                                                    id="file-upload"
                                                                />
                                                                <label htmlFor="file-upload" className="flex items-center justify-center gap-3 p-4 bg-white/5 border-2 border-dashed border-white/10 rounded-xl text-textSecondary hover:border-accent hover:text-accent cursor-pointer transition-all">
                                                                    <Upload size={20} />
                                                                    {file ? file.name : 'Upload Local Image'}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        )}
                                        <div className="flex gap-4 pt-4">
                                            <button className="flex-1 bg-accent text-white py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all">
                                                {editId ? 'Update Item' : 'Create Item'}
                                            </button>
                                            {editId && (
                                                <button type="button" onClick={resetForm} className="bg-secondary text-white px-6 rounded-xl">Cancel</button>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* List Area */}
                        <div className={`${activeTab === 'contact' ? 'xl:col-span-3' : 'xl:col-span-2'} space-y-6`}>
                            {loading ? (
                                <div className="animate-pulse space-y-4">
                                    {[1, 2, 3].map(i => <div key={i} className="h-24 bg-secondary rounded-2xl w-full"></div>)}
                                </div>
                            ) : items.length === 0 ? (
                                <div className="text-center py-20 text-textSecondary uppercase tracking-widest bg-secondary/30 rounded-3xl border border-dashed border-white/5">
                                    No items found
                                </div>
                            ) : (
                                items.map(item => (
                                    <div key={item._id} className="glass-card p-6 flex flex-col md:flex-row items-center gap-6 group">
                                        {item.image && (
                                            <img src={item.image} alt="" className="w-24 h-24 object-cover rounded-xl" />
                                        )}
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="text-xl font-bold text-white mb-1">{item.title || item.name || item.key}</h3>
                                            <p className="text-textSecondary text-sm line-clamp-2">{item.description || item.value}</p>
                                            {activeTab === 'contact' && (
                                                <div className="mt-2 text-accent font-medium">{item.email}</div>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            {activeTab !== 'contact' && (
                                                <button onClick={() => handleEdit(item)} className="p-3 bg-white/5 rounded-xl text-white hover:bg-accent transition-all">
                                                    <Edit2 size={18} />
                                                </button>
                                            )}
                                            <button onClick={() => handleDelete(item._id)} className="p-3 bg-white/5 rounded-xl text-red-400 hover:bg-red-400 hover:text-white transition-all">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
