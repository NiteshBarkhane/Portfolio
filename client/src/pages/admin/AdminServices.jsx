import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
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
                    <Plus size={16} /> Add Service
                </button>
            </div>

            {isEditing && (
                <div className="glass-card p-6 mb-8 border border-white/10 animate-fade-in">
                    <div className="flex justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">{formData._id ? 'Edit Service' : 'New Service'}</h3>
                        <button onClick={() => setIsEditing(false)} className="text-textSecondary hover:text-white"><X size={20} /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input className="bg-secondary p-4 rounded-xl text-white border border-white/10 focus:border-accent outline-none" placeholder="Title" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                            <input className="bg-secondary p-4 rounded-xl text-white border border-white/10 focus:border-accent outline-none" placeholder="Lucide Icon Name (e.g. Smartphone)" value={formData.icon || ''} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
                        </div>
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
                            <button onClick={() => { setFormData(item); setIsEditing(true); window.scrollTo(0, 0); }} className="p-2 bg-white/5 rounded-lg text-white hover:bg-accent"><Edit2 size={14} /></button>
                            <button onClick={() => handleDelete(item._id)} className="p-2 bg-white/5 rounded-lg text-red-400 hover:bg-red-500 hover:text-white"><Trash2 size={14} /></button>
                        </div>
                        <div className="text-accent mb-4 font-mono text-sm p-3 bg-accent/10 rounded-lg w-fit">{item.icon}</div>
                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-textSecondary text-sm leading-relaxed">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminServices;
