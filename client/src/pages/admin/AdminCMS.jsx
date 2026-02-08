import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import Icon from '../../components/Icon';
import { useSettings } from '../../context/SettingsContext';
import toast from 'react-hot-toast';

const cmsCategories = {
    'Hero Section': ['hero_title', 'hero_subtitle', 'hero_badge', 'hero_name', 'hero_main_title_1', 'hero_main_title_2', 'hero_description', 'hero_image'],
    'About Section': ['about_title', 'about_desc_1', 'about_desc_2', 'stat_1_label', 'stat_1_value', 'stat_2_label', 'stat_2_value', 'stat_3_label', 'stat_3_value', 'stat_4_label', 'stat_4_value'],
    'Services Section': ['services_title', 'services_subtitle'],
    'Portfolio Section': ['portfolio_title', 'portfolio_subtitle'],
    'Pricing Section': ['pricing_title', 'pricing_subtitle', 'pricing_note', 'pricing_basic_title', 'pricing_basic_price', 'pricing_basic_features', 'pricing_standard_title', 'pricing_standard_price', 'pricing_standard_features', 'pricing_premium_title', 'pricing_premium_price', 'pricing_premium_features'],
    'Approach Section': ['approach_title', 'approach_desc'],
    'Contact Section': ['contact_title_prefix', 'contact_title_suffix', 'contact_desc', 'contact_info_title', 'contact_info_subtitle', 'contact_email', 'contact_location'],
    'Header': ['header_logo_text', 'header_button_text', 'header_resume_link'],
    'Footer': ['footer_phone', 'footer_copyright_text', 'footer_tagline'],
    'Social Media': ['footer_whatsapp_link', 'footer_linkedin', 'footer_github', 'social_twitter', 'social_instagram', 'social_facebook', 'social_youtube'],
};

const AdminCMS = () => {
    const { getSetting, setSettings } = useSettings();
    const [activeCategory, setActiveCategory] = useState('Hero Section');
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setFormData({});
        setFile(null);
    }, [activeCategory]);

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleUpdate = async (key, value) => {
        if (!value && !file && !key.includes('image')) return;
        setLoading(true);
        const loadingToast = toast.loading('Updating...');
        try {
            const data = new FormData();
            data.append('key', key);
            data.append('category', activeCategory);

            if (key.includes('image') && file) {
                data.append('image', file);
            } else {
                data.append('value', value);
            }

            const res = await api.post('/settings', data);

            setSettings(prev => ({ ...prev, [key]: res.data.value }));
            toast.success('Updated successfully', { id: loadingToast });
            setFile(null); // Reset file after success
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to update', { id: loadingToast });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 relative">
            <h1 className="text-2xl font-bold text-white mb-6 md:hidden">CMS Management</h1>

            {/* Sidebar - Fixed Position on Desktop, Simple list, No Scroll */}
            <div className="w-full md:w-64 flex-shrink-0">
                <div className="sticky top-6 space-y-1">
                    <h1 className="text-2xl font-bold text-white mb-6 hidden md:block">CMS</h1>
                    {Object.keys(cmsCategories).map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium text-sm
                            ${activeCategory === cat
                                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                    : 'text-textSecondary hover:bg-white/5 hover:text-white'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Form Area */}
            <div className="flex-1 space-y-6">
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-white">{activeCategory}</h2>
                    <p className="text-textSecondary text-xs">Manage content for {activeCategory}</p>
                </div>

                {cmsCategories[activeCategory].map(key => (
                    <div key={key} className="glass-card p-6 border border-white/5 transition-all hover:border-white/10">
                        <label className="text-xs text-accent font-bold uppercase tracking-wider mb-2 block">
                            {key.replace(/_/g, ' ')}
                        </label>

                        <div className="flex gap-4 items-start">
                            {key.includes('image') ? (
                                <div className="flex-1">
                                    <div className="flex items-center gap-6 mb-4">
                                        {/* Preview */}
                                        <div className="relative w-32 h-32 bg-black/40 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center group">
                                            {file && key.includes('image') ? (
                                                <img src={URL.createObjectURL(file)} alt="New Preview" className="w-full h-full object-cover" />
                                            ) : getSetting(key) ? (
                                                <img src={getSetting(key)} alt="Current" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-xs text-white/30">No Image</span>
                                            )}
                                        </div>

                                        <div className="flex-1 space-y-3">
                                            <input
                                                type="file"
                                                onChange={e => setFile(e.target.files[0])}
                                                className="hidden"
                                                id={`file-${key}`}
                                                accept="image/*"
                                            />
                                            <label
                                                htmlFor={`file-${key}`}
                                                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-dashed border-white/20 rounded-lg text-textSecondary cursor-pointer hover:border-accent hover:text-white transition-all w-full text-xs"
                                            >
                                                <Icon path="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" name="Upload" size={16} />
                                                {file && key.includes('image') ? file.name : 'Choose New Image'}
                                            </label>

                                            {file && (
                                                <button onClick={() => setFile(null)} className="text-xs text-red-400 hover:underline flex items-center gap-1">
                                                    <Icon path="M18 6L6 18M6 6l12 12" name="Close" size={12} /> Clear Selection
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleUpdate(key, null)}
                                        disabled={!file || loading}
                                        className="bg-accent px-6 py-2 rounded-lg text-white text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/80 transition-all shadow-lg shadow-accent/20"
                                    >
                                        {loading ? 'Uploading...' : 'Upload & Save'}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex-1 flex gap-3">
                                    <textarea
                                        defaultValue={getSetting(key)}
                                        onChange={e => handleChange(key, e.target.value)}
                                        className="flex-1 bg-secondary border border-white/10 rounded-xl p-4 text-white text-sm focus:border-accent outline-none min-h-[80px]"
                                        placeholder={`Enter ${key.replace(/_/g, ' ')}...`}
                                        onBlur={(e) => handleChange(key, e.target.value)}
                                    />
                                    <button
                                        onClick={() => handleUpdate(key, formData[key] || getSetting(key))}
                                        disabled={loading}
                                        className="bg-white/5 px-4 rounded-xl text-white text-xs font-bold hover:bg-accent transition-colors h-fit py-3 self-center border border-white/5 hover:border-accent"
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminCMS;
