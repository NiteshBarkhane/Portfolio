import Setting from '../models/Setting.js';

export const getSettings = async (req, res) => {
    try {
        const settings = await Setting.find();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSetting = async (req, res) => {
    try {
        // If file exists, it's an image update
        if (req.file) {
            const { key, category } = req.body;
            const setting = await Setting.findOneAndUpdate(
                { key },
                { value: req.file.path, category },
                { upsert: true, new: true }
            );
            return res.json(setting);
        }

        // Text update
        const { key, value, category } = req.body;
        const setting = await Setting.findOneAndUpdate(
            { key },
            { value, category },
            { upsert: true, new: true }
        );
        res.json(setting);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
