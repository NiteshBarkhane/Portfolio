import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import Icon from '../../components/Icon';
import toast from 'react-hot-toast';

const AdminServices = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});


    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => { fetchServices(); }, [debouncedSearch]);

    const fetchServices = async () => {
        try {
            const res = await api.get(`/services?search=${debouncedSearch}`);
            setItems(res.data);
        } catch (err) { console.error(err); toast.error("Failed to load services"); }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadToast = toast.loading(formData._id ? 'Updating...' : 'Creating...');
        try {
            if (formData._id) {
                await api.put(`/services/${formData._id}`, formData);
            } else {
                await api.post('/services', formData);
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
            await api.delete(`/services/${id}`);
            toast.success('Service deleted', { id: loadToast });
            fetchServices();
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete', { id: loadToast });
        }
    };

    const togglePublish = async (id) => {
        const loadToast = toast.loading('Toggling publish status...');
        try {
            await api.put(`/services/${id}/publish`);
            toast.success('Status updated', { id: loadToast });
            fetchServices();
        } catch (err) {
            console.error(err);
            toast.error('Failed to update status', { id: loadToast });
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-white">Services</h1>
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Icon path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-secondary border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-accent outline-none"
                        />
                    </div>
                    <button onClick={() => { setIsEditing(true); setFormData({}); }} className="bg-accent text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm hover:bg-accent/80 transition-all whitespace-nowrap">
                        <Icon path="M12 5v14M5 12h14" name="Plus" size={16} /> Add Service
                    </button>
                </div>
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
                            <button onClick={() => togglePublish(item._id)} className={`p-2 rounded-lg text-white backdrop-blur-sm ${item.isPublished ? 'bg-green-500/80 hover:bg-green-600' : 'bg-yellow-500/80 hover:bg-yellow-600'}`} title={item.isPublished ? "Unpublish" : "Publish"}>
                                <Icon path={item.isPublished ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"} name="Eye" size={14} />
                            </button>
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
