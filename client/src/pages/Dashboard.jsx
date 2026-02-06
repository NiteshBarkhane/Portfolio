import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Folder, Lightbulb, Settings, LogOut, Plus,
    Trash2, Edit2, Upload, Link as LinkIcon, MessageSquare,
    User, Calendar, Image as ImageIcon, Layout, Tag
} from 'lucide-react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('cms'); // Default to CMS
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null);
    const [editId, setEditId] = useState(null);

    // Inquiries specific state
    const [selectedUserEmail, setSelectedUserEmail] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);

    // Projects specific state
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');
    const messagesEndRef = useRef(null);

    // CMS Categories definition
    const cmsCategories = {
        'Hero Section': ['hero_title', 'hero_subtitle', 'hero_badge', 'hero_name', 'hero_main_title_1', 'hero_main_title_2', 'hero_description', 'hero_image'],
        'About Section': ['about_title', 'about_desc_1', 'about_desc_2', 'stat_1_label', 'stat_1_value', 'stat_2_label', 'stat_2_value', 'stat_3_label', 'stat_3_value', 'stat_4_label', 'stat_4_value'],
        'Services Section': ['services_title', 'services_subtitle'],
        'Portfolio Section': ['portfolio_title', 'portfolio_subtitle'],
        'Approach Section': ['approach_title', 'approach_desc'],
        'Contact Section': ['contact_title_prefix', 'contact_title_suffix', 'contact_desc', 'contact_info_title', 'contact_info_subtitle', 'contact_email', 'contact_location'],
        'Footer': ['footer_phone', 'footer_whatsapp_link', 'footer_linkedin', 'footer_github']
    };

    const [activeCmsCategory, setActiveCmsCategory] = useState('Hero Section');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            if (activeTab === 'inquiries' && !selectedUserEmail) {
                fetchInquiryUsers();
            } else if (activeTab === 'inquiries' && selectedUserEmail) {
                fetchChatMessages(selectedUserEmail);
            } else {
                fetchData();
            }

            if (activeTab === 'projects') {
                fetchCategories();
            }
        }
    }, [activeTab, token, selectedUserEmail]);

    useEffect(() => {
        if (selectedUserEmail && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages, selectedUserEmail]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const endpoint = activeTab === 'cms' ? 'settings' : activeTab;
            const res = await axios.get(`http://localhost:5000/api/${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItems(res.data);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) navigate('/login');
        }
        setLoading(false);
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/categories', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(res.data);
        } catch (err) { console.error(err); }
    };

    const fetchInquiryUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/contact/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItems(res.data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const fetchChatMessages = async (email) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/contact/messages/${email}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setChatMessages(res.data);
            // Mark as read
            await axios.post('http://localhost:5000/api/contact/read', { email }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) { console.error(err); }
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

            let endpoint = activeTab === 'cms' ? 'settings' : activeTab;

            if (activeTab === 'cms') {
                await axios.post(`http://localhost:5000/api/settings`, data, config);
            } else if (editId) {
                await axios.put(`http://localhost:5000/api/${endpoint}/${editId}`, data, config);
            } else {
                await axios.post(`http://localhost:5000/api/${endpoint}`, data, config);
            }

            fetchData();
            resetForm();
            // Optional: Show success feedback
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
        { id: 'cms', label: 'CMS / Content', icon: Layout },
        { id: 'services', label: 'Services', icon: Lightbulb },
        { id: 'projects', label: 'Projects', icon: Folder },
        { id: 'categories', label: 'Categories', icon: Tag },
        { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
    ];

    // Helper for formatting date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
    };

    return (
        <div className="min-h-screen bg-primary flex flex-col lg:flex-row font-sans text-sm">
            {/* Sidebar - Compact */}
            <aside className="w-full lg:w-64 bg-secondary border-r border-white/5 flex flex-col p-4 lg:fixed lg:h-full z-50">
                <div className="text-xl font-black text-white mb-8 tracking-tighter">
                    Admin<span className="text-accent">Panel</span>
                </div>

                <nav className="flex-1 space-y-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setSelectedUserEmail(null); resetForm(); }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${activeTab === tab.id ? 'bg-accent text-white shadow-md' : 'text-textSecondary hover:bg-white/5'}`}
                        >
                            <tab.icon size={18} />
                            <span className="font-medium">{tab.label}</span>
                        </button>
                    ))}
                </nav>

                <button onClick={logout} className="mt-auto flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                    <LogOut size={18} />
                    <span className="font-medium">Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 lg:ml-64 pt-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-white capitalize">
                            {selectedUserEmail ? `Chat: ${selectedUserEmail}` : `${activeTab === 'cms' ? 'CMS' : activeTab} Management`}
                        </h1>
                        {activeTab !== 'inquiries' && activeTab !== 'cms' && (
                            <button onClick={resetForm} className="bg-accent text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm hover:bg-accent/90">
                                <Plus size={16} /> New Item
                            </button>
                        )}
                        {selectedUserEmail && (
                            <button onClick={() => setSelectedUserEmail(null)} className="bg-white/10 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-white/20">
                                Back to List
                            </button>
                        )}
                    </div>

                    {/* Content Area */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* 1. CMS Form - Extended */}
                        {activeTab === 'cms' && (
                            <div className="xl:col-span-1">
                                <div className="glass-card p-5 sticky top-6 border border-white/5">
                                    <h2 className="text-lg font-bold text-white mb-4">Update Content</h2>

                                    <div className="mb-4">
                                        <label className="text-textSecondary text-xs mb-1 block">Section</label>
                                        <select
                                            value={activeCmsCategory}
                                            onChange={e => { setActiveCmsCategory(e.target.value); setFormData({}); }}
                                            className="w-full bg-secondary border border-white/5 p-3 rounded-lg text-white outline-none text-sm mb-4 focus:border-accent"
                                        >
                                            {Object.keys(cmsCategories).map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-textSecondary text-xs">Content Key</label>
                                            <select
                                                value={formData.key || ''}
                                                onChange={e => setFormData({ ...formData, key: e.target.value })}
                                                className="w-full bg-secondary border border-white/5 p-3 rounded-lg text-white outline-none text-sm focus:border-accent"
                                            >
                                                <option value="">Select Key</option>
                                                {cmsCategories[activeCmsCategory].map(key => (
                                                    <option key={key} value={key}>{key.replace(/_/g, ' ').toUpperCase()}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {formData.key === 'hero_image' || formData.key?.includes('image') ? (
                                            <div className="relative">
                                                <input type="file" onChange={e => setFile(e.target.files[0])} className="hidden" id="cms-file" />
                                                <label htmlFor="cms-file" className="flex items-center gap-3 p-3 bg-white/5 border-2 border-dashed border-white/10 rounded-lg text-textSecondary cursor-pointer hover:border-accent text-sm">
                                                    <Upload size={16} /> {file ? file.name : 'Upload New Image'}
                                                </label>
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                <label className="text-textSecondary text-xs">Value</label>
                                                <textarea
                                                    placeholder="Content Value"
                                                    value={formData.value || ''}
                                                    onChange={e => setFormData({ ...formData, value: e.target.value })}
                                                    className="w-full bg-secondary border border-white/5 p-3 rounded-lg text-white outline-none h-32 text-sm focus:border-accent"
                                                />
                                            </div>
                                        )}
                                        <button className="w-full bg-accent text-white py-3 rounded-lg font-bold text-sm hover:bg-accent/90 transition-all">Update Content</button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* 2. Generic Edit Form (Services, Projects, Categories) */}
                        {activeTab !== 'inquiries' && activeTab !== 'cms' && (
                            <div className="xl:col-span-1">
                                <div className="glass-card p-5 sticky top-6 border border-white/5">
                                    <h2 className="text-lg font-bold text-white mb-4 underline decoration-accent/30">{editId ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}</h2>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {activeTab === 'categories' ? (
                                            <input
                                                type="text"
                                                placeholder="Category Name"
                                                value={formData.name || ''}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-secondary border border-white/5 p-3 rounded-lg text-white outline-none text-sm focus:border-accent"
                                                required
                                            />
                                        ) : (
                                            <>
                                                <input
                                                    type="text"
                                                    placeholder="Title"
                                                    value={formData.title || ''}
                                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                    className="w-full bg-secondary border border-white/5 p-3 rounded-lg text-white outline-none text-sm focus:border-accent"
                                                    required
                                                />
                                                <textarea
                                                    placeholder="Description"
                                                    value={formData.description || ''}
                                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                    className="w-full bg-secondary border border-white/5 p-3 rounded-lg text-white outline-none h-24 text-sm focus:border-accent"
                                                />
                                                {activeTab === 'projects' && (
                                                    <>
                                                        <select
                                                            value={formData.category || ''}
                                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                                            className="w-full bg-secondary border border-white/5 p-3 rounded-lg text-white outline-none text-sm focus:border-accent"
                                                        >
                                                            <option value="">Select Category</option>
                                                            {categories.map(cat => (
                                                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                                                            ))}
                                                        </select>
                                                        <input type="text" placeholder="Project Link" value={formData.link || ''} onChange={e => setFormData({ ...formData, link: e.target.value })} className="w-full bg-secondary p-3 rounded-lg text-white border border-white/5 text-sm" />
                                                        <input type="text" placeholder="GitHub Link" value={formData.github || ''} onChange={e => setFormData({ ...formData, github: e.target.value })} className="w-full bg-secondary p-3 rounded-lg text-white border border-white/5 text-sm" />
                                                    </>
                                                )}
                                                <div className="relative">
                                                    <input type="file" onChange={e => setFile(e.target.files[0])} className="hidden" id="file-upload" />
                                                    <label htmlFor="file-upload" className="flex items-center justify-center gap-3 p-3 bg-white/5 border-2 border-dashed border-white/10 rounded-lg text-textSecondary cursor-pointer hover:border-accent text-sm">
                                                        <Upload size={16} /> {file ? file.name : 'Upload Image'}
                                                    </label>
                                                </div>
                                            </>
                                        )}
                                        <div className="flex gap-3 pt-2">
                                            <button className="flex-1 bg-accent text-white py-3 rounded-lg font-bold text-sm hover:bg-accent/90 transition-all">
                                                {editId ? 'Update' : 'Create'}
                                            </button>
                                            {editId && <button type="button" onClick={resetForm} className="bg-secondary text-white px-4 rounded-lg text-sm border border-white/10 hover:bg-white/5">Cancel</button>}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* 3. List Area (Shared for all except Chat View) */}
                        {!selectedUserEmail && (
                            <div className={`${(activeTab === 'inquiries' || activeTab === 'cms') ? 'xl:col-span-3' : 'xl:col-span-2'} space-y-4`}>
                                {loading ? (
                                    <div className="animate-pulse space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-20 bg-secondary rounded-xl w-full"></div>)}</div>
                                ) : (
                                    items.map(item => (
                                        <div key={item._id}
                                            onClick={() => activeTab === 'inquiries' ? setSelectedUserEmail(item.email) : null}
                                            className={`glass-card p-4 flex flex-col md:flex-row items-center gap-4 group border-white/5
                                                ${activeTab === 'inquiries' ? 'cursor-pointer hover:bg-white/5 transition-colors border-l-4' : ''}
                                                ${activeTab === 'inquiries' && item.unreadCount > 0 ? 'border-l-accent bg-accent/5' : 'border-l-transparent'}
                                            `}
                                        >
                                            {item.image && <img src={item.image} alt="" className="w-16 h-16 object-cover rounded-lg" />}
                                            <div className="flex-1 text-center md:text-left w-full min-w-0">
                                                <div className="flex justify-between items-center w-full mb-1">
                                                    <h3 className="text-lg font-bold text-white truncate">{item.title || item.name || item.key}</h3>
                                                    {activeTab === 'inquiries' && item.unreadCount > 0 && (
                                                        <span className="bg-accent text-white px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider">{item.unreadCount} NEW</span>
                                                    )}
                                                </div>

                                                {/* CMS Value Preview */}
                                                {activeTab === 'cms' && <p className="text-textSecondary text-xs line-clamp-1 font-mono bg-black/20 p-2 rounded">{item.value}</p>}

                                                {/* Inquiries Details */}
                                                {activeTab === 'inquiries' && (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                                        <p className="text-textSecondary text-xs line-clamp-1 italic">"{item.recentMessage}"</p>
                                                        <div className="text-xs text-textSecondary flex flex-col items-end gap-1">
                                                            <span className="font-medium text-accent">{item.phone || 'No Phone'}</span>
                                                            <span className="opacity-70">{item.email}</span>
                                                            <span className="opacity-50">{formatDate(item.createdAt)}</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Generic Description */}
                                                {activeTab !== 'cms' && activeTab !== 'inquiries' && (
                                                    <>
                                                        <p className="text-textSecondary text-xs line-clamp-2">{item.description}</p>
                                                        {activeTab === 'projects' && (
                                                            <span className="inline-block mt-2 bg-white/5 px-2 py-0.5 rounded text-[10px] text-accent border border-white/5">
                                                                {item.category}
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            {activeTab !== 'inquiries' && activeTab !== 'cms' && (
                                                <div className="flex gap-2 shrink-0">
                                                    <button onClick={() => handleEdit(item)} className="p-2 bg-white/5 rounded-lg text-white hover:bg-accent transition-all"><Edit2 size={16} /></button>
                                                    <button onClick={() => handleDelete(item._id)} className="p-2 bg-white/5 rounded-lg text-red-400 hover:bg-red-400 hover:text-white transition-all"><Trash2 size={16} /></button>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* 4. Chat View (Inquiries Only) */}
                        {activeTab === 'inquiries' && selectedUserEmail && (
                            <div className="xl:col-span-3 h-[600px] flex flex-col glass-card p-0 overflow-hidden border border-white/5">
                                <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                                    <h3 className="font-bold text-white text-lg">{selectedUserEmail}</h3>
                                    {/* Could add a 'Call' button here since we have the phone number now */}
                                </div>
                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    {chatMessages.map((msg, index) => (
                                        <div key={index} className="flex flex-col gap-1 items-start">
                                            <div className="bg-secondary p-4 rounded-2xl rounded-tl-none border border-white/10 max-w-[85%] shadow-sm">
                                                <p className="text-white/90 text-sm leading-relaxed">{msg.message}</p>
                                            </div>
                                            <div className="flex gap-3 ml-2">
                                                <span className="text-[10px] text-textSecondary opacity-70">{formatDate(msg.createdAt)}</span>
                                                {msg.phone && <span className="text-[10px] text-accent font-medium">Phone: {msg.phone}</span>}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
