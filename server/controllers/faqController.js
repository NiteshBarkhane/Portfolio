import FAQ from '../models/FAQ.js';

export const getPublishedFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find({ isPublished: true }).sort({ order: 1 }).limit(5);
        res.json(faqs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find().sort({ order: 1 });
        res.json(faqs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createFAQ = async (req, res) => {
    try {
        const faq = new FAQ(req.body);
        await faq.save();
        res.status(201).json(faq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!faq) return res.status(404).json({ message: 'FAQ not found' });
        res.json(faq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const togglePublish = async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id);
        if (!faq) return res.status(404).json({ message: 'FAQ not found' });

        if (!faq.isPublished) {
            const publishedCount = await FAQ.countDocuments({ isPublished: true });
            if (publishedCount >= 5) {
                return res.status(400).json({ message: 'Maximum 5 FAQs can be published' });
            }
        }

        faq.isPublished = !faq.isPublished;
        await faq.save();
        res.json(faq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findByIdAndDelete(req.params.id);
        if (!faq) return res.status(404).json({ message: 'FAQ not found' });
        res.json({ message: 'FAQ deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
