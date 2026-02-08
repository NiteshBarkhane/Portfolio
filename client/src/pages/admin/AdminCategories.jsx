import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import Icon from '../../components/Icon';
import toast from 'react-hot-toast';

const AdminCategories = () => {
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

    useEffect(() => { fetchItems(); }, [debouncedSearch]);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/categories?search=${debouncedSearch}`);
            setItems(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadToast = toast.loading('Saving...');
        try {
            if (formData._id) {
                await api.put(`/categories/${formData._id}`, formData);
            } else {
                await api.post('/categories', formData);
            }
            toast.success('Category Saved', { id: loadToast });
            setIsEditing(false);
            setFormData({});
            fetchItems();
        } catch (err) {
            console.error(err);
            toast.error('Failed to save', { id: loadToast });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this category?')) return;
        const loadToast = toast.loading('Deleting...');
        try {
            await api.delete(`/categories/${id}`);
            toast.success('Category deleted', { id: loadToast });
            fetchItems();
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete', { id: loadToast });
        }
    };

    const togglePublish = async (id) => {
        const loadToast = toast.loading('Toggling publish status...');
        try {
            await api.put(`/categories/${id}/publish`);
            toast.success('Status updated', { id: loadToast });
            fetchItems();
        } catch (err) {
            console.error(err);
            toast.error('Failed to update status', { id: loadToast });
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-white">Project Categories</h1>
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Icon path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-secondary border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-accent outline-none"
                        />
                    </div>
                    <button onClick={() => { setIsEditing(true); setFormData({}); }} className="bg-accent text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm hover:bg-accent/80 transition-all whitespace-nowrap">
                        <Icon path="M12 5v14M5 12h14" name="Plus" size={16} /> Add Category
                    </button>
                </div>
            </div>

            {isEditing && (
                <div className="glass-card p-6 mb-8 border border-white/10">
                    <div className="flex justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">{formData._id ? 'Edit Category' : 'New Category'}</h3>
                        <button onClick={() => setIsEditing(false)} className="text-textSecondary hover:text-white"><Icon path="M18 6L6 18M6 6l12 12" name="Close" size={20} /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="flex gap-4">
                        <input className="flex-1 bg-secondary p-4 rounded-xl text-white border border-white/10 focus:border-accent outline-none" placeholder="Category Name" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                        <button className="bg-accent text-white px-8 rounded-xl font-bold hover:bg-accent/90 transition-all">Save</button>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map(item => (
                        <div key={item._id} className="glass-card p-4 flex justify-between items-center border border-white/5 hover:border-accent/50 transition-all">
                            <span className="text-white font-medium">{item.name}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => togglePublish(item._id)}
                                    className={`px-3 py-1 rounded text-sm ${item.isPublished ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}
                                >
                                    {item.isPublished ? 'Published' : 'Draft'}
                                </button>
                                <button onClick={() => { setFormData(item); setIsEditing(true); }} className="p-2 hover:bg-white/5 rounded text-white hover:text-accent"><Icon path="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" name="Edit" size={16} /></button>
                                <button onClick={() => handleDelete(item._id)} className="p-2 hover:bg-white/5 rounded text-red-400 hover:text-red-500"><Icon path="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" name="Delete" size={16} /></button>
                            </div>
                        </div>
                    ))}
                    {items.length === 0 && !loading && (
                        <div className="col-span-full text-center py-10 text-textSecondary">
                            <p>No categories found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminCategories;
