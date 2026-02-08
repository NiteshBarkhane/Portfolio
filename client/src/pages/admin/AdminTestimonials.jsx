import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import toast from 'react-hot-toast';

const AdminTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');



    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async (searchQuery = '') => {
        try {
            const { data } = await api.get(`/testimonials?search=${searchQuery}`);
            setTestimonials(data.testimonials);
            setSearchTerm(data.searchTerm);
        } catch (error) {
            toast.error('Failed to fetch testimonials');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchTestimonials(search);
    };

    const togglePublish = async (id) => {
        try {
            await api.put(`/testimonials/${id}/publish`);
            fetchTestimonials(search);
        } catch (error) {
            toast.error('Failed to toggle publish');
        }
    };

    const toggleFeature = async (id) => {
        try {
            await api.put(`/testimonials/${id}/feature`);
            fetchTestimonials(search);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to toggle feature');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this testimonial?')) return;
        try {
            await api.delete(`/testimonials/${id}`);
            toast.success('Testimonial deleted');
            fetchTestimonials(search);
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const highlightText = (text) => {
        if (!searchTerm || !text) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.split(regex).map((part, i) =>
            regex.test(part) ? <mark key={i} className="bg-yellow-400 text-black">{part}</mark> : part
        );
    };

    const featuredCount = testimonials.filter(t => t.isFeatured).length;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Testimonials</h1>
                <span className="text-sm text-textSecondary">Featured: {featuredCount}/9</span>
            </div>

            <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Search by name, email, or text..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 px-4 py-2 bg-secondary border border-accent/20 rounded"
                />
                <button type="submit" className="px-6 py-2 bg-accent rounded hover:bg-accent/80">
                    Search
                </button>
                {search && (
                    <button type="button" onClick={() => { setSearch(''); fetchTestimonials(''); }} className="px-4 py-2 border border-accent/20 rounded">
                        Clear
                    </button>
                )}
            </form>

            <div className="space-y-4">
                {testimonials.map(testimonial => (
                    <div key={testimonial._id} className="bg-secondary/50 p-4 rounded-lg border border-accent/20">
                        <div className="flex gap-4">
                            <img
                                src={testimonial.userImage || `https://ui-avatars.com/api/?name=${testimonial.name}&background=7c3aed&color=fff`}
                                alt={testimonial.name}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold">{highlightText(testimonial.name)}</h3>
                                        <p className="text-sm text-textSecondary">{highlightText(testimonial.email)}</p>
                                        {testimonial.company && <p className="text-sm text-textSecondary">{testimonial.company}</p>}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => togglePublish(testimonial._id)}
                                            className={`px-3 py-1 rounded text-sm ${testimonial.isPublished ? 'bg-green-500/20' : 'bg-gray-500/20'}`}
                                        >
                                            {testimonial.isPublished ? 'Published' : 'Draft'}
                                        </button>
                                        <button
                                            onClick={() => toggleFeature(testimonial._id)}
                                            className={`px-3 py-1 rounded text-sm ${testimonial.isFeatured ? 'bg-yellow-500/20' : 'bg-gray-500/20'}`}
                                        >
                                            {testimonial.isFeatured ? '⭐ Featured' : 'Feature'}
                                        </button>
                                        <button onClick={() => handleDelete(testimonial._id)} className="px-3 py-1 bg-red-500/20 rounded text-sm">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="text-accent mb-2">
                                    {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                                </div>
                                <p className="text-textSecondary">{highlightText(testimonial.text)}</p>
                                <p className="text-xs text-textSecondary mt-2">
                                    Submitted: {new Date(testimonial.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminTestimonials;
