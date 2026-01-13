import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('projects');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/${activeTab}`);
            setItems(res.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/api/${activeTab}`, formData);
            fetchData();
            setFormData({});
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/${activeTab}/${id}`);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="pt-32 px-8 md:px-24 min-h-screen">
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

            <div className="flex gap-4 mb-8">
                {['projects', 'skills', 'services'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-lg capitalize ${activeTab === tab ? 'bg-accent text-white' : 'bg-secondary'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Form Section */}
                <div className="bg-secondary p-8 rounded-2xl h-fit">
                    <h2 className="text-2xl font-bold mb-6">Add New {activeTab.slice(0, -1)}</h2>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Title/Name"
                            className="w-full bg-primary p-3 rounded"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value, name: e.target.value })}
                        />
                        {activeTab === 'skills' ? (
                            <input
                                type="number"
                                placeholder="Percentage"
                                className="w-full bg-primary p-3 rounded"
                                onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                            />
                        ) : (
                            <>
                                <textarea
                                    placeholder="Description"
                                    className="w-full bg-primary p-3 rounded"
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    className="w-full bg-primary p-3 rounded"
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />
                            </>
                        )}
                        <button className="bg-accent w-full py-3 rounded font-bold">Add Item</button>
                    </form>
                </div>

                {/* List Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold mb-6">Existing Items</h2>
                    {loading ? <p>Loading...</p> : items.map(item => (
                        <div key={item._id} className="bg-secondary p-4 rounded-xl flex justify-between items-center">
                            <div>
                                <p className="font-bold">{item.title || item.name}</p>
                                <p className="text-sm text-textSecondary">{activeTab === 'skills' ? `${item.percentage}%` : item.description?.substring(0, 50) + '...'}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
