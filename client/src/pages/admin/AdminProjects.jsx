import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import Icon from '../../components/Icon';
import toast from 'react-hot-toast';

const AdminProjects = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null);


    useEffect(() => {
        fetchProjects();
        fetchCategories();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setItems(res.data);
        } catch (err) { console.error(err); toast.error("Failed to load projects"); }
        setLoading(false);
    };

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch (err) { console.error(err); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadToast = toast.loading(formData._id ? 'Updating project...' : 'Creating project...');

        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => data.append(key, formData[key]));
            if (file) data.append('image', file);

            if (formData._id) {
                await api.put(`/projects/${formData._id}`, data);
            } else {
                await api.post('/projects', data);
            }

            toast.success(formData._id ? 'Project updated!' : 'Project created!', { id: loadToast });
            setIsEditing(false);
            setFormData({});
            setFile(null);
            fetchProjects();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Operation failed', { id: loadToast });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this project?')) return;
        const loadToast = toast.loading('Deleting...');
        try {
            await api.delete(`/projects/${id}`);
            toast.success('Project deleted', { id: loadToast });
            fetchProjects();
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete', { id: loadToast });
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-white">Projects</h1>
                <button onClick={() => { setIsEditing(true); setFormData({}); setFile(null); }} className="bg-accent text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm hover:bg-accent/80 transition-all">
                    <Icon path="M12 5v14M5 12h14" name="Plus" size={16} /> Add Project
                </button>
            </div>

            {isEditing && (
                <div className="glass-card p-6 mb-8 border border-white/10 animate-fade-in">
                    <div className="flex justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">{formData._id ? 'Edit Project' : 'New Project'}</h3>
                        <button onClick={() => setIsEditing(false)} className="text-textSecondary hover:text-white"><Icon path="M18 6L6 18M6 6l12 12" name="Close" size={20} /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <input className="w-full bg-secondary p-4 rounded-xl text-white border border-white/10 focus:border-accent outline-none transition-colors" placeholder="Title" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                            <select className="w-full bg-secondary p-4 rounded-xl text-white border border-white/10 focus:border-accent outline-none transition-colors" value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })} required>
                                <option value="">Select Category</option>
                                {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                            </select>
                        </div>

                        <div className="row-span-2">
                            <div className="relative h-full min-h-[200px] border-2 border-dashed border-white/10 rounded-xl hover:border-accent transition-all group overflow-hidden bg-secondary/50">
                                <input type="file" onChange={e => setFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" id="p-file" accept="image/*" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-textSecondary group-hover:text-white transition-colors p-4 text-center">
                                    {file ? (
                                        <>
                                            <p className="font-bold text-accent mb-2">Selected: {file.name}</p>
                                            <img src={URL.createObjectURL(file)} className="h-32 object-contain rounded-lg" alt="preview" />
                                        </>
                                    ) : formData.image ? (
                                        <>
                                            <p className="mb-2">Click to replace image</p>
                                            <img src={formData.image} className="h-32 object-contain rounded-lg" alt="current" />
                                        </>
                                    ) : (
                                        <>
                                            <Icon path="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" name="Upload" size={32} className="mb-2" />
                                            <p>Upload Project Image</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <textarea className="w-full bg-secondary p-4 rounded-xl text-white border border-white/10 focus:border-accent outline-none transition-colors md:col-span-1 h-32 resize-none" placeholder="Description" value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} />

                        <div className="grid grid-cols-2 gap-4 md:col-span-2">
                            <input className="bg-secondary p-4 rounded-xl text-white border border-white/10 focus:border-accent outline-none" placeholder="Live Link" value={formData.link || ''} onChange={e => setFormData({ ...formData, link: e.target.value })} />
                            <input className="bg-secondary p-4 rounded-xl text-white border border-white/10 focus:border-accent outline-none" placeholder="GitHub Link" value={formData.github || ''} onChange={e => setFormData({ ...formData, github: e.target.value })} />
                        </div>

                        <button disabled={loading} className="bg-accent text-white py-4 rounded-xl font-bold md:col-span-2 hover:bg-accent/90 transition-all shadow-lg shadow-accent/20">
                            {formData._id ? 'Update Project' : 'Create Project'}
                        </button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                    <div key={item._id} className="glass-card p-4 group relative border border-white/5 hover:border-white/10 transition-all">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button onClick={() => { setFormData(item); setIsEditing(true); setFile(null); window.scrollTo(0, 0); }} className="p-2 bg-black/50 rounded-lg text-white hover:bg-accent backdrop-blur-sm"><Icon path="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" name="Edit" size={16} /></button>
                            <button onClick={() => handleDelete(item._id)} className="p-2 bg-black/50 rounded-lg text-red-400 hover:bg-red-500 hover:text-white backdrop-blur-sm"><Icon path="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" name="Delete" size={16} /></button>
                        </div>
                        <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black/20">
                            <img src={item.image || 'https://via.placeholder.com/300?text=No+Image'} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <Icon path="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01" name="Tag" size={12} className="text-accent" />
                            <span className="text-xs text-accent font-bold uppercase tracking-wider">{item.category}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{item.title}</h3>
                        <p className="text-textSecondary text-xs line-clamp-3 leading-relaxed mb-4 min-h-[3rem]">{item.description}</p>
                        <div className="flex gap-2 mt-auto">
                            {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="text-xs bg-white/5 px-3 py-1.5 rounded-md hover:text-white transition-colors">Live View</a>}
                            {item.github && <a href={item.github} target="_blank" rel="noreferrer" className="text-xs bg-white/5 px-3 py-1.5 rounded-md hover:text-white transition-colors">GitHub</a>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminProjects;
