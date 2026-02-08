import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import toast from 'react-hot-toast';

const AdminFAQs = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ question: '', answer: '', order: 0 });
    const [editId, setEditId] = useState(null);



    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/faqs');
            setFaqs(data);
        } catch (error) {
            toast.error('Failed to fetch FAQs');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadToast = toast.loading(editId ? 'Updating FAQ...' : 'Adding FAQ...');
        try {
            if (editId) {
                await api.put(`/faqs/${editId}`, formData);
                toast.success('FAQ updated', { id: loadToast });
            } else {
                await api.post('/faqs', formData);
                toast.success('FAQ added', { id: loadToast });
            }
            setFormData({ question: '', answer: '', order: 0 });
            setEditId(null);
            fetchFAQs();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed', { id: loadToast });
        }
    };

    const togglePublish = async (id) => {
        try {
            await api.put(`/faqs/${id}/publish`);
            fetchFAQs();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to toggle publish');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this FAQ?')) return;
        const loadToast = toast.loading('Deleting FAQ...');
        try {
            await api.delete(`/faqs/${id}`);
            toast.success('FAQ deleted', { id: loadToast });
            fetchFAQs();
        } catch (error) {
            toast.error('Failed to delete', { id: loadToast });
        }
    };

    const publishedCount = faqs.filter(f => f.isPublished).length;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage FAQs</h1>
                <span className="text-sm text-textSecondary">Published: {publishedCount}/5</span>
            </div>

            <form onSubmit={handleSubmit} className="bg-secondary/50 p-6 rounded-lg mb-8">
                <input
                    type="text"
                    placeholder="Question"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full px-4 py-2 bg-primary border border-accent/20 rounded mb-4"
                    required
                />
                <textarea
                    placeholder="Answer"
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    className="w-full px-4 py-2 bg-primary border border-accent/20 rounded mb-4"
                    rows="4"
                    required
                />
                <input
                    type="number"
                    placeholder="Order"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                    className="w-full px-4 py-2 bg-primary border border-accent/20 rounded mb-4"
                />
                <button type="submit" className="px-6 py-2 bg-accent rounded hover:bg-accent/80">
                    {editId ? 'Update' : 'Add'} FAQ
                </button>
                {editId && (
                    <button type="button" onClick={() => { setEditId(null); setFormData({ question: '', answer: '', order: 0 }); }} className="ml-2 px-6 py-2 border border-accent/20 rounded">
                        Cancel
                    </button>
                )}
            </form>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="space-y-4">
                    {faqs.map(faq => (
                        <div key={faq._id} className="bg-secondary/50 p-4 rounded-lg border border-accent/20">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold flex-1">{faq.question}</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => togglePublish(faq._id)}
                                        className={`px-3 py-1 rounded text-sm ${faq.isPublished ? 'bg-green-500/20' : 'bg-gray-500/20'}`}
                                    >
                                        {faq.isPublished ? 'Published' : 'Draft'}
                                    </button>
                                    <button onClick={() => { setFormData(faq); setEditId(faq._id); }} className="px-3 py-1 bg-accent/20 rounded text-sm">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(faq._id)} className="px-3 py-1 bg-red-500/20 rounded text-sm">
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className="text-textSecondary text-sm">{faq.answer}</p>
                            <p className="text-xs text-textSecondary mt-2">Order: {faq.order}</p>
                        </div>
                    ))}
                    {faqs.length === 0 && !loading && (
                        <div className="text-center py-10 text-textSecondary">
                            <p>No FAQs found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminFAQs;
