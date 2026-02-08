import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import toast from 'react-hot-toast';
import Icon from '../../components/Icon';

const AdminSkills = () => {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({ name: '', order: 0 });
    const [iconFile, setIconFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        fetchSkills();
    }, [debouncedSearch]);





    const fetchSkills = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/skills/all?search=${debouncedSearch}`);
            setSkills(data);
        } catch (error) {
            toast.error('Failed to fetch skills');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadToast = toast.loading(editId ? 'Updating skill...' : 'Adding skill...');
        const form = new FormData();
        form.append('name', formData.name);
        form.append('order', formData.order);
        if (iconFile) form.append('icon', iconFile);

        try {
            if (editId) {
                await api.put(`/skills/${editId}`, form);
                toast.success('Skill updated', { id: loadToast });
            } else {
                await api.post('/skills', form);
                toast.success('Skill added', { id: loadToast });
            }
            setFormData({ name: '', order: 0 });
            setIconFile(null);
            setEditId(null);
            fetchSkills();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed', { id: loadToast });
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this skill?')) return;
        const loadToast = toast.loading('Deleting skill...');
        try {
            await api.delete(`/skills/${id}`);
            toast.success('Skill deleted', { id: loadToast });
            fetchSkills();
        } catch (error) {
            toast.error('Failed to delete', { id: loadToast });
        }
    };

    const togglePublish = async (id) => {
        const loadToast = toast.loading('Toggling publish status...');
        try {
            await api.put(`/skills/${id}/publish`);
            toast.success('Status updated', { id: loadToast });
            fetchSkills();
        } catch (error) {
            toast.error('Failed to update status', { id: loadToast });
        }
    };

    const handleEdit = (skill) => {
        setFormData({ name: skill.name, order: skill.order });
        setEditId(skill._id);
    };

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold">Manage Skills</h1>
                <div className="relative w-full md:w-64">
                    <Icon path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
                    <input
                        type="text"
                        placeholder="Search skills..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-secondary border border-accent/20 rounded pl-10 pr-4 py-2 text-white focus:border-accent outline-none"
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-secondary/50 p-6 rounded-lg mb-8">
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Skill Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="px-4 py-2 bg-primary border border-accent/20 rounded"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Order"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                        className="px-4 py-2 bg-primary border border-accent/20 rounded"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setIconFile(e.target.files[0])}
                        className="px-4 py-2 bg-primary border border-accent/20 rounded"
                        required={!editId}
                    />
                </div>
                <button type="submit" className="px-6 py-2 bg-accent rounded hover:bg-accent/80">
                    {editId ? 'Update' : 'Add'} Skill
                </button>
                {editId && (
                    <button type="button" onClick={() => { setEditId(null); setFormData({ name: '', order: 0 }); }} className="ml-2 px-6 py-2 border border-accent/20 rounded">
                        Cancel
                    </button>
                )}
            </form>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-4">
                    {skills.map(skill => (
                        <div key={skill._id} className="bg-secondary/50 p-4 rounded-lg border border-accent/20">
                            <img src={skill.icon} alt={skill.name} className="w-16 h-16 mx-auto mb-2 object-contain" />
                            <h3 className="text-center font-semibold">{skill.name}</h3>
                            <button onClick={() => togglePublish(skill._id)} className={`block mx-auto mt-2 px-3 py-1 rounded text-xs ${skill.isPublished ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                {skill.isPublished ? 'Published' : 'Draft'}
                            </button>
                            <p className="text-center text-sm text-textSecondary mt-1">Order: {skill.order}</p>
                            <div className="flex gap-2 mt-4">
                                <button onClick={() => handleEdit(skill)} className="flex-1 py-1 bg-accent/20 rounded hover:bg-accent/30">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(skill._id)} className="flex-1 py-1 bg-red-500/20 rounded hover:bg-red-500/30">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    {skills.length === 0 && !loading && (
                        <div className="col-span-full text-center py-10 text-textSecondary">
                            <p>No skills found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminSkills;
