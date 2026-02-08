import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import toast from 'react-hot-toast';

const AdminSkills = () => {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({ name: '', order: 0 });
    const [iconFile, setIconFile] = useState(null);
    const [editId, setEditId] = useState(null);



    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const { data } = await api.get('/skills/all');
            setSkills(data);
        } catch (error) {
            toast.error('Failed to fetch skills');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', formData.name);
        form.append('order', formData.order);
        if (iconFile) form.append('icon', iconFile);

        try {
            if (editId) {
                await api.put(`/skills/${editId}`, form);
                toast.success('Skill updated');
            } else {
                await api.post('/skills', form);
                toast.success('Skill added');
            }
            setFormData({ name: '', order: 0 });
            setIconFile(null);
            setEditId(null);
            fetchSkills();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this skill?')) return;
        try {
            await api.delete(`/skills/${id}`);
            toast.success('Skill deleted');
            fetchSkills();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const handleEdit = (skill) => {
        setFormData({ name: skill.name, order: skill.order });
        setEditId(skill._id);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Manage Skills</h1>

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

            <div className="grid md:grid-cols-3 gap-4">
                {skills.map(skill => (
                    <div key={skill._id} className="bg-secondary/50 p-4 rounded-lg border border-accent/20">
                        <img src={skill.icon} alt={skill.name} className="w-16 h-16 mx-auto mb-2 object-contain" />
                        <h3 className="text-center font-semibold">{skill.name}</h3>
                        <p className="text-center text-sm text-textSecondary">Order: {skill.order}</p>
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
            </div>
        </div>
    );
};

export default AdminSkills;
