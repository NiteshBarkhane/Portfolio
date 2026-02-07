import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from '../../components/Icon';
import toast from 'react-hot-toast';

const AdminServices = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const token = localStorage.getItem('adminToken');

    useEffect(() => { fetchServices(); }, []);

    const fetchServices = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/services');
            setItems(res.data);
        } catch (err) { console.error(err); toast.error("Failed to load services"); }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadToast = toast.loading(formData._id ? 'Updating...' : 'Creating...');
        try {
            const config = { headers: { 'Authorization': `Bearer ${token}` } };
            if (formData._id) {
                await axios.put(`http://localhost:5000/api/services/${formData._id}`, formData, config);
            } else {
                await axios.post('http://localhost:5000/api/services', formData, config);
            }
            toast.success('Success!', { id: loadToast });
            setIsEditing(false);
            setFormData({});
            fetchServices();
        } catch (err) {
            console.error(err);
            toast.error('Operation failed', { id: loadToast });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this service?')) return;
        const loadToast = toast.loading('Deleting...');
        try {
            await axios.delete(`http://localhost:5000/api/services/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            toast.success('Service deleted', { id: loadToast });
            fetchServices();
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete', { id: loadToast });
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-white">Services</h1>
                <button onClick={() => { setIsEditing(true); setFormData({}); }} className="bg-accent text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm hover:bg-accent/80 transition-all">
                    <Icon path="M12 5v14M5 12h14" name="Plus" size={16} /> Add Service
                </button>
            </div>

            {isEditing && (
                <div className="glass-card p-6 mb-8 border border-white/10 animate-fade-in">
                    <div className="flex justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">{formData._id ? 'Edit Service' : 'New Service'}</h3>
                        <button onClick={() => setIsEditing(false)} className="text-textSecondary hover:text-white">
                            <Icon path="M18 6L6 18M6 6l12 12" name="Close" size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                        <input className="bg-secondary p-4 rounded-xl text-white border border-white/10 focus:border-accent outline-none" placeholder="Title" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input className="bg-secondary p-4 rounded-xl text-white border border-white/10 focus:border-accent outline-none" placeholder="Icon Name (e.g. Code)" value={formData.iconName || ''} onChange={e => setFormData({ ...formData, iconName: e.target.value })} />
                            <input className="bg-secondary p-4 rounded-xl text-white border border-white/10 focus:border-accent outline-none" placeholder="SVG Path (e.g. M12 2L2 7...)" value={formData.iconPath || ''} onChange={e => setFormData({ ...formData, iconPath: e.target.value })} />
                        </div>
                        
                        {formData.iconPath && (
                            <div className="bg-secondary/50 p-4 rounded-xl border border-white/10 flex items-center gap-4">
                                <span className="text-textSecondary text-sm">Preview:</span>
                                <Icon path={formData.iconPath} name={formData.iconName} size={32} className="text-accent" />
                                <span className="text-white text-sm">{formData.iconName || 'Icon'}</span>
                            </div>
                        )}
                        
                        <textarea className="bg-secondary p-4 rounded-xl text-white border border-white/10 focus:border-accent outline-none resize-none h-32" placeholder="Description" value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} required />

                        <button className="bg-accent text-white py-4 rounded-xl font-bold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20">
                            {formData._id ? 'Update Service' : 'Create Service'}
                        </button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                    <div key={item._id} className="glass-card p-6 border border-white/5 relative group hover:border-accent/30 transition-all">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setFormData(item); setIsEditing(true); window.scrollTo(0, 0); }} className="p-2 bg-white/5 rounded-lg text-white hover:bg-accent">
                                <Icon path="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" name="Edit" size={14} />
                            </button>
                            <button onClick={() => handleDelete(item._id)} className="p-2 bg-white/5 rounded-lg text-red-400 hover:bg-red-500 hover:text-white">
                                <Icon path="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" name="Delete" size={14} />
                            </button>
                        </div>
                        <div className="mb-4 flex items-center gap-3">
                            <Icon path={item.iconPath} name={item.iconName} size={32} className="text-accent" />
                            <span className="text-accent text-sm font-medium">{item.iconName}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-textSecondary text-sm leading-relaxed">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminServices;
